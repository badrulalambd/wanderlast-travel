<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Repo shape

- Single Next.js 16.4.3 App Router app (not a monorepo). npm is the package manager (`package-lock.json` — don't introduce yarn/pnpm). No CI: verification is local.
- All app code is under `src/` (App Router): routes are `/` (landing page composed of `src/components/{banner,why-choose,testimonials,cta}/`), `/destinations`, and `/add-destination`. Feature components live in `src/components/<feature>/`; shadcn primitives in `src/components/ui/`. The README is untouched create-next-app boilerplate — its `app/page.tsx` path is wrong.
- Path alias `@/*` → `src/*`. Root layout uses the generated global type `LayoutProps<"/">` (typed routes are on).
- React Compiler is enabled (`reactCompiler: true` in `next.config.ts` + `babel-plugin-react-compiler`).
- Tailwind CSS v4, CSS-first: no `tailwind.config` — theme/tokens live in `src/app/globals.css` (`@import "tailwindcss"`, `@theme inline`, `@custom-variant dark`). CSS is compiled via the `@tailwindcss/turbopack` rule in `next.config.ts`; breaking that rule breaks `dev` and `build`.
- shadcn/ui with style `base-nova` (`components.json`): primitives are built on **@base-ui/react**, not Radix — don't paste Radix-based examples. ~70 components are already vendored in `src/components/ui/`; look there before writing a new primitive, and add more with `npx shadcn add <component>`. `cn()` comes from `src/lib/utils.ts` (re-exports the `cn` package).

## External backend (not in this repo)

- All destination data comes from an API server on `http://localhost:5000` (separate project; nothing in this repo implements it). Call sites: `src/lib/destinations.ts` (`getDestinations()` for the list, `getDestination(id)` for the detail page) and `src/components/add-destination/add-destination-form.tsx` (client-side `POST`). Quirk: unknown ids return **200 with an empty body**, not 404.
- `/destinations` and `/destinations/[destinationId]` are `export const dynamic = "force-dynamic"`: rendered per request, so they always show fresh data and `next build` does **not** need the backend running. When the API is down, they render an error state (from the fetch helpers) instead of crashing.
- Destination image URLs are arbitrary user-supplied hosts, hence the blanket `images.remotePatterns` in `next.config.ts` — narrowing it will break card images.

## Commands

```bash
npm run dev        # Turbopack dev server; also rewrites the block above — keep it
npm run lint       # bare `eslint` (flat config, eslint-config-next)
npx tsc --noEmit   # typecheck — there is no `typecheck` script
npm run build      # production build; runs TypeScript but NOT eslint
```

Verification order: `npx tsc --noEmit` → `npm run lint` → `npm run build`.

Gotchas:

- `npm run lint` currently fails with 2 pre-existing `react-hooks/set-state-in-effect` errors in `src/components/ui/carousel.tsx` and `src/hooks/use-mobile.ts` (shadcn-generated scaffold). They're not yours — don't let them mask errors you introduce, and don't churn on "fixing" generated files.
- No test framework exists (no `test` script, no test files). Don't invent one without asking.
- No `.env` files are committed (`.env*` is gitignored) and nothing currently reads env vars.
