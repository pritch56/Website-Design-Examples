# Luna Café — Exeter

A high-end multipage website for Luna Café (Gandy Street, Exeter, UK).

## Stack

- **Next.js 15** — App Router, React Server Components by default
- **React 19**
- **Tailwind CSS v4** — CSS-first config in `app/globals.css` via `@theme`
- **Framer Motion 11** — entrance & scroll-triggered animation
- **Lucide React** — icon set (`Moon`, `Coffee`, `MapPin` …)
- **shadcn/ui** — `Button` primitive in `components/ui/button.tsx`
- **TypeScript** strict mode

## Getting started

```bash
# 1) Install
npm install            # or pnpm install / bun install

# 2) Run dev server
npm run dev            # → http://localhost:3000

# 3) Type-check + build
npm run type-check
npm run build
```

> First run will fetch Google Fonts (Fraunces + Inter) — they're loaded with
> `next/font` so they're self-hosted at build time after that.

## Add the hero video

The home page renders a looping background video on the hero. Drop your clip at:

```
public/videos/hero-loop.mp4
```

Recommended: ~8–15 sec loop of latte-art pouring, **muted** (it auto-plays
muted on all browsers per autoplay policy), H.264 MP4, ~1080p, < 4 MB.
Until the file exists, the page falls back to a high-quality poster image so
nothing looks broken.

Good free sources: [Pexels](https://www.pexels.com/search/videos/latte%20art/),
[Coverr](https://coverr.co/), [Mixkit](https://mixkit.co/free-stock-video/coffee/).

## Project layout

```
luna-cafe/
├── app/
│   ├── layout.tsx          ← fonts, Navbar + Footer wrap
│   ├── page.tsx            ← Home (composes the 5 sections)
│   ├── globals.css         ← Tailwind v4 import + theme tokens
│   ├── menu/page.tsx       ← stub — categorised menu (next)
│   ├── booking/page.tsx    ← stub — reservation form (next)
│   └── loyalty/page.tsx    ← stub — Luna Rewards + wallet flow (next)
├── components/
│   ├── navbar.tsx          ← sticky, transparent over hero, mobile drawer
│   ├── footer.tsx          ← Exeter address, hours, social
│   ├── hero-video.tsx      ← <video> + animated copy + CTAs
│   ├── ui/button.tsx       ← shadcn Button (cva variants)
│   └── home/
│       ├── featured-menu.tsx
│       ├── about-section.tsx
│       ├── loyalty-teaser.tsx
│       └── visit-section.tsx   ← contains the `getOpenStatus()` TODO
├── lib/
│   ├── utils.ts            ← cn() helper
│   └── data/menu.ts        ← single source of truth for menu items
└── public/videos/          ← drop hero-loop.mp4 here
```

## Design system

| Token              | Value      | Usage                          |
| ------------------ | ---------- | ------------------------------ |
| `--color-cream`    | `#F5F5F5`  | Page background                |
| `--color-charcoal` | `#2C2C2C`  | Primary text & dark sections   |
| `--color-tan`      | `#D4A373`  | Accent (CTAs, links, dividers) |
| `--font-display`   | Fraunces   | Headings (variable, italic)    |
| `--font-sans`      | Inter      | Body text                      |

## Open todos

- [ ] Implement `getOpenStatus(now)` in `components/home/visit-section.tsx`
      *(see the inline TODO — small but meaningful UX call)*
- [ ] Build the full **Menu** page (renders from `lib/data/menu.ts`)
- [ ] Build the **Booking** form with mock submit + success state
- [ ] Build the **Loyalty** page with Apple Wallet (PKPass) + Google Wallet API flow
- [ ] Drop a real `hero-loop.mp4` into `public/videos/`

## Notes on the wallet flow (for the loyalty page)

- **Apple Wallet** — generate a `.pkpass` bundle, signed with an
  Apple Developer "Pass Type ID" certificate. Serve from a route handler.
  Docs: <https://developer.apple.com/wallet/>
- **Google Wallet** — use the Generic Pass / Loyalty Class API with a Google
  Service Account JWT. Returns a `https://pay.google.com/gp/v/save/...` URL.
  Docs: <https://developers.google.com/wallet>

For now the home-page mockup uses simple icon glyphs (so we don't have to
ship Apple/Google brand assets in dev). The `/loyalty` page will use their
official "Add to Wallet" button assets per their brand guidelines.
