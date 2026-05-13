import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  style: ["normal", "italic"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Luna Café — Slowly pulled, beautifully poured · Exeter",
    template: "%s · Luna Café",
  },
  description:
    "Specialty coffee, seasonal plates and one of Exeter's warmest welcomes. Tucked beside the cathedral on Gandy Street. Open seven days.",
  metadataBase: new URL("https://luna.cafe"),
  openGraph: {
    type: "website",
    locale: "en_GB",
    title: "Luna Café · Exeter",
    description:
      "Specialty coffee, seasonal plates and one of Exeter's warmest welcomes.",
    siteName: "Luna Café",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-GB" className={`${fraunces.variable} ${inter.variable}`}>
      <body className="min-h-screen flex flex-col bg-[var(--color-cream)] text-[var(--color-charcoal)]">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
