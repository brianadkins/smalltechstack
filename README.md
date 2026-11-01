# Small Tech Stack

Astro website for Small Tech Stack, focused on volunteer nonprofit IT work, small websites, apps, automations, and related policy pages.

The site also includes a project area for software/app policy pages.

## Routes

- `/` homepage
- `/nonprofits/` nonprofit focus areas and past volunteer projects
- `/blog/` blog index, newest posts first
- `/blog/<filename>/` individual blog posts
- `/rss.xml` blog RSS feed
- `/apps/utility-assistant/` Utility Assistant portfolio page
- `/apps/apex-development-map/` Apex Simple Development Map portfolio page
- `/apps/what-were-we-watching/` What Were We Watching? portfolio page
- `/projects/` software and app project index
- `/support/` support contact page
- `/privacy/` company privacy policy
- `/terms/` company terms
- `/projects/product-starter/privacy/` project privacy template
- `/projects/product-starter/terms/` project terms template

## App portfolio pages

All app overview pages use `src/components/PortfolioApp.astro`, generated from
the typed `apps` entries in `src/data/site.ts` by `src/pages/apps/[slug].astro`.
The Apps menu uses the same entries. Keep app-specific documentation and policy
routes separate from the overview template.

Each overview follows this order in one main column:

1. Introduction: icon, name, description, availability, and a primary action.
2. What it helps with: three or four concrete capabilities written for users.
3. Screenshots: captioned, uncropped images linking to their full-size originals.
   Omit the gallery when screenshots are unavailable; identify development builds.
4. Details and links: audience, platforms, availability, and useful resources.

Use the existing app branding. Put assets under `public/apps/<slug>/` and record
their actual dimensions and descriptive alt text in the app entry. State web,
development, and App Store availability explicitly. Include independent-project
or official-data context near the introduction when relevant. Only add support,
privacy, documentation, and source links that exist; optional content should not
produce empty sections. Keep reading width and section spacing in the shared
component so new pages stay consistent.

## Writing blog posts

Create a Markdown file under `src/content/blog/`. Its filename becomes its URL:
`my-first-post.md` appears at `/blog/my-first-post/`. Keep filenames lowercase,
use hyphens between words, and keep them stable after publication. Nested folders
also work, for example `projects/a-small-tool.md`.

Start with this frontmatter, followed by the post body:

```markdown
---
title: "Your post title"
description: "A short summary for the blog index, search previews, and RSS."
pubDate: "2026-11-01"
draft: true
---

Write the introduction here. The page template supplies the title and summary,
so use level-two headings for sections:

## A section heading

More text, lists, links, images, and code blocks can follow.
```

Title, description, and a valid publication date are required. Dates use UTC for
consistent display. Posts are sorted newest first by `pubDate`. The date controls
display and sorting, not scheduled publication.

Drafts are excluded from the index, generated post routes, and RSS in both local
development and production. Set `draft: false` when ready to publish (omitting
`draft` also publishes the post), then run `npm run build` and review the PR before
merging. A new build is needed for changes to appear on the deployed site.
To preview an unpublished post locally, temporarily set `draft: false`; restore
it before committing if the post should remain unpublished.

Store post images under `public/blog/` and reference them with an absolute site
path such as `![Descriptive alt text](/blog/my-first-post/photo.jpg)`.

The collection schema is in `src/content.config.ts`, shared filtering and date
formatting are in `src/lib/blog.ts`, and all posts use
`src/layouts/BlogPost.astro`. RSS at `/rss.xml` contains post summaries and links.
The first post is `google-groups-distribution-lists.md`. No example posts are published.

Posts with at least three level-two (`##`) headings get an automatic table of
contents. It stays on the right on wide screens and becomes a collapsible
“On this page” above the article on smaller screens. Its links work without
JavaScript; a small script highlights the section currently being read.

For a scannable fix or recommendation, use this HTML callout in Markdown:

```html
<aside class="fix-callout" aria-label="Fix">
  <p><strong>Fix:</strong> Your practical recommendation goes here.</p>
</aside>
```

The shared post layout supplies the background, accent border, and label styling.

Run `npm run test:blog` to check Markdown rendering, newest-first ordering,
RSS escaping, schema validation, draft exclusion, and deletion of cached posts.
This creates temporary posts in the current checkout, removes them, and rebuilds
the original content. Do not run it concurrently with another build or deployment.

## Development

```sh
npm install
npm run dev
```

## Build

```sh
npm run build
```

## Cloudflare

This site can be deployed from the Cloudflare UI as a static Astro site.

Cloudflare build settings:

- Build command: `npm run build`
- Build output directory: `dist`

The optional `wrangler.jsonc` file mirrors the same static asset setup for local
validation.

Domains:

- `smalltechstack.com`
- `www.smalltechstack.com`

Manage both custom domains in the Cloudflare dashboard.

Worker static-assets dry run:

```sh
npm run cf:dry-run
```
