# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Structure

```text
artifacts-monorepo/
├── artifacts/              # Deployable applications
│   ├── api-server/         # Express API server
│   └── fireplace-records/  # Fireplace Records website (React + Vite)
├── lib/                    # Shared libraries
│   ├── api-spec/           # OpenAPI spec + Orval codegen config
│   ├── api-client-react/   # Generated React Query hooks
│   ├── api-zod/            # Generated Zod schemas from OpenAPI
│   └── db/                 # Drizzle ORM schema + DB connection
├── scripts/                # Utility scripts (single workspace package)
│   └── src/                # Individual .ts scripts
├── pnpm-workspace.yaml     # pnpm workspace
├── tsconfig.base.json      # Shared TS options
├── tsconfig.json           # Root TS project references
└── package.json            # Root package with hoisted devDeps
```

## Fireplace Records Website

**Purpose**: Official website for Fireplace Records, a brick-and-mortar vinyl record store at 5100 Baltimore Ave, Hyattsville, MD. Owned by DJ 2-Tone Jones.

**Sections**:
1. **Hero** — Bold branding, Grand Opening Weekend (March 27–29) announcement
2. **Events** — Grand Opening Weekend lineup + Sound Doctors 404 Day (April 4th) showcase
3. **About** — Store info, formats carried (Vinyl/Cassettes/CDs/DVDs/VHS), coming-soon online store notice
4. **Visit** — Hours (Thu–Sun 12PM–8PM), address, phone (240) 334-7546
5. **Mailing List** — Email signup form that saves to DB via API

**Design**: Dark modern aesthetic, Clash Display + DM Sans fonts, bold red/orange accents. Fluid typography via `clamp()`. Framer Motion animations.

**Security** (per Steve Gibson / Security Now principles):
- CSP headers: `default-src 'self'`, no inline scripts
- X-Frame-Options: DENY
- X-Content-Type-Options: nosniff
- Referrer-Policy: strict-origin-when-cross-origin
- Permissions-Policy: restricts camera/mic/geo
- HSTS in production
- X-Powered-By header disabled
- All external links use `rel="noopener noreferrer"`

**Future work**: Online store to be connected once POS/inventory system is chosen.

## TypeScript & Composite Projects

Every package extends `tsconfig.base.json` which sets `composite: true`. The root `tsconfig.json` lists all packages as project references.

- **Always typecheck from the root** — run `pnpm run typecheck`
- **`emitDeclarationOnly`** — we only emit `.d.ts` files during typecheck
- **Project references** — when package A depends on package B, A's `tsconfig.json` must list B in its `references` array

## Root Scripts

- `pnpm run build` — runs `typecheck` first, then recursively runs `build` in all packages
- `pnpm run typecheck` — runs `tsc --build --emitDeclarationOnly` using project references

## Packages

### `artifacts/fireplace-records` (`@workspace/fireplace-records`)

React + Vite frontend for the Fireplace Records website. Single-page scrollable layout.

- `src/pages/Home.tsx` — Main page with all sections
- `src/App.tsx` — App wrapper with QueryClient, routing
- `src/index.css` — Tailwind v4 theme with dark vinyl aesthetic
- `public/grand-opening-flyer.png` — Grand Opening Weekend flyer
- `public/404-day-flyer.png` — Sound Doctors 404 Day flyer
- `public/images/vinyl-texture.png` — Hero background texture

### `artifacts/api-server` (`@workspace/api-server`)

Express 5 API server.

- `GET /api/healthz` — Health check
- `POST /api/mailing-list` — Subscribe email to mailing list

### `lib/db` (`@workspace/db`)

Database layer. Tables:
- `mailing_list` — Email subscribers (id, email unique, name, subscribed_at)

### `lib/api-spec` (`@workspace/api-spec`)

OpenAPI 3.1 spec (`openapi.yaml`). Run codegen: `pnpm --filter @workspace/api-spec run codegen`

### `lib/api-zod` (`@workspace/api-zod`)

Generated Zod schemas: `HealthCheckResponse`, `SubscribeMailingListBody`.

### `lib/api-client-react` (`@workspace/api-client-react`)

Generated React Query hooks from the OpenAPI spec.

### `scripts` (`@workspace/scripts`)

Utility scripts package.
