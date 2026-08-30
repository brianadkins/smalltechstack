# Small Tech Stack

Astro website for Small Tech Stack, focused on volunteer nonprofit IT work, small websites, apps, automations, and related policy pages.

The site also includes a project area for software/app policy pages.

## Routes

- `/` homepage
- `/nonprofits/` nonprofit focus areas and past volunteer projects
- `/projects/` software and app project index
- `/support/` support contact page
- `/privacy/` company privacy policy
- `/terms/` company terms
- `/projects/product-starter/privacy/` project privacy template
- `/projects/product-starter/terms/` project terms template

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
