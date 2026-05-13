import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Luna Rewards",
  description:
    "Buy 9, the 10th is free. Add Luna Rewards to Apple Wallet or Google Wallet.",
};

export default function LoyaltyPage() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-40 text-center md:px-10">
      <p className="eyebrow">Luna Rewards</p>
      <h1 className="mt-4 font-display text-[clamp(40px,6vw,80px)] leading-tight">
        Loyalty landing —{" "}
        <span className="italic text-[var(--color-tan-dark)]">page 4 of 4</span>.
      </h1>
      <p className="mt-6 text-[var(--color-charcoal-soft)]">
        Programme explainer + full "Save to Wallet" flow (Apple PKPass / Google
        Wallet API). Wiring up after the booking form.
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
