# Neon vCard QR Generator

A React Router framework-mode app for generating and downloading vCard QR codes.

## Stack

- Vite + React + TypeScript
- React Router framework mode with prerendered marketing pages
- Tailwind CSS + shadcn/ui primitives
- React Hook Form + Zod validation
- vcard4 + react-qr-code

## Development

```sh
npm install
npm run dev
```

## Build

```sh
npm run build
npm run preview
```

## Cloudflare Pages

- Build command: `npm run build`
- Build output directory: `dist/client`
- `wrangler.toml` is configured for `wrangler pages deploy`
- The public routes are prerendered, so no SPA catch-all redirect is needed

## Lint & Format

```sh
npm run lint
npm run format
```

## Tests

```sh
npm run test
npm run e2e
```

## Usage Guide

1. Open `/vcard-qr-generator` and fill contact details.
2. Minimum required to unlock QR: first name + one phone number.
3. Watch the QR update live as you edit fields.
4. Click **Download PNG** to export and share.
5. Scanning the QR saves contact directly to the phone contact app.
