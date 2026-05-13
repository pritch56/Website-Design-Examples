"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Clock, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * Trading hours for Luna Café, indexed by JS `Date.getDay()`
 * (0 = Sunday … 6 = Saturday). `null` = closed.
 * Edit a single source of truth here and the footer / sections all align.
 */
export const hoursTable: Record<number, { open: string; close: string } | null> = {
  0: { open: "10:00", close: "16:00" }, // Sun (brunch only)
  1: null,                               // Mon — closed
  2: { open: "08:00", close: "22:00" }, // Tue
  3: { open: "08:00", close: "22:00" }, // Wed
  4: { open: "08:00", close: "23:00" }, // Thu
  5: { open: "08:00", close: "23:00" }, // Fri
  6: { open: "09:00", close: "23:00" }, // Sat
};

export type OpenStatus =
  | { state: "open"; closesAt: string; closingSoon: boolean }
  | { state: "closed"; opensAt: string | null };

/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  TODO — Luna Café · "Open Now" logic            (5–10 lines · your call)
 * ─────────────────────────────────────────────────────────────────────────────
 *  Given a Date `now`, return an OpenStatus that drives the green/amber/red
 *  dot the customer sees above the hours table.
 *
 *  Design choices you get to make:
 *
 *  1) "Closing soon" threshold — at what point should we warn customers?
 *     Common cafés use 30 mins, busier kitchens prefer 45 mins so guests have
 *     time to be seated and order before last orders.
 *
 *  2) "Opens at" wording — when closed, do we show today's next opening if
 *     still upcoming, or always the *next available* opening across days?
 *     The latter is more useful at 11pm on a Sunday (you want "Tomorrow 8am",
 *     not "today" which is already over).
 *
 *  3) Edge case — if it's currently a closed day (Monday), how far ahead do
 *     you look for the next open day? Just tomorrow, or recurse up to a week?
 *
 *  Constraints:
 *  • Must work for SSR + client. Pass `now` in — don't read `new Date()` inside.
 *  • Times in hoursTable are 24h "HH:MM" strings.
 *  • Return one of the OpenStatus shapes above.
 *
 *  Example output:
 *    { state: "open", closesAt: "22:00", closingSoon: false }
 *    { state: "closed", opensAt: "Tomorrow 8:00" }
 *    { state: "closed", opensAt: null }   // genuinely "see you Tuesday"
 */
export function getOpenStatus(now: Date): OpenStatus {
  // TODO: implement this — see notes above for the trade-offs.
  // Placeholder so the UI still renders while you decide.
  return { state: "closed", opensAt: null };
}

/* ─────────────────────────────────────────────────────────────────────────── */

export function VisitSection() {
  // SSR-safe: render a neutral state on the server, hydrate the real status on
  // the client. Avoids hydration mismatch from `new Date()` differing between
  // server build time and client render time.
  const [status, setStatus] = useState<OpenStatus | null>(null);

  useEffect(() => {
    const tick = () => setStatus(getOpenStatus(new Date()));
    tick();
    // Re-check every minute so "closing soon" appears in real time.
    const id = setInterval(tick, 60_000);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      id="visit"
      aria-labelledby="visit-title"
      className="bg-[var(--color-cream)] py-24 md:py-32"
    >
      <div className="mx-auto grid max-w-7xl gap-16 px-6 md:grid-cols-[1fr_1.2fr] md:px-10">
        {/* Copy + hours */}
        <div>
          <p className="eyebrow">04 — Find us</p>
          <h2
            id="visit-title"
            className="mt-3 font-display text-[clamp(36px,5.5vw,72px)] leading-[1.02] tracking-tight"
          >
            On <span className="italic text-[var(--color-tan-dark)]">Gandy</span>{" "}
            Street, just<br />off the high road.
          </h2>

          <div className="mt-8 space-y-4 text-[var(--color-charcoal-soft)]">
            <div className="flex items-start gap-3">
              <MapPin className="mt-1 size-4 text-[var(--color-tan-dark)]" strokeWidth={1.5} />
              <p>8 Gandy Street, Exeter, Devon EX4 3LS</p>
            </div>
            <div className="flex items-start gap-3">
              <Phone className="mt-1 size-4 text-[var(--color-tan-dark)]" strokeWidth={1.5} />
              <a href="tel:+441392818100" className="hover:text-[var(--color-tan-dark)]">
                01392 818 100
              </a>
            </div>
          </div>

          {/* Open-now pill */}
          <div
            aria-live="polite"
            className="mt-8 inline-flex items-center gap-3 rounded-full border border-[var(--color-charcoal)]/10 bg-white px-4 py-2.5 shadow-sm"
          >
            <StatusDot status={status} />
            <span className="text-sm font-medium tracking-wide text-[var(--color-charcoal)]">
              {formatStatusLine(status)}
            </span>
          </div>

          {/* Hours table */}
          <h3 className="mt-12 flex items-center gap-2 text-[10px] uppercase tracking-[0.28em] text-[var(--color-charcoal-muted)]">
            <Clock className="size-3.5" strokeWidth={1.5} />
            Opening hours
          </h3>
          <dl className="mt-4 max-w-sm divide-y divide-[var(--color-charcoal)]/10 border-y border-[var(--color-charcoal)]/10">
            {Object.entries(hoursTable).map(([dayIdx, hrs]) => {
              const dayName = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][Number(dayIdx)];
              return (
                <div
                  key={dayIdx}
                  className="flex justify-between py-2.5 text-sm tabular-nums"
                >
                  <dt className="uppercase tracking-[0.15em] text-[var(--color-charcoal-muted)]">
                    {dayName}
                  </dt>
                  <dd className="text-[var(--color-charcoal)]">
                    {hrs ? `${hrs.open} — ${hrs.close}` : "Closed"}
                  </dd>
                </div>
              );
            })}
          </dl>

          <div className="mt-10">
            <Button asChild variant="default" size="lg">
              <Link href="/booking">Book a table</Link>
            </Button>
          </div>
        </div>

        {/* Map */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-3xl bg-[var(--color-cream-200)] ring-1 ring-[var(--color-charcoal)]/10"
        >
          <iframe
            title="Luna Café on Google Maps"
            src="https://maps.google.com/maps?q=Gandy+Street+Exeter+EX4+3LS&z=16&output=embed"
            className="aspect-[4/5] w-full"
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
          <div className="pointer-events-none absolute bottom-4 left-4 right-4 rounded-2xl bg-[var(--color-charcoal)]/85 px-5 py-3 text-[var(--color-cream)] backdrop-blur-md">
            <p className="font-display text-base">Luna Café · Exeter</p>
            <p className="text-[11px] uppercase tracking-[0.22em] text-[var(--color-tan-light)]">
              Two minutes from the cathedral
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function StatusDot({ status }: { status: OpenStatus | null }) {
  const tone =
    status === null
      ? "bg-[var(--color-charcoal)]/20"
      : status.state === "open"
      ? status.closingSoon
        ? "bg-amber-500 shadow-[0_0_0_4px_rgba(245,158,11,0.18)]"
        : "bg-emerald-500 shadow-[0_0_0_4px_rgba(16,185,129,0.18)]"
      : "bg-rose-500/80";
  return (
    <span
      aria-hidden
      className={`relative inline-block size-2.5 rounded-full ${tone}`}
    />
  );
}

function formatStatusLine(status: OpenStatus | null): string {
  if (status === null) return "Checking today's hours…";
  if (status.state === "open") {
    return status.closingSoon
      ? `Closing soon · last orders by ${status.closesAt}`
      : `Open now · until ${status.closesAt}`;
  }
  return status.opensAt ? `Closed · opens ${status.opensAt}` : "Closed today";
}
