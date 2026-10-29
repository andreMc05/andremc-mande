# andremcmade.com

Personal portfolio for **Andre McGruder** — projects, skills, dual blogs (dev / music), and non-music merch.

## Stack (v1)

- **Apps:** Next.js 16 (App Router) + TypeScript in `apps/web` (Vercel)
- **Workspace:** pnpm (no Turborepo yet)
- **Content:** hand-rolled MDX + Zod + `next-mdx-remote/rsc` (step 2)
- **APIs:** Vercel Route Handlers first; AWS CDK stacks later under `infra/cdk`
- **Shop:** headless Shopify + Printify (content later)

## Commands

```bash
pnpm install
pnpm dev      # start → http://localhost:3000
              # stop  → Ctrl+C in that terminal
pnpm build
pnpm lint
```

Full start/stop, content paths, and Vercel notes: **[HOWTO.md](./HOWTO.md)**.

## Repo layout

```
apps/web          Next.js site
content/          MDX collections (projects, blog-dev, blog-music)
infra/cdk         AWS CDK (deferred until after contact API)
```

## Build order

See project brief. Current milestone: **scaffold** (layout, nav, design tokens, route stubs).
