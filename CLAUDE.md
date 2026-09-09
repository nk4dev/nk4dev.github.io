# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
bun run dev          # local dev server
bun run build        # Next.js build
bun run preview      # OpenNext Cloudflare build + local preview
bun run deploy       # OpenNext Cloudflare build + deploy to Workers
bun run prepare      # regenerate PandaCSS styled-system/ (run after panda.config.ts changes)
bun run cf-typegen   # regenerate cloudflare-env.d.ts bindings
```

No test suite is configured.

## Environment

Copy `.env.local.example` to `.env.local` and set:

```
CMS_API_KEY=<microCMS API key>
```

The microCMS service domain is hard-coded as `nknighta-github` in `src/utils/cms.ts`.

## Architecture

**Stack**: Next.js 16 (Pages Router) · React 19 · TypeScript · PandaCSS · microCMS · GSAP · Framer Motion · deployed to **Cloudflare Workers** via `@opennextjs/cloudflare`.

### Styling — PandaCSS

All styles use the `css()` utility imported from `../../styled-system/css` (a codegen artifact). This is **not** Tailwind. The `styled-system/` directory is generated — never edit it by hand; run `bun run prepare` to regenerate after config changes.

### CMS — microCMS

`src/utils/cms.ts` exports a singleton client and typed helpers (`getBlogs`, `getBlog`, `getCategories`). Content endpoints used across the site:

| Endpoint | Used by |
|---|---|
| `blogs` | `/blog`, `/blog/[id]`, `/blog/category/[id]`, `/blog/page/[p]` |
| `categories` | `/blog` |
| `projects` | `/dev`, `/dev/[id]` |
| `scraps` | `/scraps`, `/scraps/[id]` |

CMS content bodies are rendered as raw HTML via `dangerouslySetInnerHTML`. An inline `<style>` string (`cmsstyle`) is appended to handle code block formatting on detail pages.

Draft preview: `src/proxy.ts` (Next 16 proxy convention, formerly `middleware.ts`) intercepts `?draftKey=` query params and redirects to `/api/draft` for draft mode activation.

### Layout & shared components

- `src/layout/main.tsx` — site-wide shell ("Portfolio Blog" design: dark purple dotted background, sticky header nav `Blog`/`Dev Projects`/`Apps`/`Scraps`/`About` + mobile hamburger drawer, footer), `ClickSpark` canvas overlay. The mobile drawer is rendered as a sibling of `<header>`, not a child — `backdropFilter` on an ancestor makes it the containing block for `position: fixed` descendants, which would otherwise collapse the drawer to the header's own height.
- `src/components/headermeta.tsx` (`HMeta`) — OG/Twitter meta tags; auto-generates OG image via `ogp-img-gen.vercel.app` if no image is supplied. Untouched by the visual redesign — pass the same props as before.
- `src/libs/gtag.ts` — Google Analytics (GA4 ID `G-9TG7JEDDCX`) pageview/event helpers; called from `_app.tsx` on route changes
- `src/libs/fonts.ts` — `next/font/google` Newsreader (serif, headings) + Public Sans (sans, body/UI); CSS variables applied once in `_app.tsx`
- `src/libs/lang.tsx` — `LangProvider`/`useLang()`, a ja/en toggle for hardcoded UI copy only (nav, hero/about text). **Must** be mounted in `_app.tsx` above `<Component />` — a page cannot provide its own ancestor context to itself, so mounting it inside `Layout` instead throws "must be used within a LangProvider" for every page that calls `useLang()`. microCMS content (blog/project bodies) is never translated.
- `src/data/profile.ts` — hand-authored bio content (skills, tech stack, repos, contacts, history) shared by `/` and `/whoareyou`, bilingual where the design calls for it

### Panda token gotcha (Portfolio Blog theme)

The color/font values for the redesigned pages (`portfolioBg`, `portfolioAccent`, `portfolioSerif`, ...) live in `panda.config.ts` under `theme.extend.tokens`, **not** as plain JS constants. Panda's `css()` extraction is static: it only understands literal values written directly at the call site or its own token names/`{colors.tokenName}` interpolation — a value imported from another module (even a plain exported string) is invisible to it and silently produces a class with no matching CSS. Reuse a color/font by adding a token and referencing its name as a literal string (`color: "portfolioText"`, `border: "1px dashed {colors.portfolioBorder}"`), never by importing a JS object into `css()`. Re-run `bun run prepare` after editing tokens.

### Animation components

All sourced from [reactbits.dev](https://reactbits.dev):

- `AnimatedContent` — GSAP ScrollTrigger slide-in wrapper
- `SplitText` — GSAP SplitText character/word/line stagger animation
- `ClickSpark` — canvas spark burst on click (wraps the entire page in `Layout`)
- `CurvedLoop` / `TextType` — CSS-based marquee and typewriter animations

### Static generation pattern

Content pages use `getStaticPaths` + `getStaticProps` with `fallback: false`. Unpublished items (no `publishedAt`) are excluded from paths and return `{ notFound: true }` from `getStaticProps`.

### Redirect/shortlink pages

Single-character pages (`/g`, `/i`, `/q`, `/x`) and pages under `/l/vx/*` are thin client-side redirects using `useEffect(() => { router.push(url) }, [])`.

### Devmode panel

Detail pages (`/blog/[id]`, `/dev/[id]`, `/scraps/[id]`) render a raw CMS JSON viewer when `process.env.NODE_ENV === 'development'`, toggled by a fixed-position button.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
