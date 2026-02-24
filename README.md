# Neon vCard QR Generator

A Vite + React Router SPA for generating and downloading vCard QR codes.

## Stack

- Vite + React + TypeScript
- React Router (SPA routing)
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

## Lint & Format

```sh
npm run lint
npm run format
```

## Usage Guide

1. Open `/app` and fill contact details.
2. Minimum required to unlock QR: first name + one phone number.
3. Watch the QR update live as you edit fields.
4. Click **Download PNG** to export and share.
5. Scanning the QR saves contact directly to the phone contact app.
