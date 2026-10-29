<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Repo shape

- Single Next.js 16.4.3 App Router app (not a monorepo). npm only (`package-lock.json` — don't introduce yarn/pnpm). No CI: verification is local.
- All app code under `src/`. Routes: `/`, `/destinations`, `/destinations/[destinationId]`, `/add-destination`, `/login`, `/signup`, `/my-bookings`; plus the better-auth catch-all at `/api/[...all]`. Feature components live in `src/components/<feature>/`; shadcn primitives in `src/components/ui/`. The root layout wraps every page in Navbar + Footer.
- The README is untouched create-next-app boilerplate — its `app/page.tsx` path is wrong.
- Path alias `@/*` → `src/*`. Typed routes are on; root layout uses the generated global type `LayoutProps<"/">`.
- React Compiler is enabled (`reactCompiler: true` in `next.config.ts` + `babel-plugin-react-compiler`).
- Tailwind CSS v4, CSS-first: no `tailwind.config` — theme/tokens live in `src/app/globals.css`. CSS is compiled via the `@tailwindcss/turbopack` rule in `next.config.ts`; breaking that rule breaks `dev` and `build`.
- shadcn/ui with style `base-nova` (`components.json`): primitives are built on **@base-ui/react**, not Radix — don't paste Radix-based examples. ~70 components are already vendored in `src/components/ui/`; look there before writing a new primitive, and add more with `npx shadcn add <component>`. `cn()` comes from `src/lib/utils.ts` (re-exports the `cn` package).

## Auth (better-auth + MongoDB)

- Server config: `src/lib/auth.ts` — better-auth with the MongoDB adapter, email+password sign-in, plus the `jwt()` plugin. It runs `import "dotenv/config"` and `new MongoClient(process.env.MONGODB_URL)` **at module load**: a missing/invalid `MONGODB_URL` in `.env` throws on import and crashes every route that touches auth, including the proxy.
- Client: `src/lib/auth-client.ts` (`signIn`/`signUp`/`useSession` from `better-auth/react`; `jwtClient()` plugin; `baseURL: process.env.BETTER_AUTH_URL`). HTTP handler: `src/app/api/[...all]/route.ts` (`toNextJsHandler`). Note: `src/app/api/auth` is a stray zero-byte file, not a route — the router ignores it; don't edit it.
- The JWT plugin is load-bearing: every call to the external backend is authorized with a Bearer JWT obtained via `getTokenFromServer()` (`src/lib/getTokensServer.ts`, server-side) or `getTokenFromClient()` (`src/lib/getTokenClient.ts`, client-side).
- `src/proxy.ts` is Next 16's middleware replacement. It session-checks and redirects to `/login` for `/destinations/:path*`, `/my-bookings`, and `/add-destination`. New protected pages must be added to its `config.matcher`.
- `.env*` is gitignored; a local `.env` must provide `MONGODB_URL`, `BETTER_AUTH_SECRET`, and `BETTER_AUTH_URL`.

## External backend (not in this repo)

- All trip/booking data comes from an API server on `http://localhost:5000` (separate project; nothing in this repo implements it). Every request carries an `Authorization: Bearer <JWT>` header.
- Server reads go through `src/lib/destinations.ts` (`getDestinations()`, `getDestination(id)`, `getMyBookings(email)` — used by `/destinations`, `/destinations/[destinationId]`, and `/my-bookings` respectively). Exception: `src/components/home/FeaturedDestination.tsx` fetches `GET /featured-destination` directly (and without a token).
- Writes are direct client-side `fetch` calls in feature components: `add-destination-form.tsx` (`POST /destinations`), `EditDestinationDialog.tsx` (`PATCH /destinations/{id}`), `DeleteDestinationDialog.tsx` (`DELETE /destinations/{id}`), `BookingCard.tsx` (`POST /bookings`), `MyBookingCard.tsx` (`DELETE /my-bookings/{id}`).
- Quirk: unknown ids return **200 with an empty body**, not 404 — `getDestination()` maps that to `"not-found"`.
- `/destinations` and `/destinations/[destinationId]` are `export const dynamic = "force-dynamic"`: rendered per request, so they always show fresh data and `next build` does **not** need the backend (or auth DB) running. When the API is down, they render an error state (from the fetch helpers) instead of crashing.
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
