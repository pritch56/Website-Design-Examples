"use client";

import type React from "react";
import { useRef, useMemo, useCallback, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";

/* ─── Types ──────────────────────────────────────────────────────────────── */

type ImageItem = string | { src: string; alt?: string };

interface FadeSettings {
  fadeIn: { start: number; end: number };
  fadeOut: { start: number; end: number };
}
interface BlurSettings {
  blurIn: { start: number; end: number };
  blurOut: { start: number; end: number };
  maxBlur: number;
}
interface InfiniteGalleryProps {
  images: ImageItem[];
  speed?: number;
  visibleCount?: number;
  falloff?: { near: number; far: number };
  zSpacing?: number;
  fadeSettings?: FadeSettings;
  blurSettings?: BlurSettings;
  className?: string;
  style?: React.CSSProperties;
}
interface PlaneData {
  index: number;
  z: number;
  imageIndex: number;
  x: number;
  y: number;
}

/* ─── Constants ──────────────────────────────────────────────────────────── */

const DEPTH = 50;
const MAX_H = 8;
const MAX_V = 8;

/* ─── Shader material ────────────────────────────────────────────────────── */
/*
 * FIX: removed textureSize() — that is GLSL ES 3.0 only.
 * Three.js ShaderMaterial defaults to GLSL ES 1.00 (WebGL 1), where
 * textureSize does not exist. Using it caused the shader to output white
 * pixels whenever blurAmount > 0.  We replace it with a fixed UV-space step
 * that produces a visually equivalent soft-focus on all hardware.
 */
function makeClothMaterial() {
  return new THREE.ShaderMaterial({
    transparent: true,
    uniforms: {
      map:         { value: null },
      opacity:     { value: 1.0 },
      blurAmount:  { value: 0.0 },
      scrollForce: { value: 0.0 },
      time:        { value: 0.0 },
    },
    vertexShader: /* glsl */`
      uniform float scrollForce;
      uniform float time;
      varying vec2 vUv;

      void main() {
        vUv = uv;
        vec3 pos = position;

        float ci   = scrollForce * 0.3;
        float d    = length(pos.xy);
        float curve = d * d * ci;

        float r1 = sin(pos.x * 2.0 + scrollForce * 3.0) * 0.02;
        float r2 = sin(pos.y * 2.5 + scrollForce * 2.0) * 0.015;
        float cloth = (r1 + r2) * abs(ci) * 2.0;

        pos.z -= (curve + cloth);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }
    `,
    fragmentShader: /* glsl */`
      uniform sampler2D map;
      uniform float opacity;
      uniform float blurAmount;
      uniform float scrollForce;
      varying vec2 vUv;

      void main() {
        vec4 color;

        if (blurAmount > 0.001) {
          // WebGL-1-safe blur: fixed UV-space step, no textureSize() needed
          float step = blurAmount * 0.003;
          vec4  acc  = vec4(0.0);
          float wSum = 0.0;
          for (float x = -2.0; x <= 2.0; x += 1.0) {
            for (float y = -2.0; y <= 2.0; y += 1.0) {
              float w  = 1.0 / (1.0 + length(vec2(x, y)));
              acc  += texture2D(map, vUv + vec2(x, y) * step) * w;
              wSum += w;
            }
          }
          color = acc / wSum;
        } else {
          color = texture2D(map, vUv);
        }

        color.rgb += vec3(abs(scrollForce) * 0.004);
        gl_FragColor = vec4(color.rgb, color.a * opacity);
      }
    `,
  });
}

/* ─── Helpers ────────────────────────────────────────────────────────────── */

function setMeshScale(mesh: THREE.Mesh, tex: THREE.Texture) {
  const aspect =
    tex.image && tex.image.width > 0 ? tex.image.width / tex.image.height : 1;
  mesh.scale.set(aspect >= 1 ? 2 * aspect : 2, aspect >= 1 ? 2 : 2 / aspect, 1);
}

function calcOpacity(norm: number, fs: FadeSettings): number {
  if (norm < fs.fadeIn.start) return 0;
  if (norm <= fs.fadeIn.end)
    return (norm - fs.fadeIn.start) / (fs.fadeIn.end - fs.fadeIn.start);
  if (norm >= fs.fadeOut.end) return 0;
  if (norm >= fs.fadeOut.start)
    return 1 - (norm - fs.fadeOut.start) / (fs.fadeOut.end - fs.fadeOut.start);
  return 1;
}

function calcBlur(norm: number, bs: BlurSettings): number {
  const m = bs.maxBlur;
  if (norm < bs.blurIn.start) return m;
  if (norm <= bs.blurIn.end)
    return m * (1 - (norm - bs.blurIn.start) / (bs.blurIn.end - bs.blurIn.start));
  if (norm >= bs.blurOut.end) return m;
  if (norm >= bs.blurOut.start)
    return m * ((norm - bs.blurOut.start) / (bs.blurOut.end - bs.blurOut.start));
  return 0;
}

/* ─── GalleryScene ────────────────────────────────────────────────────────── */
/*
 * FIX: fully imperative mesh management.
 *
 * Previously planes were rendered as React JSX (<ImagePlane position={...}/>).
 * React props only update when the component re-renders — but re-rendering on
 * every frame requires setState in useFrame, which overwhelms the renderer and
 * causes a white screen / WebGL context loss.
 *
 * Solution: add meshes to the Three.js scene directly (scene.add), then update
 * mesh.position.set() and mat.uniforms.* inside useFrame.  React never touches
 * the mesh transform after creation — zero reconciliation in the hot path.
 */
function GalleryScene({
  images,
  speed = 1,
  visibleCount = 8,
  fadeSettings = {
    fadeIn:  { start: 0.05, end: 0.15 },
    fadeOut: { start: 0.85, end: 0.95 },
  },
  blurSettings = {
    blurIn:  { start: 0.0, end: 0.1 },
    blurOut: { start: 0.9, end: 1.0 },
    maxBlur: 3.0,
  },
}: Omit<InfiniteGalleryProps, "className" | "style">) {
  const { scene } = useThree();

  const normalized = useMemo(
    () => images.map((img) => (typeof img === "string" ? { src: img, alt: "" } : img)),
    [images]
  );

  // useTexture suspends until every image is loaded — by the time useEffect
  // runs below, all textures are guaranteed to be available.
  const textures = useTexture(normalized.map((i) => i.src)) as THREE.Texture[];

  const totalImages = normalized.length;

  const spatial = useMemo(() => {
    const out: { x: number; y: number }[] = [];
    for (let i = 0; i < visibleCount; i++) {
      const ha = (i * 2.618) % (Math.PI * 2);
      const va = (i * 1.618 + Math.PI / 3) % (Math.PI * 2);
      out.push({
        x: (Math.sin(ha) * ((i % 3) * 1.2) * MAX_H) / 3,
        y: (Math.cos(va) * (((i + 1) % 4) * 0.8) * MAX_V) / 4,
      });
    }
    return out;
  }, [visibleCount]);

  /* Animation state — refs only, never trigger re-render */
  const velRef   = useRef(0);
  const autoRef  = useRef(true);
  const idleRef  = useRef(Date.now());
  const planes   = useRef<PlaneData[]>([]);
  const meshes   = useRef<THREE.Mesh[]>([]);
  const mats     = useRef<THREE.ShaderMaterial[]>([]);

  /* Set scene background so the canvas never shows through to the white page */
  useEffect(() => {
    const prev = scene.background;
    scene.background = new THREE.Color(0x161412);
    return () => { scene.background = prev as THREE.Color | null; };
  }, [scene]);

  /* Create / recreate meshes imperatively whenever the image list changes */
  useEffect(() => {
    // Cleanup previous meshes
    meshes.current.forEach((m) => { scene.remove(m); m.geometry.dispose(); });
    mats.current.forEach((m) => m.dispose());
    meshes.current = [];
    mats.current   = [];

    // Initialise plane data
    planes.current = Array.from({ length: visibleCount }, (_, i) => ({
      index:      i,
      z:          ((DEPTH / Math.max(visibleCount, 1)) * i) % DEPTH,
      imageIndex: totalImages > 0 ? i % totalImages : 0,
      x:          spatial[i]?.x ?? 0,
      y:          spatial[i]?.y ?? 0,
    }));

    // Create one mesh per plane, add directly to scene
    const geo = new THREE.PlaneGeometry(1, 1, 32, 32); // shared geometry
    for (let i = 0; i < visibleCount; i++) {
      const mat  = makeClothMaterial();
      const mesh = new THREE.Mesh(geo, mat);

      const p   = planes.current[i]!;
      const tex = textures[p.imageIndex];
      if (tex) { mat.uniforms.map.value = tex; setMeshScale(mesh, tex); }

      mesh.position.set(p.x, p.y, p.z - DEPTH / 2);
      scene.add(mesh);
      meshes.current.push(mesh);
      mats.current.push(mat);
    }

    return () => {
      meshes.current.forEach((m) => { scene.remove(m); });
      geo.dispose();
      mats.current.forEach((m) => m.dispose());
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scene, visibleCount, totalImages]);
  // Note: textures omitted from deps intentionally — they are stable objects
  // returned by useTexture's loader cache; adding them would re-create all
  // meshes on every parent re-render.

  /* Input: wheel + keyboard — update refs only, no setState */
  const onWheel = useCallback(
    (e: WheelEvent) => {
      e.preventDefault();
      velRef.current  += e.deltaY * 0.01 * speed;
      autoRef.current  = false;
      idleRef.current  = Date.now();
    },
    [speed]
  );

  const onKey = useCallback(
    (e: KeyboardEvent) => {
      const fwd = e.key === "ArrowDown" || e.key === "ArrowRight";
      const bwd = e.key === "ArrowUp"   || e.key === "ArrowLeft";
      if (!fwd && !bwd) return;
      velRef.current  += (fwd ? 1 : -1) * 2 * speed;
      autoRef.current  = false;
      idleRef.current  = Date.now();
    },
    [speed]
  );

  useEffect(() => {
    const canvas = document.querySelector("canvas");
    if (!canvas) return;
    canvas.addEventListener("wheel", onWheel, { passive: false });
    document.addEventListener("keydown", onKey);
    return () => {
      canvas.removeEventListener("wheel", onWheel);
      document.removeEventListener("keydown", onKey);
    };
  }, [onWheel, onKey]);

  /* Auto-play: resume after 3 s idle (interval runs once/sec, not 60×/sec) */
  useEffect(() => {
    const id = setInterval(() => {
      if (Date.now() - idleRef.current > 3000) autoRef.current = true;
    }, 1000);
    return () => clearInterval(id);
  }, []);

  /* Frame loop — pure imperative updates, zero React involvement */
  useFrame((state, delta) => {
    if (!meshes.current.length) return;

    if (autoRef.current) velRef.current += 0.3 * delta;
    velRef.current *= 0.95; // damping

    const vel     = velRef.current;
    const time    = state.clock.getElapsedTime();
    const advance = totalImages > 0 ? visibleCount % totalImages || totalImages : 0;
    const half    = DEPTH / 2;

    for (let i = 0; i < planes.current.length; i++) {
      const p    = planes.current[i]!;
      const mesh = meshes.current[i];
      const mat  = mats.current[i];
      if (!mesh || !mat) continue;

      /* ── advance z ── */
      let newZ = p.z + vel * delta * 10;
      let fwd = 0, bwd = 0;
      if (newZ >= DEPTH) { fwd = Math.floor(newZ / DEPTH); newZ -= DEPTH * fwd; }
      else if (newZ < 0) { bwd = Math.ceil(-newZ / DEPTH); newZ += DEPTH * bwd; }

      const prevIdx = p.imageIndex;
      if (fwd > 0 && advance > 0 && totalImages > 0)
        p.imageIndex = (p.imageIndex + fwd * advance) % totalImages;
      if (bwd > 0 && advance > 0 && totalImages > 0) {
        const s = p.imageIndex - bwd * advance;
        p.imageIndex = ((s % totalImages) + totalImages) % totalImages;
      }
      p.z = ((newZ % DEPTH) + DEPTH) % DEPTH;

      /* ── update texture + scale if image cycled ── */
      if (p.imageIndex !== prevIdx) {
        const tex = textures[p.imageIndex];
        if (tex) { mat.uniforms.map.value = tex; setMeshScale(mesh, tex); }
      }

      /* ── update position directly on the Object3D ── */
      mesh.position.set(p.x, p.y, p.z - half);

      /* ── update uniforms ── */
      mat.uniforms.time.value        = time;
      mat.uniforms.scrollForce.value = vel;

      const norm = p.z / DEPTH;
      mat.uniforms.opacity.value    = Math.max(0, Math.min(1, calcOpacity(norm, fadeSettings)));
      mat.uniforms.blurAmount.value = Math.max(0, Math.min(blurSettings.maxBlur, calcBlur(norm, blurSettings)));
    }
  });

  // Meshes are managed imperatively — nothing to render via JSX
  return null;
}

/* ─── WebGL fallback ─────────────────────────────────────────────────────── */

function Fallback({ images }: { images: ImageItem[] }) {
  const list = images.map((img) =>
    typeof img === "string" ? { src: img, alt: "" } : img
  );
  return (
    <div className="flex h-full flex-col items-center justify-center bg-[#161412] p-6">
      <p className="mb-4 text-sm uppercase tracking-widest text-white/50">
        WebGL unavailable — showing images
      </p>
      <div className="grid grid-cols-2 gap-3 overflow-y-auto md:grid-cols-3">
        {list.map((img, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img key={i} src={img.src} alt={img.alt} className="h-28 w-full rounded-lg object-cover" />
        ))}
      </div>
    </div>
  );
}

/* ─── Public export ───────────────────────────────────────────────────────── */

export default function InfiniteGallery({
  images,
  className = "h-96 w-full",
  style,
  speed,
  visibleCount,
  fadeSettings = {
    fadeIn:  { start: 0.05, end: 0.25 },
    fadeOut: { start: 0.4,  end: 0.43 },
  },
  blurSettings = {
    blurIn:  { start: 0.0, end: 0.1 },
    blurOut: { start: 0.4, end: 0.43 },
    maxBlur: 8.0,
  },
}: InfiniteGalleryProps) {
  const [webgl, setWebgl] = useState(true);

  useEffect(() => {
    try {
      const c = document.createElement("canvas");
      if (!c.getContext("webgl") && !c.getContext("experimental-webgl"))
        setWebgl(false);
    } catch { setWebgl(false); }
  }, []);

  if (!webgl)
    return <div className={className} style={style}><Fallback images={images} /></div>;

  return (
    <div className={className} style={style}>
      {/*
        alpha removed — scene.background handles the dark canvas colour.
        Without alpha:true, the canvas never shows the white page body behind it,
        even when all planes happen to be at opacity 0.
      */}
      <Canvas camera={{ position: [0, 0, 0], fov: 55 }} gl={{ antialias: true }}>
        <GalleryScene
          images={images}
          speed={speed}
          visibleCount={visibleCount}
          fadeSettings={fadeSettings}
          blurSettings={blurSettings}
        />
      </Canvas>
    </div>
  );
}
