"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Coffee, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export function LoyaltyTeaser() {
  return (
    <section
      id="rewards"
      aria-labelledby="rewards-title"
      className="bg-[var(--color-charcoal)] py-24 text-[var(--color-cream)] md:py-32"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 md:grid-cols-[1.1fr_1fr] md:px-10">
        {/* Copy */}
        <div>
          <p className="eyebrow text-[var(--color-tan)]">03 — Luna Rewards</p>
          <h2
            id="rewards-title"
            className="mt-3 font-display text-[clamp(36px,5.5vw,72px)] leading-[1.02] tracking-tight"
          >
            One free coffee for{" "}
            <span className="italic text-[var(--color-tan-light)]">every ten</span>.
          </h2>
          <p className="mt-6 max-w-lg text-[var(--color-cream)]/80 leading-relaxed">
            The Luna Card sits in your wallet — Apple or Google — and stamps
            itself when you buy a drink. No app, no plastic, no faff. Plus
            15% off pastries before 11am, a free coffee &amp; cake on your
            birthday week, and early access to event tickets.
          </p>

          <ul className="mt-8 space-y-3 text-sm text-[var(--color-cream)]/80">
            {[
              "Every 10th drink — free, stamped at the till",
              "15% off pastries weekdays before 11am",
              "Free coffee + cake on your birthday week",
              "48-hour early access to event tickets",
            ].map((b) => (
              <li key={b} className="flex items-start gap-3">
                <Sparkles
                  className="mt-0.5 size-4 shrink-0 text-[var(--color-tan)]"
                  strokeWidth={1.5}
                />
                <span>{b}</span>
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Button asChild variant="primary" size="lg">
              <Link href="/loyalty">
                Join the program
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <span className="text-xs uppercase tracking-[0.22em] text-[var(--color-cream)]/55">
              Free · No app · 30 sec sign-up
            </span>
          </div>
        </div>

        {/* Wallet card mockup */}
        <motion.div
          initial={{ opacity: 0, y: 32, rotateY: -10 }}
          whileInView={{ opacity: 1, y: 0, rotateY: -6 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          style={{ perspective: 1200 }}
          className="mx-auto w-full max-w-md"
        >
          <div
            className="relative rounded-[28px] bg-gradient-to-br from-[#3a3a3a] via-[#2c2c2c] to-[#1a1a1a] p-7 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.6)] ring-1 ring-white/10"
            style={{ transform: "rotateX(6deg) rotateY(-6deg)" }}
          >
            {/* Inner border */}
            <div className="pointer-events-none absolute inset-3 rounded-[22px] ring-1 ring-white/10" />

            {/* Brand row */}
            <div className="relative flex items-start justify-between">
              <div>
                <p className="font-display text-2xl italic">
                  Luna <span className="text-[var(--color-tan)]">Café</span>
                </p>
                <p className="mt-1 text-[10px] uppercase tracking-[0.28em] text-white/55">
                  Loyalty Card · Buy 9 get 1 free
                </p>
              </div>
              <Coffee className="size-6 text-[var(--color-tan)]" strokeWidth={1.5} />
            </div>

            {/* Stamps */}
            <div className="relative mt-7 grid grid-cols-10 gap-1.5">
              {Array.from({ length: 10 }).map((_, i) => {
                const filled = i < 6;
                const isFree = i === 9;
                return (
                  <div
                    key={i}
                    className={[
                      "aspect-square rounded-full grid place-items-center transition-all",
                      filled
                        ? "bg-[var(--color-tan)] text-[var(--color-charcoal)] shadow-[inset_0_0_0_2px_rgba(245,245,245,0.3),0_2px_6px_rgba(0,0,0,0.4)]"
                        : isFree
                        ? "bg-[var(--color-cream)] text-[var(--color-charcoal)] ring-1 ring-white"
                        : "border border-dashed border-white/35 bg-white/5",
                    ].join(" ")}
                    style={{
                      transform: filled
                        ? `rotate(${(i % 2 ? -1 : 1) * (3 + (i % 3))}deg)`
                        : undefined,
                    }}
                  >
                    {filled ? (
                      <Coffee className="size-3" strokeWidth={2} />
                    ) : isFree ? (
                      <span className="text-[8px] font-semibold tracking-[0.06em]">
                        FREE
                      </span>
                    ) : null}
                  </div>
                );
              })}
            </div>

            {/* Holder + ID */}
            <div className="relative mt-7 flex items-end justify-between text-white">
              <div>
                <p className="font-display text-lg tracking-wide">
                  M. ELOÏSE BERTRAND
                </p>
                <p className="mt-1 text-[10px] uppercase tracking-[0.22em] text-white/55">
                  Card No. LC—1184
                </p>
              </div>
              <div className="text-right">
                <p className="text-[9px] uppercase tracking-[0.28em] text-white/55">
                  Member since
                </p>
                <p className="font-display text-base italic text-[var(--color-tan-light)]">
                  MMXXIII
                </p>
              </div>
            </div>
          </div>

          {/* Wallet pill mockups (Apple/Google style — not real brand badges) */}
          <div className="mt-8 grid grid-cols-2 gap-3">
            <div className="flex items-center justify-center gap-2 rounded-xl bg-black px-4 py-3 text-xs font-medium text-white ring-1 ring-white/10">
              <AppleGlyph />
              Add to Apple Wallet
            </div>
            <div className="flex items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 text-xs font-medium text-[#202124] ring-1 ring-[var(--color-charcoal)]/10">
              <GoogleGlyph />
              Add to Google Wallet
            </div>
          </div>
          <p className="mt-3 text-center text-[10px] uppercase tracking-[0.22em] text-[var(--color-cream)]/45">
            Demo mockup — full flow on the Rewards page
          </p>
        </motion.div>
      </div>
    </section>
  );
}

/* Minimal vector glyphs so we don't pull in proprietary brand SVGs.
   On the /loyalty page we'll use the official Apple/Google "Add to Wallet"
   asset bundles served from their developer portals. */
function AppleGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="size-3.5" fill="currentColor" aria-hidden>
      <path d="M16.365 1.43c0 1.14-.418 2.222-1.252 3.121-.842.908-1.99 1.566-3.176 1.484-.085-1.144.395-2.273 1.222-3.13.832-.86 2.06-1.49 3.206-1.475zM20.5 17.42c-.39.905-.86 1.74-1.41 2.51-.81 1.13-1.81 2.5-3.06 2.52-1.21.02-1.62-.72-3.21-.72s-2.04.7-3.18.74c-1.27.05-2.24-1.22-3.06-2.35-1.66-2.31-2.93-6.53-1.22-9.39.84-1.41 2.34-2.3 3.96-2.32 1.24-.02 2.41.84 3.21.84.81 0 2.21-1.04 3.74-.89.64.03 2.45.26 3.61 1.97-.09.06-2.15 1.26-2.13 3.77.03 3 2.62 4 2.65 4.01z" />
    </svg>
  );
}

function GoogleGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="size-3.5" aria-hidden>
      <path fill="#4285F4" d="M21.6 12.23c0-.73-.07-1.42-.19-2.09H12v3.96h5.4a4.6 4.6 0 0 1-2 3.03v2.5h3.23c1.89-1.74 2.97-4.3 2.97-7.4z"/>
      <path fill="#34A853" d="M12 22c2.7 0 4.97-.9 6.63-2.43l-3.23-2.5c-.9.6-2.05.96-3.4.96-2.61 0-4.83-1.76-5.62-4.13H3.04v2.59A10 10 0 0 0 12 22z"/>
      <path fill="#FBBC05" d="M6.38 13.9a6.01 6.01 0 0 1 0-3.8V7.51H3.04a10 10 0 0 0 0 8.98l3.34-2.59z"/>
      <path fill="#EA4335" d="M12 5.94c1.47 0 2.79.5 3.83 1.5l2.86-2.86C16.97 3 14.7 2 12 2A10 10 0 0 0 3.04 7.51l3.34 2.59C7.17 7.7 9.39 5.94 12 5.94z"/>
    </svg>
  );
}
