import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Menu",
  description:
    "Breakfast, lunch, specialty coffee & pastries — the full Luna Café menu.",
};

export default function MenuPage() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-40 text-center md:px-10">
      <p className="eyebrow">Menu page</p>
      <h1 className="mt-4 font-display text-[clamp(40px,6vw,80px)] leading-tight">
        Coming together —{" "}
        <span className="italic text-[var(--color-tan-dark)]">page 2 of 4</span>.
      </h1>
      <p className="mt-6 text-[var(--color-charcoal-soft)]">
        The categorised digital menu (Breakfast · Lunch · Specialty Coffee ·
        Pastries) renders from <code>lib/data/menu.ts</code> — wiring up next.
      </p>
      <div className="mt-10">
        <Button asChild variant="outline" size="lg">
          <Link href="/">
            <ArrowLeft className="size-4" />
            Back home
          </Link>
        </Button>
      </div>
    </section>
  );
}
