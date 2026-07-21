# Duskra — React app (new architecture)

This is a fresh start: React + Vite + TypeScript + Tailwind v4 + Framer Motion
(`motion`) + `lucide-react`, matching the glassmorphism hero spec you sent
over, with the copy swapped to Duskra's own branding instead of the
placeholder text it came with.

This is **separate from** the single-file `duskra/index.html` project from
before — that one still exists and still works if you want it, but this repo
is the one to build forward on now that you're going Vercel + Supabase.

## What's built right now

Just the **Hero** section — navbar, headline, badge, the bottom-left stat
card, and the bottom-right corner-cutout card ("Care Guide"), all animated
with `motion` exactly per the component breakdown you sent, with Duskra's
actual copy in place of the reference text.

## What's not built yet

Everything else from the old site — Shop, Product page, Cart, Checkout,
Admin — still only exists in the old vanilla-JS version. Say the word and
I'll port those into this same React app next, and wire them to Supabase
while I'm at it (that's the natural next step given your stack).

## One thing you need to add: the hero video

The spec calls for a video background. I didn't reuse the video URL from the
reference spec — it doesn't belong to Duskra, and hot-linking someone else's
CDN asset isn't something I'll do. Instead, `Hero.tsx` points at:

```
public/hero-video.mp4
public/hero-poster.jpg   (shown while the video loads, and if it fails)
```

Drop your own footage there (ideally something in the same spirit as the
"see it in motion" clip from the product page — the sand art moving is a
strong candidate) with those exact filenames, and it'll pick it up
automatically. Until then, the same gradient background from the old site
shows through, so it never looks broken.

## Running it locally

```bash
npm install
npm run dev
```

Opens at `http://localhost:5173`.

## Deploying to Vercel

This is a standard Vite project, so Vercel auto-detects it — no config
needed:

1. Push this folder to a GitHub repo (or a new folder in your existing one).
2. On [vercel.com/new](https://vercel.com/new), import that repo.
3. Framework preset: **Vite** (auto-detected). Build command `npm run build`,
   output directory `dist` — Vercel fills these in for you.
4. Deploy.

## Next steps, in order

1. Add your hero video/poster (above).
2. Say if you want Shop/Product/Cart/Checkout/Admin ported into this app.
3. Once that's in, wire it to Supabase (tables + auth, per the schema I sent
   earlier) instead of localStorage.
