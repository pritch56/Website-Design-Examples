"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Moon, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/booking", label: "Book" },
  { href: "/loyalty", label: "Rewards" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-out",
        scrolled
          ? "bg-[var(--color-cream)]/90 backdrop-blur-lg border-b border-[var(--color-charcoal)]/10"
          : "bg-transparent"
      )}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-10"
      >
        <Link
          href="/"
          className={cn(
            "group flex items-center gap-2.5 font-display text-2xl tracking-tight",
            scrolled ? "text-[var(--color-charcoal)]" : "text-white"
          )}
        >
          <span
            className={cn(
              "grid size-9 place-items-center rounded-full transition-colors duration-300",
              scrolled
                ? "bg-[var(--color-charcoal)] text-[var(--color-tan)]"
                : "bg-white/15 text-white backdrop-blur-md ring-1 ring-white/30"
            )}
          >
            <Moon className="size-4" strokeWidth={1.5} />
          </span>
          <span>
            Luna <span className="italic text-[var(--color-tan-dark)]">Café</span>
          </span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-medium tracking-wide transition-colors",
                  scrolled
                    ? "text-[var(--color-charcoal-soft)] hover:bg-[var(--color-cream-200)] hover:text-[var(--color-charcoal)]"
                    : "text-white/85 hover:bg-white/15 hover:text-white"
                )}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <div className="hidden md:block">
          <Button
            asChild
            variant={scrolled ? "default" : "translucent"}
            size="default"
          >
            <Link href="/booking">Book a Table</Link>
          </Button>
        </div>

        {/* Mobile toggle */}
        <button
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
          className={cn(
            "grid size-11 place-items-center rounded-full transition-colors md:hidden",
            scrolled
              ? "bg-[var(--color-charcoal)] text-[var(--color-cream)]"
              : "bg-white/15 text-white ring-1 ring-white/30 backdrop-blur-md"
          )}
        >
          {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-drawer"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden border-t border-[var(--color-charcoal)]/10 bg-[var(--color-cream)]/95 backdrop-blur-xl"
          >
            <ul className="flex flex-col gap-1 px-6 py-6">
              {links.map((l, i) => (
                <motion.li
                  key={l.href}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04, duration: 0.25 }}
                >
                  <Link
                    href={l.href}
                    onClick={() => setMobileOpen(false)}
                    className="block rounded-2xl px-4 py-3 font-display text-2xl text-[var(--color-charcoal)] hover:bg-[var(--color-cream-200)]"
                  >
                    {l.label}
                  </Link>
                </motion.li>
              ))}
              <li className="pt-3">
                <Button asChild variant="primary" size="lg" className="w-full">
                  <Link href="/booking" onClick={() => setMobileOpen(false)}>
                    Book a Table
                  </Link>
                </Button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
