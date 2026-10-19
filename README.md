# Small Tech Stack

Astro website for Small Tech Stack, focused on volunteer nonprofit IT work, small websites, apps, automations, and related policy pages.

The site also includes a project area for software/app policy pages.

## Routes

- `/` homepage
- `/nonprofits/` nonprofit focus areas and past volunteer projects
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
