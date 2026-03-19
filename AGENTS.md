# AGENTS.md

This file gives future coding agents enough context to work on this repo without extra prompting.

## Project Snapshot

- **App**: `vCard QR Generator`
- **Stack**: Vite + React + TypeScript + React Router framework mode (`ssr: false` + prerendered pages)
- **UI**: Tailwind + shadcn-style components
- **Forms/Validation**: React Hook Form + Zod
- **QR/vCard**: `react-qr-code` + `vcard4`
- **Lint/Format**: Biome (ESLint/Prettier removed)
- **Tests**:
  - Unit: Vitest
  - E2E: Playwright

## Current Product Behavior

- Routes:
  - `/` and `/home` -> Home page
  - `/vcard-qr-generator` -> Generator page
  - `/qr-code-for-contact` -> SEO landing page
  - `/vcard-qr-code-free` -> SEO landing page
  - `/qr-code-business-card` -> SEO landing page
  - `/how-to-create-vcard-qr-code` -> SEO landing page
- Theme:
  - Light/Dark supported
  - Default comes from **system preference** (`prefers-color-scheme`)
  - User can toggle theme from navbar
- QR generation:
  - Live preview updates while typing
  - Minimum required for unlocked preview: **first name + one phone number**
  - Download is inline (no dialog)
  - Multiple visual themes for exported QR card (left/right slideshow)
  - Select visible card text mode:
    - `Name Only`
    - `Name + Phone`
    - `More Info`
  - Encoded vCard data remains full based on filled inputs; display mode only affects visible card text around QR

## Key Files

- App shell/layout: `src/root.tsx`
- Route config: `src/routes.ts`
- Navbar/theme toggle: `src/components/NavBar.tsx`
- Home page: `src/pages/HomePage.tsx`
- Generator page: `src/pages/GeneratorPage.tsx`
- Form + validation: `src/components/QRForm.tsx`
- QR preview/download/themes: `src/components/QRPreviewCard.tsx`
- vCard builder logic: `src/lib/vcard.ts`
- SEO helpers: `src/lib/seo.ts`
- Landing page content: `src/lib/landing-pages.ts`
- Global tokens/styles: `src/index.css`

## Commands

- Dev: `npm run dev`
- Build: `npm run build`
- Preview: `npm run preview`
- Typecheck: `npm run typecheck`
- Lint: `npm run lint`
- Format: `npm run format`
- Unit tests: `npm run test`
- E2E tests: `npm run e2e`
- E2E UI mode: `npm run e2e:ui`

## Testing Notes

- Unit tests:
  - `src/lib/vcard.test.ts`
  - `src/components/QRPreviewCard.test.ts`
- E2E tests:
  - `tests/e2e/app.spec.ts`
  - Includes assertions for:
    - Home -> Generator navigation
    - Minimum data unlock behavior
    - Theme switching and info mode
    - **Download filename** matches selected theme (e.g. `midnight-vcard-qr.png`)

## Implementation Guardrails

- Keep routing in React Router framework mode and prerender config in `react-router.config.ts`
- Keep system theme as default unless explicitly changing product behavior
- Do not reintroduce ESLint/Prettier unless requested; Biome is canonical
- Preserve minimum validation rule: first name + one number
- If changing download logic, ensure Playwright download-filename test still passes
- Keep SEO tags and structured data in sync with branding (`vCard QR Generator`)

## Common Change Patterns

- Add new QR card themes: edit `qrThemes` in `src/components/QRPreviewCard.tsx`
- Adjust visible card text logic: edit `getVisibleDetails` in `src/components/QRPreviewCard.tsx`
- Adjust vCard payload fields/format: edit `generateVCardString` in `src/lib/vcard.ts`
- Modify form rules: update Zod schema in `src/components/QRForm.tsx`

## Pre-PR Checklist

Run all before committing:

1. `npm run format`
2. `npm run lint`
3. `npm run typecheck`
4. `npm run test`
5. `npm run e2e`
6. `npm run build`
