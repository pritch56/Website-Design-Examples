"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { ChevronDown, Coffee } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * Three.js can't run on the server (it needs document/canvas/window).
 * Even with "use client", Next.js still SSRs client components for initial
 * HTML — so we dynamically import the gallery with `ssr: false` to skip
 * pre-rendering entirely. The skeleton below shows while the chunk loads.
 */
const InfiniteGallery = dynamic(
  () => import("@/components/ui/3d-gallery-photography"),
  {
    ssr: false,
    loading: () => (
      <div className="absolute inset-0 grid place-items-center bg-[var(--color-charcoal)]">
        <span className="text-xs uppercase tracking-[0.4em] text-[var(--color-tan)]/70">
          Loading the gallery…
        </span>
      </div>
    ),
  }
);

/**
 * Twelve coffee-shop themed photos for the 3D gallery.
 * All Unsplash IDs are stable. Tweak/swap to taste.
 */
const galleryImages = [
  {
    src: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=1200&q=80&auto=format&fit=crop",
    alt: "Latte art rosetta in a white cup",
  },
  {
    src: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1200&q=80&auto=format&fit=crop",
    alt: "Warm-lit café interior with hanging pendant",
  },
  {
    src: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=1200&q=80&auto=format&fit=crop",
    alt: "Cortado on a wooden bar",
  },
  {
    src: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=1200&q=80&auto=format&fit=crop",
    alt: "Close-up of espresso with crema",
  },
  {
    src: "https://images.unsplash.com/photo-1559496417-e7f25cb247f3?w=1200&q=80&auto=format&fit=crop",
    alt: "Croissant flatlay on linen",
  },
  {
    src: "https://images.unsplash.com/photo-1453614512568-c4024d13c247?w=1200&q=80&auto=format&fit=crop",
    alt: "Bags of single-origin coffee beans",
  },
  {
    src: "https://images.unsplash.com/photo-1590412200988-a436970781fa?w=1200&q=80&auto=format&fit=crop",
    alt: "Shakshuka in a pan — weekend brunch special",
  },
  {
    src: "https://images.unsplash.com/photo-1442550528053-c431ecb55509?w=1200&q=80&auto=format&fit=crop",
    alt: "Wide café interior with bar and stools",
  },
  {
    src: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=1200&q=80&auto=format&fit=crop",
    alt: "Laminated pastry on a plate",
  },
  {
    src: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=1200&q=80&auto=format&fit=crop",
    alt: "Eggs on sourdough breakfast plate",
  },
  {
    src: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=1200&q=80&auto=format&fit=crop",
    alt: "Latte being served in a glass",
  },
  {
    src: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=1200&q=80&auto=format&fit=crop",
    alt: "Seasonal fruit tart",
  },
];

export function HeroGallery() {
  return (
    <section
      aria-label="Luna Café — welcome"
      className="relative h-screen min-h-[640px] w-full overflow-hidden bg-[var(--color-charcoal)] text-white"
    >
      {/* ────── 3D photo gallery (background) ────── */}
      <div className="absolute inset-0">
        <InfiniteGallery
          images={galleryImages}
          speed={1.1}
          visibleCount={12}
          falloff={{ near: 0.8, far: 14 }}
          className="h-full w-full"
        />
      </div>

      {/* ────── Vignette + dark wash for legibility ────── */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.55)_100%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[var(--color-charcoal)]/70 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[var(--color-charcoal)]/85 to-transparent" />

      {/* ────── Foreground content — pointer-events-none on the wrapper so
                wheel events pass through to the canvas underneath.
                Re-enable on individual interactive elements. ────── */}
      <div className="pointer-events-none relative z-10 flex h-full flex-col">
        <div className="flex flex-1 items-center justify-center px-6 pt-24 md:px-12">
          <div className="max-w-4xl text-center">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="mb-8 inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.32em] text-white/80"
            >
              <span className="inline-block h-px w-8 bg-white/40" />
              Café · Exeter · Est. 2018
              <span className="inline-block h-px w-8 bg-white/40" />
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-[clamp(64px,12vw,200px)] leading-[0.86] tracking-tight mix-blend-exclusion"
            >
              Luna{" "}
              <span className="italic text-[var(--color-tan-light)]">Café</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="mx-auto mt-10 max-w-lg text-base leading-relaxed text-white/80 md:text-lg"
            >
              Slowly pulled, beautifully poured. Specialty coffee &amp; a
              seasonal kitchen on Gandy Street, Exeter.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="pointer-events-auto mt-12 flex flex-wrap items-center justify-center gap-4"
            >
              <Button asChild variant="primary" size="lg">
                <Link href="/booking">
                  Book a Table
                  <Coffee className="size-4" />
                </Link>
              </Button>
              <Button asChild variant="translucent" size="lg">
                <Link href="/menu">See the Menu</Link>
              </Button>
            </motion.div>
          </div>
        </div>

        {/* Navigation hint + scroll cue */}
        <div className="flex flex-col items-center pb-8 select-none">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6, duration: 0.7 }}
            className="mb-3 text-[10px] uppercase tracking-[0.32em] text-white/55"
          >
            Mouse wheel · arrow keys · or just watch
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8, duration: 0.7 }}
            className="flex flex-col items-center"
          >
            <span className="mb-1 text-[10px] uppercase tracking-[0.32em] text-white/45">
              Scroll
            </span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <ChevronDown className="size-5 text-white/55" strokeWidth={1.5} />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
