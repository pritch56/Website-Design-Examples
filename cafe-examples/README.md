# Café Website — Pricing & Running Costs

> A pricing sheet for the four tiers in this folder.
> Each tier shows: **what I build for you (one-off)**, **what I charge each month to keep it running**, and **what the cafe pays third parties** (hosting, booking, email, etc.). Optional add-ons — AI chatbot, digital loyalty cards, online ordering — are listed at the bottom.

All prices in £ GBP. I'm not VAT-registered, so no VAT on my fees.
Third-party prices are indicative and based on 2026 list prices — they may move ±10%.

---

## At a glance

| Tier | Concept | Build (one-off) | My monthly fee | Third-party costs | **Year 1 total** |
|---|---|---|---|---|---|
| **1 — Essential** | Daisy & Bean | **£100** | £15 / mo | £10–25 / mo | **~£400** |
| **2 — Classic** | Roast Republic | **£200** | £30 / mo | £15–35 / mo | **~£720** |
| **3 — Premium** | Noir Café | **£450** | £60 / mo | £40–120 / mo | **~£1,650** |
| **4 — Signature** | Luna Café | **£750** | £95 / mo | £60–180 / mo | **~£2,500** |

The "Build" cost is split 50% on signing, 50% on launch.
The monthly fee starts 30 days after launch on a 6-month rolling contract, then month-to-month.

---

## Tier 1 — Essential · *Daisy & Bean*

### Build · £100 one-off

- One-page scrollable site (hero, menu, story, hours, contact)
- Mobile-responsive, fast-loading
- Google Maps pin & opening-hours widget
- Contact form (replies to your email inbox)
- Domain & email setup
- One round of revisions

### My monthly fee · £15

Covers up to **1 hour of small changes** per month (text edits, photo swaps, menu updates), uptime monitoring, and a 48-hour fix turnaround on anything broken.

### Third-party costs you pay direct

| Item | Cost | Notes |
|---|---|---|
| Domain `.co.uk` | ~£10 / year | Bought through Namecheap or 123-Reg |
| Hosting (Netlify free tier) | **Free** | Up to 100GB bandwidth — plenty for a small café |
| Form handling (Formspree free) | **Free** | Up to 50 submissions / month |
| Email forwarding | **Free** | `hello@yourcafe.co.uk` → your Gmail |
| *Optional*: Google Workspace | £5 / mo | Proper business email + Drive |

**Realistic monthly total: £10–25** (the high end only if you want Google Workspace).

---

## Tier 2 — Classic · *Roast Republic*

### Build · £200 one-off

- Everything in Tier 1, plus:
- Multi-section site with interactive menu (filter by hot / cold / food)
- Photo gallery with hover details
- Coffee-origin interactive map (or equivalent storytelling section)
- Newsletter signup connected to Mailchimp
- Two rounds of revisions

### My monthly fee · £30

Up to **2 hours of updates** per month, newsletter template & monthly send help, quarterly content-refresh suggestions.

### Third-party costs you pay direct

| Item | Cost | Notes |
|---|---|---|
| Domain `.co.uk` | ~£10 / year | |
| Hosting (Vercel free) | **Free** | Bumps to Hobby Pro at £16/mo if traffic exceeds free tier |
| Newsletter (Mailchimp free) | **Free** | Up to 500 subscribers, 1,000 sends/month |
| Form handling (Formspree free) | **Free** | Or Basic plan £8/mo for advanced features |
| Google Workspace email | £5 / mo | Recommended at this tier |

**Realistic monthly total: £15–35**.

---

## Tier 3 — Premium · *Noir Café*

### Build · £450 one-off

- Everything in Tier 2, plus:
- **Full table-booking widget** (party size, date, time, dietaries)
- Day vs. evening menu tabs
- Event calendar (link events directly to booking)
- Sticky "Reserve a table" bar
- Confirmation emails on booking
- Three rounds of revisions

### My monthly fee · £60

Up to **3 hours of updates** per month, booking system monitoring, event calendar management, monthly performance report (visits, bookings, popular pages).

### Third-party costs you pay direct

| Item | Cost | Notes |
|---|---|---|
| Domain `.co.uk` | ~£10 / year | |
| Hosting (Vercel Hobby Pro) | £16 / mo | Needed once booking flow is live |
| **Booking system — pick one:** | | |
|  ↳ Custom-built (in the £450 build) | **From £8 / mo** | Stores bookings in Google Sheets + email — works for small volumes |
|  ↳ ResDiary | £89 / mo | Industry standard, table-plan view, deposits |
|  ↳ OpenTable | £100+ / mo | Bigger reach but takes a per-cover fee too |
|  ↳ Tock | ~£200 / mo | Best for prepaid / tasting menus |
| Newsletter (Mailchimp Essentials) | £10 / mo | Up to 500 contacts, daily sending |
| Google Workspace email | £5 / mo | |
| Transactional email (Resend / Postmark) | £0–10 / mo | For booking confirmations |

**Realistic monthly total: £40–120** — the spread depends mostly on whether you use the built-in booking or pay for ResDiary/OpenTable.

> **My recommendation:** Start with the custom booking (£8/mo). Switch to ResDiary later only if you outgrow it — most small cafés never need to.

---

## Tier 4 — Signature · *Luna Café*

### Build · £750 one-off

- Everything in Tier 3, plus:
- **Three booking flows** in one widget — tables, event tickets, private-hire enquiries
- **Loyalty stamp-card system** (Luna Card — 10th drink free, birthday treat, member discounts)
- Seasonal menu management (publish 4× a year)
- Journal / blog section
- Gift-card-ready storefront
- Top announcement bar for promotions
- Four rounds of revisions
- Includes the **basic paper-card** loyalty mechanic; upgrade to digital wallet via add-on

### My monthly fee · £95

Up to **5 hours of updates** per month, full system monitoring, seasonal menu rollout (4× yearly), monthly performance + loyalty report, journal post help (1 post / month).

### Third-party costs you pay direct

| Item | Cost | Notes |
|---|---|---|
| Domain `.co.uk` + `.com` | ~£20 / year | Buy both, redirect `.com` to `.co.uk` |
| Hosting (Vercel Pro) | £16 / mo | |
| Booking system | £8–100 / mo | Same options as Tier 3 |
| Newsletter (Mailchimp Standard) | £20 / mo | Includes A/B testing, send-time optimisation |
| Google Workspace Business | £10 / mo | Per user — usually 2 accounts |
| Loyalty card service *(if going digital — see add-ons)* | £15–50 / mo | Optional |
| Image CDN / storage | £0–5 / mo | Free on Vercel for normal use |

**Realistic monthly total: £60–180**.

---

## Optional add-ons

### 🤖 AI Chatbot — *"Ask the Café"*

A floating chat widget on the corner of the site that answers questions like *"are you open Sunday?", "do you cater for gluten-free?", "is there parking nearby?"* — trained on your menu, hours, and FAQs.

| | Build | Monthly running |
|---|---|---|
| **DIY** — custom widget on Claude/OpenAI API | **£200 one-off** | £10–25 / mo (usage-based) |
| **Crisp** chat with AI add-on | **£100 setup** | £20 / mo |
| **Intercom Fin** | **£150 setup** | £35–45 / mo |
| **Tidio + Lyro AI** | **£120 setup** | £25–35 / mo |

**Recommended for Tier 3 & 4.** Saves you answering the same DMs 20 times a day. The DIY option is cheaper long-term and reads naturally — but Crisp/Intercom plug into Instagram & WhatsApp DMs too, which can be worth the premium.

---

### 💳 Digital wallet loyalty card (Apple Wallet + Google Wallet)

Replaces the paper Luna Card stamp card with a pass that sits in the customer's phone wallet. Push notifications when they hit reward thresholds. No app for them to download.

| | Build | Monthly running |
|---|---|---|
| **Loopy Loyalty** | **£120 setup** | £15–50 / mo |
| **Stamp Me** | **£120 setup** | £15–35 / mo |
| **PassKit** (white-label, fully branded) | **£200 setup** | £25–99 / mo |
| **Square Loyalty** | **Free if using Square POS** | Included with Square Plus £29/mo |
| **LoyaltyLion** (enterprise) | **£300 setup** | £150+ / mo |

**Recommended for Tier 4.** If you already use Square for payments, the built-in Square Loyalty is the cheapest path. Otherwise Loopy Loyalty is the best value — clean Apple/Google Wallet integration and proper push notifications, around £20/mo for a small café.

> **Worth knowing:** Customers redeem digital loyalty 3–5× more often than paper cards because the card can't be left in a coat pocket. Most cafés see ROI in under 3 months.

---

### Other add-ons

| Add-on | Build | Monthly |
|---|---|---|
| **Online ordering** (collection / pre-order) | £200 | £20–60 (Square, Toast, Slerp) |
| **Gift card system** | £100 | £10–15 (Stripe / Square) |
| **Self-edit menu (mini CMS)** | £150 | **Free** (Sanity / Decap) |
| **Local SEO setup** (Google Business, directories) | £100 | Optional £20/mo ongoing |
| **Multilingual** (e.g. add French) | £120 | None |
| **Cookie consent / GDPR full setup** | £80 | Free (CookieYes free tier) |
| **Photography day** (food + interior) | £200–400 | One-off |

---

## Worked examples

### Small café — **Tier 2, no add-ons**

| | Year 1 | Year 2 onwards |
|---|---|---|
| Build (Tier 2) | £200 | – |
| My monthly fee × 12 | £360 | £360 |
| Domain | £10 | £10 |
| Hosting | Free | Free |
| Email + newsletter | ~£60 | ~£60 |
| **Total** | **£630** | **£430 / year** |

### Mid-size café — **Tier 3 with ResDiary + chatbot**

| | Year 1 | Year 2 onwards |
|---|---|---|
| Build (Tier 3) | £450 | – |
| Chatbot build (DIY Claude) | £200 | – |
| My monthly fee × 12 | £720 | £720 |
| Domain | £10 | £10 |
| Vercel Pro × 12 | £192 | £192 |
| ResDiary × 12 | £1,068 | £1,068 |
| Newsletter × 12 | £120 | £120 |
| Email × 12 | £60 | £60 |
| Chatbot API × 12 | £180 | £180 |
| **Total** | **£3,000** | **£2,350 / year** |

### Flagship café — **Tier 4 with digital loyalty + chatbot**

| | Year 1 | Year 2 onwards |
|---|---|---|
| Build (Tier 4) | £750 | – |
| Chatbot build | £200 | – |
| Loyalty card setup (Loopy) | £120 | – |
| My monthly fee × 12 | £1,140 | £1,140 |
| Domain × 2 | £20 | £20 |
| Vercel Pro × 12 | £192 | £192 |
| Custom booking | £120 | £120 |
| Newsletter (Mailchimp Standard) × 12 | £240 | £240 |
| Email (2 users) × 12 | £240 | £240 |
| Loyalty service × 12 | £300 | £300 |
| Chatbot API × 12 | £240 | £240 |
| **Total** | **£3,562** | **£2,492 / year** |

---

## Discount terms

- **10% off** the build cost if you pay Build + first 6 months of monthly fee upfront.
- **Refer another local business** → first month of their monthly fee discounted by 50%, you get a month free.
- **Multi-year hosting prepay** through me → I'll waive my setup time on any add-on you buy in year 1.

---

## What's *not* included

To keep pricing honest:

- Photography (unless explicitly added)
- Copywriting beyond minor edits
- Logo / brand design — I can recommend a designer
- Printed menus, signage, business cards
- Social-media management or paid ads
- POS or till hardware setup
- VAT on third-party services (charged by them directly)

---

## How to read the numbers

The **build fee** pays for the design + build of the site itself.
The **monthly fee** pays *me* to keep the site looking after itself: edits, monitoring, fixes, improvements.
The **third-party costs** are services the cafe owns directly — domain, hosting, booking system, email — billed to the cafe's card, never marked up.

If a service goes up in price, the cafe pays the new price.
If I change my monthly fee, I give 60 days' notice.
If you cancel after the first 6 months, the site keeps running on whatever hosting it's on — you own the domain, the content, and the code.
