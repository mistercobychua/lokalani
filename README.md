# LokalANI — mobile UI mockup

*Walang sayang na ani.* A high-fidelity, clickable phone-app prototype for **LokalANI**, a B2B hyperlocal platform that turns end-of-day Metro Manila palengke surplus into cheap, pre-arranged supply for carinderias, delivered by TODA tricycle drivers.

This is a **front-end mockup only** — no backend, no database, no real APIs. All data is hardcoded and all state lives in React.

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
```

`npm run build` type-checks and produces a production bundle; `npm run preview` serves it.

## What's inside

One demo app with a **role-picker launcher** → each role opens its own mobile app with its own bottom-tab navigation. A persistent **"Palit"** control in the app bar returns to the launcher to switch roles.

- **Carinderia / Buyer** — Palengke (marketplace) · Listing detail · Mga Abiso (2 km alerts) · Orders (live tracking) · Tipid + Eco-Badge · Profile
- **Market Vendor / Seller** — Dashboard · Mag-list (voice-to-text) · Forward-List scheduler · Listings (manage) · Kita (impact) · Profile
- **TODA Driver** — Mga Deliver (jobs) · Job detail/route · Active delivery (numbered steps) · Kita · Zone (capacity cap) · Profile

### Feature highlights (all hardcoded)
AI freshness predictor · dynamic discount engine with live countdowns · 2 km proximity alerts · forward-listing · voice-to-text listing · route-compliant TODA matching · batch/pooled delivery (₱25 × N) · hub-and-spoke relay drop-point · surplus window (3–6 PM) + driver capacity cap · cross-sell wholesaler add-on · Eco-Badge · skippable first-run coachmarks per role · persistent "?" help.

## Stack

Vite + React + TypeScript · Tailwind CSS v4 · React Router · lucide-react · Plus Jakarta Sans + Inter (self-hosted via `@fontsource`, so it works offline at a pitch). Produce is represented with emoji in styled tiles; the map is a stylized SVG — no external image hosting, no maps API, no storage.

## Design

Calm, green-led palette (soft sage-forest primary, warm off-white surfaces, gentle amber accents). Built against Nielsen's 10 heuristics and mobile ergonomics: visible system status, back/exit everywhere, confirm-before-commit, icon **+** text labels, ≥48px touch targets, bottom-anchored primary actions, and WCAG AA contrast. Plain-Taglish microcopy throughout, designed to be usable on first try — including by people who rarely use a smartphone.

## Structure

```
src/
  components/   reusable UI (PhoneFrame, AppBar, BottomNav, ListingCard, RouteMap, …)
  screens/      launcher + buyer / vendor / driver screens
  data/         hardcoded PH mock data (listings, jobs, personas, help)
  lib/          AppContext (state + demo clock), formatting, roles, freshness
```
