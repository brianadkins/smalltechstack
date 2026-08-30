# STS Logo Assets

The canonical logo mark is `sts-mark.svg`.

All other files in this folder are derived from that singular SVG by running:

```sh
npm run brand:build
```

## Files

- `sts-mark.svg`: canonical source mark
- `sts-mark-on-light.svg`: mark for light backgrounds
- `sts-mark-on-dark.svg`: mark for dark backgrounds
- `sts-logo-on-light.svg`: full logo for light backgrounds
- `sts-logo-on-dark.svg`: full logo for dark backgrounds
- `*-256.png`, `*-512.png`, `*-800.png`: raster exports generated from the SVG assets

Do not redraw separate logo variations. Update the canonical mark first, then regenerate the derived files.
