"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { featuredItems } from "@/lib/data/menu";

export function FeaturedMenu() {
  return (
    <section
      id="menu-preview"
      aria-labelledby="menu-preview-title"
      className="bg-[var(--color-cream)] py-24 md:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="grid items-end gap-8 md:grid-cols-[1fr_auto] md:gap-16">
          <div>
            <p className="eyebrow">01 — On the board</p>
            <h2
              id="menu-preview-title"
              className="mt-3 font-display text-[clamp(36px,5.5vw,72px)] leading-[1.02] tracking-tight text-[var(--color-charcoal)]"
            >
              A small,{" "}
              <span className="italic text-[var(--color-tan-dark)]">
                restless
              </span>{" "}
              kitchen.
            </h2>
            <p className="mt-5 max-w-xl text-[var(--color-charcoal-soft)] leading-relaxed">
              We change the menu when the weather changes. Espresso pulled
              shot-to-shot, sourdough out of the oven at five, pastries
              laminated by hand the night before. Here are four we're proud of
              today.
            </p>
          </div>
          <Button asChild variant="outline" size="lg">
            <Link href="/menu">
              See full menu
              <ArrowUpRight className="size-4" />
            </Link>
          </Button>
        </div>

        <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featuredItems.map((item, i) => (
            <motion.li
              key={item.id}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="group relative overflow-hidden rounded-2xl bg-white shadow-[0_1px_0_rgba(44,44,44,0.05),0_8px_28px_-12px_rgba(44,44,44,0.08)] ring-1 ring-[var(--color-charcoal)]/5 transition-shadow duration-500 hover:shadow-[0_20px_60px_-20px_rgba(44,44,44,0.25)]"
            >
              <div className="relative aspect-[5/4] overflow-hidden bg-[var(--color-cream-200)]">
                {item.image && (
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                )}
                {item.tag && (
                  <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-[var(--color-charcoal)] shadow">
                    {tagLabel(item.tag)}
                  </span>
                )}
              </div>
              <div className="flex items-start justify-between gap-4 p-5">
                <div className="min-w-0">
                  <h3 className="font-display text-xl text-[var(--color-charcoal)]">
                    {item.name}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-[var(--color-charcoal-muted)]">
                    {item.description}
                  </p>
                </div>
                <span className="shrink-0 font-display text-lg text-[var(--color-tan-dark)]">
                  {item.price}
                </span>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function tagLabel(tag: NonNullable<typeof featuredItems[number]["tag"]>): string {
  switch (tag) {
    case "popular":
      return "Popular";
    case "new":
      return "New";
    case "vegan":
      return "Vegan";
    case "gf":
      return "Gluten-free";
  }
}
