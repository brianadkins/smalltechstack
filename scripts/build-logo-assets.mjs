import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const root = process.cwd();
const brandDir = path.join(root, 'public', 'brand');
const sourcePath = path.join(brandDir, 'sts-mark.svg');

const colors = {
  ink: '#27312a',
  paper: '#fbfaf4',
  dark: '#141b16',
  lightStroke: '#f4f1e8',
};

const source = await readFile(sourcePath, 'utf8');
const paths = [...source.matchAll(/<path\b[^>]*\/>/g)].map((match) => match[0]);

if (paths.length !== 4) {
  throw new Error(`Expected 4 block paths in ${sourcePath}, found ${paths.length}.`);
}

await mkdir(brandDir, { recursive: true });

function markSvg({ title, description, stroke = colors.ink }) {
  const body = paths
    .map((pathData) => pathData.replace(/stroke="#[^"]+"/, `stroke="${stroke}"`))
    .join('\n    ');

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 180" role="img" aria-labelledby="title desc">
  <title id="title">${title}</title>
  <desc id="desc">${description}</desc>
  <g fill="none" fill-rule="evenodd" stroke="${stroke}" stroke-linecap="round" stroke-linejoin="round" stroke-width="5">
    ${body}
  </g>
</svg>
`;
}

function lockupSvg({ mode, textColor, taglineColor, stroke }) {
  const mark = markSvg({
    title: 'Small Tech Stack mark',
    description: 'Four horizontal hand-drawn colored blocks stacked in a rough right-weighted pyramid.',
    stroke,
  })
    .replace(/<\?xml[^>]*>/, '')
    .replace(/\s*<title\b[^>]*>.*?<\/title>/s, '')
    .replace(/\s*<desc\b[^>]*>.*?<\/desc>/s, '')
    .replace(/<svg[^>]*>/, '<svg x="0" y="18" width="78" height="58" viewBox="0 0 240 180" aria-hidden="true">')
    .replace('</svg>', '</svg>');

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 650 100" role="img" aria-labelledby="title desc">
  <title id="title">Small Tech Stack logo lockup ${mode}</title>
  <desc id="desc">Small Tech Stack name with canonical four-block mark and tagline.</desc>
  ${mark}
  <text x="98" y="47" fill="${textColor}" font-family="Inter, Arial, sans-serif" font-size="38" font-weight="800">Small Tech Stack</text>
  <text x="100" y="77" fill="${taglineColor}" font-family="Inter, Arial, sans-serif" font-size="18" font-weight="800" letter-spacing="5">TECHNOLOGY FOR THE LITTLE GUY.</text>
</svg>
`;
}

const assets = [
  {
    name: 'sts-mark-on-light.svg',
    svg: markSvg({
      title: 'Small Tech Stack mark for light backgrounds',
      description: 'Canonical four-block Small Tech Stack mark with dark outline.',
    }),
  },
  {
    name: 'sts-mark-on-dark.svg',
    svg: markSvg({
      title: 'Small Tech Stack mark for dark backgrounds',
      description: 'Canonical four-block Small Tech Stack mark with light outline.',
      stroke: colors.lightStroke,
    }),
  },
  {
    name: 'sts-logo-on-light.svg',
    svg: lockupSvg({
      mode: 'for light backgrounds',
      textColor: colors.ink,
      taglineColor: '#5b625c',
      stroke: colors.ink,
    }),
  },
  {
    name: 'sts-logo-on-dark.svg',
    svg: lockupSvg({
      mode: 'for dark backgrounds',
      textColor: colors.paper,
      taglineColor: '#c9d0c7',
      stroke: colors.lightStroke,
    }),
  },
];

for (const asset of assets) {
  await writeFile(path.join(brandDir, asset.name), asset.svg);
}

await writeFile(path.join(root, 'public', 'favicon.svg'), assets[0].svg);

const pngs = [
  ['sts-mark-on-light.svg', 'sts-mark-on-light-256.png', 256],
  ['sts-mark-on-light.svg', 'sts-mark-on-light-512.png', 512],
  ['sts-mark-on-dark.svg', 'sts-mark-on-dark-256.png', 256],
  ['sts-mark-on-dark.svg', 'sts-mark-on-dark-512.png', 512],
  ['sts-logo-on-light.svg', 'sts-logo-on-light-800.png', 800],
  ['sts-logo-on-dark.svg', 'sts-logo-on-dark-800.png', 800],
];

for (const [input, output, width] of pngs) {
  await sharp(path.join(brandDir, input))
    .resize({ width })
    .png()
    .toFile(path.join(brandDir, output));
}

console.log(`Built ${assets.length} SVG assets and ${pngs.length} PNG assets from ${sourcePath}.`);
