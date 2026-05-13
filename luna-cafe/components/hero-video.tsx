"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronDown, Coffee } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * Single fade-up variant — staggered via `custom` so the eyebrow → headline →
 * subheading → CTAs arrive in sequence rather than all at once.
 */
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.9,
      delay: 0.2 + i * 0.12,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

export function HeroVideo() {
  return (
    <section
      aria-label="Luna Café — welcome"
      className="relative h-screen min-h-[640px] w-full overflow-hidden text-white"
    >
      {/* ────── Background video ────── */}
      {/*
        Drop your latte-art clip at /public/videos/hero-loop.mp4.
        Until then, the poster image (Unsplash) renders so the hero still looks finished.
        We deliberately render the <video> even without the file — browsers fall back to the poster.
      */}
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        poster="https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=1920&q=85&auto=format&fit=crop"
        className="absolute inset-0 size-full object-cover"
        aria-hidden="true"
      >
        <source src="/videos/hero-loop.mp4" type="video/mp4" />
      </video>

      {/* ────── Overlays for legibility ────── */}
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-charcoal)]/55 via-[var(--color-charcoal)]/25 to-[var(--color-charcoal)]/90" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(44,44,44,0.55)_100%)]" />

      {/* ────── Content ────── */}
      <div className="relative z-10 flex h-full flex-col">
        <div className="flex flex-1 items-center justify-center px-6 pt-24 md:px-12">
          <div className="max-w-4xl text-center">
            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={0}
              className="mb-6 inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.32em] text-white/85"
            >
              <span className="inline-block h-px w-8 bg-white/40" />
              Café · Exeter · Est. 2018
              <span className="inline-block h-px w-8 bg-white/40" />
            </motion.p>

            <motion.h1
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={1}
              className="font-display text-[clamp(48px,8vw,132px)] leading-[0.92] tracking-tight"
            >
              Slowly pulled,
              <br />
              <span className="italic text-[var(--color-tan-light)]">
                beautifully
              </span>{" "}
              poured.
            </motion.h1>

            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={2}
              className="mx-auto mt-8 max-w-xl text-base leading-relaxed text-white/85 md:text-xl"
            >
              Specialty coffee, seasonal plates &amp; one of Exeter's warmest
              welcomes — tucked beside the cathedral on Gandy Street.
            </motion.p>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={3}
              className="mt-12 flex flex-wrap items-center justify-center gap-4"
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

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.6 }}
          className="flex flex-col items-center pb-10 select-none"
        >
          <span className="mb-2 text-[10px] uppercase tracking-[0.32em] text-white/55">
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown className="size-5 text-white/60" strokeWidth={1.5} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
