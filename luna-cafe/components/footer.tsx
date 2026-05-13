import Link from "next/link";
import { Instagram, Facebook, Mail, MapPin, Phone, Moon } from "lucide-react";

const hours: ReadonlyArray<{ day: string; time: string }> = [
  { day: "Mon", time: "Closed" },
  { day: "Tue", time: "8:00 – 22:00" },
  { day: "Wed", time: "8:00 – 22:00" },
  { day: "Thu", time: "8:00 – 23:00" },
  { day: "Fri", time: "8:00 – 23:00" },
  { day: "Sat", time: "9:00 – 23:00" },
  { day: "Sun", time: "10:00 – 16:00" },
];

const social: ReadonlyArray<{
  href: string;
  label: string;
  Icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
}> = [
  { href: "https://instagram.com/luna.cafe.exeter", label: "Instagram", Icon: Instagram },
  { href: "https://facebook.com/lunacafeexeter", label: "Facebook", Icon: Facebook },
  { href: "mailto:hello@luna.cafe", label: "Email", Icon: Mail },
];

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-[var(--color-charcoal)] text-[var(--color-cream)]">
      <div className="mx-auto max-w-7xl px-6 pt-20 pb-10 md:px-10">
        <div className="grid gap-12 md:grid-cols-12">
          {/* Brand block */}
          <div className="md:col-span-5">
            <Link href="/" className="inline-flex items-center gap-3 font-display text-3xl tracking-tight">
              <span className="grid size-10 place-items-center rounded-full bg-[var(--color-tan)] text-[var(--color-charcoal)]">
                <Moon className="size-4" strokeWidth={1.5} />
              </span>
              Luna <span className="italic text-[var(--color-tan-light)]">Café</span>
            </Link>
            <p className="mt-5 max-w-sm font-display text-xl leading-snug italic text-[var(--color-cream)]/80">
              Specialty coffee &amp; seasonal kitchen on Gandy Street, Exeter.
              Open seven days. Always a warm welcome.
            </p>
            <div className="mt-8 flex gap-3">
              {social.map(({ href, label, Icon }) => (
                <Link
                  key={label}
                  href={href}
                  aria-label={label}
                  className="grid size-10 place-items-center rounded-full border border-white/15 text-[var(--color-cream)]/80 transition-all hover:-translate-y-0.5 hover:border-[var(--color-tan)] hover:text-[var(--color-tan)]"
                >
                  <Icon className="size-4" strokeWidth={1.5} />
                </Link>
              ))}
            </div>
          </div>

          {/* Visit */}
          <div className="md:col-span-3">
            <h3 className="eyebrow text-[var(--color-tan)]">Visit</h3>
            <address className="mt-4 not-italic text-sm leading-relaxed text-[var(--color-cream)]/75">
              <div className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 size-4 text-[var(--color-tan)]" strokeWidth={1.5} />
                <span>
                  8 Gandy Street
                  <br />
                  Exeter, Devon
                  <br />
                  EX4 3LS, United Kingdom
                </span>
              </div>
              <div className="mt-4 flex items-center gap-2.5">
                <Phone className="size-4 text-[var(--color-tan)]" strokeWidth={1.5} />
                <a href="tel:+441392818100" className="hover:text-[var(--color-tan-light)]">
                  01392 818 100
                </a>
              </div>
              <div className="mt-2 flex items-center gap-2.5">
                <Mail className="size-4 text-[var(--color-tan)]" strokeWidth={1.5} />
                <a href="mailto:hello@luna.cafe" className="hover:text-[var(--color-tan-light)]">
                  hello@luna.cafe
                </a>
              </div>
            </address>
          </div>

          {/* Hours */}
          <div className="md:col-span-2">
            <h3 className="eyebrow text-[var(--color-tan)]">Hours</h3>
            <ul className="mt-4 space-y-1.5 text-sm text-[var(--color-cream)]/75">
              {hours.map((h) => (
                <li key={h.day} className="flex justify-between gap-3">
                  <span className="font-medium tracking-wide">{h.day}</span>
                  <span className="tabular-nums">{h.time}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick links */}
          <div className="md:col-span-2">
            <h3 className="eyebrow text-[var(--color-tan)]">Explore</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link href="/menu" className="text-[var(--color-cream)]/75 hover:text-[var(--color-tan)]">Menu</Link></li>
              <li><Link href="/booking" className="text-[var(--color-cream)]/75 hover:text-[var(--color-tan)]">Reservations</Link></li>
              <li><Link href="/loyalty" className="text-[var(--color-cream)]/75 hover:text-[var(--color-tan)]">Luna Rewards</Link></li>
              <li><Link href="/#visit" className="text-[var(--color-cream)]/75 hover:text-[var(--color-tan)]">Find us</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-3 border-t border-white/10 pt-8 text-xs tracking-wider text-[var(--color-cream)]/50 md:flex-row md:items-center">
          <p>© {year} Luna Café Ltd. Made with patience in Exeter.</p>
          <p className="uppercase">No rush · Open seven days</p>
        </div>
      </div>
    </footer>
  );
}
