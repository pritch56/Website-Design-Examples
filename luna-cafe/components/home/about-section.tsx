"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export function AboutSection() {
  return (
    <section
      id="story"
      aria-labelledby="about-title"
      className="relative bg-[var(--color-cream-200)]/40 py-24 md:py-32"
    >
      {/* Decorative top divider */}
      <span
        aria-hidden
        className="absolute inset-x-0 top-0 mx-auto h-px w-32 bg-[var(--color-tan-dark)]/30"
      />

      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 md:grid-cols-2 md:gap-20 md:px-10">
        {/* Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative aspect-[4/5] overflow-hidden rounded-3xl"
        >
          <Image
            src="https://images.unsplash.com/photo-1559496417-e7f25cb247f3?w=1200&q=85&auto=format&fit=crop"
            alt="Inside Luna Café — warm interior with marble counter and brass details"
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
          {/* Floating quote tag */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="absolute bottom-6 left-6 right-6 rounded-2xl bg-[var(--color-cream)]/95 p-5 backdrop-blur-md shadow-lg ring-1 ring-[var(--color-charcoal)]/5"
          >
            <p className="font-display text-lg italic leading-snug text-[var(--color-charcoal)]">
              "It still feels like a room I'd want to spend a Sunday in.
              That's the only test we ever set ourselves."
            </p>
            <p className="mt-2 text-[10px] uppercase tracking-[0.25em] text-[var(--color-tan-dark)]">
              — Anouk, founder
            </p>
          </motion.div>
        </motion.div>

        {/* Text */}
        <div>
          <p className="eyebrow">02 — The story</p>
          <h2
            id="about-title"
            className="mt-3 font-display text-[clamp(36px,5.5vw,72px)] leading-[1.02] tracking-tight"
          >
            A bookshop's{" "}
            <span className="italic text-[var(--color-tan-dark)]">second life</span>,
            in three rhythms.
          </h2>

          <div className="mt-7 space-y-5 text-[var(--color-charcoal-soft)] leading-relaxed">
            <p>
              We bought the lease on Gandy Street in 2018, the year Daniel's
              grandmother's bookshop closed. The mahogany shelves are still on
              the walls. The brass kettle she made tea in still lives behind
              the bar. Everything else, we built around her — the marble
              counter, the long banquette, the small open kitchen where Anouk
              cooks her menu of the day.
            </p>
            <p>
              Three rhythms in one room. Coffee until eleven, lunch until
              three, candle-lit suppers from five. We close on Mondays, the
              staff eat together on Sundays. Everything else, we make it up as
              we go.
            </p>
          </div>

          {/* Small stat strip */}
          <dl className="mt-10 grid grid-cols-3 divide-x divide-[var(--color-charcoal)]/10 border-y border-[var(--color-charcoal)]/10 py-6">
            {[
              { v: "VIII", l: "years on Gandy St" },
              { v: "42", l: "seats inside" },
              { v: "1.4k", l: "rewards holders" },
            ].map((s) => (
              <div key={s.l} className="px-4 first:pl-0 last:pr-0 text-center first:text-left last:text-right">
                <dt className="font-display text-3xl text-[var(--color-tan-dark)]">
                  {s.v}
                </dt>
                <dd className="mt-1 text-[10px] uppercase tracking-[0.22em] text-[var(--color-charcoal-muted)]">
                  {s.l}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
