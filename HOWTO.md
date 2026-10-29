# How to run andremcmade.com locally

## Prerequisites

- **Node.js** 20+ (22 works)
- **pnpm** 12+ (`corepack enable` or [pnpm install](https://pnpm.io/installation))

From the repo root (`andremcmade/`):

```bash
pnpm install
```

---

## Start the app (dev)

```bash
pnpm dev
```

Open **http://localhost:3000**.

That runs the Next.js app in `apps/web` with hot reload. Leave the terminal open while you work.

### Useful local URLs

| Path | Page |
|------|------|
| `/` | Home |
| `/projects` | Project index |
| `/projects/<slug>` | Project case study |
| `/skills` | Skills (from resume) |
| `/blog/dev` | Dev blog |
| `/blog/dev/<slug>` | Dev post |
| `/blog/music` | Music blog (stub) |
| `/shop` | Shop (stub) |
| `/contact` | Contact form |
| `/uses` | Uses / Stack (stub) |

---

## Stop the app

In the terminal where `pnpm dev` is running:

1. Focus that terminal
2. Press **`Ctrl + C`** (macOS: **Control + C**)

That stops the Next.js dev server. Closing the terminal window also stops it.

If a process is stuck on port 3000:

```bash
lsof -i :3000
kill <PID>
```

Or force:

```bash
kill -9 <PID>
```

---

## Production build (local smoke test)

```bash
pnpm build
pnpm start
```

- `pnpm build` — compiles the site
- `pnpm start` — serves the production build at **http://localhost:3000**

Stop with **`Ctrl + C`** the same way.

---

## Content & assets

| What | Where |
|------|--------|
| Project MDX | `content/projects/*.mdx` |
| Dev blog MDX | `content/blog-dev/*.mdx` |
| Skills JSON | `content/skills/skills.json` |
| Project images | `apps/web/public/images/projects/` |
| Blog images | `apps/web/public/images/blog/` |
| Resume PDF | `apps/web/public/resume/` |

Cover images: prefer **1600×900 (16:9)**. Point `coverImage` in MDX frontmatter at `/images/projects/<file>` or `/images/blog/<file>`.

### New dev blog post

1. Duplicate `content/blog-dev/sample-dev-post-template.mdx`
2. Rename to match your `slug` (e.g. `my-post-title.mdx`)
3. Fill frontmatter (`coverImageAlt` is required)
4. Set `draft: true` until ready; `draft: false` publishes to `/blog/dev`
5. Optional: `relatedProjects` uses project slugs from `content/projects/`

After editing MDX/JSON, refresh the browser. If a page looks stale, restart `pnpm dev`.

---

## Lint

```bash
pnpm lint
```

---

## Contact form

Locally, without `RESEND_API_KEY`, submissions are accepted and logged in the terminal.

To send real email:

1. Copy `.env.example` → `apps/web/.env.local` (or root `.env.local` if your tooling loads it)
2. Set `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, and `CONTACT_FROM_EMAIL`
3. Restart `pnpm dev`

On Vercel: **Settings → Environment Variables** — add the same three keys for Production (and Preview if you want to test there).

---

## Deploy (Vercel)

1. Root Directory: `apps/web`
2. Enable **Include source files outside of the Root Directory** (needed for `content/`)
3. Framework: Next.js
4. **Output Directory:** leave empty / override **off** (do not set `Next.js`)
5. Env (optional): `NEXT_PUBLIC_SITE_URL=https://andremcmade.com`
6. Domain: add in Vercel → Domains, then set A/CNAME at Register.com

See the project README for stack overview.
