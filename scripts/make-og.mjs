// Generates the Open Graph share card and the Apple touch icon.
import sharp from 'sharp';
import path from 'node:path';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const site = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const pub = path.join(site, 'public');

const card = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <defs>
    <radialGradient id="g" cx="0.15" cy="0.1" r="0.9">
      <stop offset="0" stop-color="#B9F36B" stop-opacity="0.16"/>
      <stop offset="0.6" stop-color="#10151C" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="#10151C"/>
  <rect width="1200" height="630" fill="url(#g)"/>
  <text x="72" y="118" font-family="Menlo, monospace" font-size="22" fill="#B9F36B" letter-spacing="3">SAYED SHALAN · MOBILE SOLUTIONS ARCHITECT</text>
  <text font-family="Helvetica Neue, Helvetica, Arial" font-weight="700" font-size="60" fill="#F4F7FB">
    <tspan x="72" y="226">I design and engineer</tspan>
    <tspan x="72" y="300" fill="#B9F36B">secure, scalable,</tspan>
    <tspan x="72" y="374" fill="#B9F36B">high-performance</tspan>
    <tspan x="72" y="448">mobile solutions.</tspan>
  </text>
  <text x="72" y="540" font-family="Helvetica Neue, Helvetica, Arial" font-size="25" fill="#B5C0CE">Flutter, Android &amp; iOS · Architecture · Security · AI-Powered Engineering</text>
  <circle cx="968" cy="290" r="176" fill="none" stroke="#B9F36B" stroke-opacity="0.35" stroke-width="2" stroke-dasharray="2 10"/>
  <circle cx="968" cy="290" r="150" fill="#1B2430" stroke="#B9F36B" stroke-opacity="0.7" stroke-width="3"/>
</svg>`;

const media = JSON.parse(readFileSync(path.join(site, 'src', 'data', 'media.json'), 'utf8'));
const portrait = await sharp(path.join(pub, media.portrait.sources.at(-1).src))
  .resize(288, 288)
  .composite([{ input: Buffer.from('<svg width="288" height="288"><circle cx="144" cy="144" r="144" fill="#fff"/></svg>'), blend: 'dest-in' }])
  .png()
  .toBuffer();

await sharp(Buffer.from(card))
  .composite([{ input: portrait, left: 824, top: 146 }])
  .png({ compressionLevel: 9, palette: true, quality: 90 })
  .toFile(path.join(pub, 'og-image.png'));

const svgIcon = await sharp(path.join(pub, 'favicon.svg'), { density: 600 }).resize(180, 180).png().toBuffer();
await sharp({ create: { width: 180, height: 180, channels: 4, background: '#10151C' } })
  .composite([{ input: svgIcon }])
  .png()
  .toFile(path.join(pub, 'apple-touch-icon.png'));
console.log('og-image.png + apple-touch-icon.png written');
