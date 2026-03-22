# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Movi Transfer — a commercial website for private chauffeur and car rental services (Ukraine to Europe). Built with Next.js 16, React 19, TypeScript, Tailwind CSS v4, and shadcn/ui (new-york style). Backend uses Supabase. Deployed on Vercel. Originally scaffolded with v0.

## Commands

- **Dev server:** `pnpm dev`
- **Build:** `pnpm build` (TypeScript errors are ignored via `ignoreBuildErrors: true` in next.config.mjs)
- **Lint:** `pnpm lint` (ESLint)
- **No test framework is configured.**

## Architecture

### Routing (App Router)

- `app/page.tsx` — landing page (single-page marketing site with section components)
- `app/routes/` — transfer routes listing
- `app/fleet/` — fleet listing with `[id]` dynamic route
- `app/rental/` — rental hub with `with-driver/` and `self-drive/` sub-pages
- `app/admin/` — admin panel with login, protected by Supabase auth
- `app/actions/booking.ts` — server action for booking submission (inserts into Supabase `bookings` table)
- Static legal pages: `polityka-prywatnosci/`, `polityka-cookies/`, `regulamin/`

### State & Context (Client-Side)

- `lib/language-context.tsx` — `LanguageProvider` / `useTranslation()` for i18n. Locale stored in `localStorage` key `gvt-lang`. Currently only `en` and `pl` are active (uk/ru defined in translations but filtered out).
- `lib/booking-context.tsx` — `BookingProvider` / `useBooking()` for booking form state. Two modes: `chauffeur` and `rental`.
- `lib/translations.ts` — all UI strings as a single TS object keyed by locale (`en`, `uk`, `ru`, `pl`). Type: `Locale`.

### Supabase Integration

- `lib/supabase/client.ts` — browser client via `@supabase/ssr`
- `lib/supabase/server.ts` — server client for server actions/components
- `lib/supabase/middleware.ts` — session refresh, used in root `middleware.ts`
- Env vars required: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- DB migration: `scripts/001_create_bookings.sql`

### UI Layer

- `components/ui/` — shadcn/ui primitives (do not edit directly; managed by shadcn CLI)
- `components/` (root) — page-level components: `hero.tsx`, `navbar.tsx`, `footer.tsx`, `booking.tsx`, `fleet-carousel.tsx`, `routes.tsx`, `reviews.tsx`, etc.
- `components/universal-booking-form.tsx` and `components/route-booking-modal.tsx` — booking forms that use both contexts
- Icons: `lucide-react` (optimized via `experimental.optimizePackageImports`)

### Styling

- Tailwind CSS v4 with `@import 'tailwindcss'` in `app/globals.css`
- Dark-first design: CSS custom properties defined in `:root` use dark palette by default
- Path alias: `@/*` maps to project root

### Hooks

- `hooks/use-mobile.ts` — responsive breakpoint detection
- `hooks/use-scroll-reveal.ts` — intersection observer for scroll animations
- `hooks/use-toast.ts` — toast notification hook (pairs with sonner)
