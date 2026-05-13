import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Book a Table",
  description:
    "Reserve a table at Luna Café — pick your date, time and party size.",
};

export default function BookingPage() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-40 text-center md:px-10">
      <p className="eyebrow">Reservations</p>
      <h1 className="mt-4 font-display text-[clamp(40px,6vw,80px)] leading-tight">
        Reservation form —{" "}
        <span className="italic text-[var(--color-tan-dark)]">page 3 of 4</span>.
      </h1>
      <p className="mt-6 text-[var(--color-charcoal-soft)]">
        Date · time · party size · contact · success state. Will use
        controlled inputs with a mock submit → success screen.
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
