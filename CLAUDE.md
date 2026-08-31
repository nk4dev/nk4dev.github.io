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

- `src/layout/main.tsx` — site-wide shell: announcement banner, header nav (`Blog`, `Dev Projects`, `Apps`, `Scraps`), footer, and `ClickSpark` canvas overlay
- `src/components/headermeta.tsx` (`HMeta`) — OG/Twitter meta tags; auto-generates OG image via `ogp-img-gen.vercel.app` if no image is supplied
- `src/libs/gtag.ts` — Google Analytics (GA4 ID `G-9TG7JEDDCX`) pageview/event helpers; called from `_app.tsx` on route changes

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
