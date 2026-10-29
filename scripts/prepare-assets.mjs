// Asset pipeline: copies an explicit allow-list of public screenshots and
// certificates from the private workspace into public/media as optimized WebP,
// and writes manifests so every <img> can reserve its layout box.
// Nothing outside this allow-list is ever copied into the website.
//
// File names carry a content hash, so a deploy can never pair a cached page
// with a changed or deleted image; /media is served as immutable.
import sharp from 'sharp';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { mkdir, mkdtemp, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(fileURLToPath(import.meta.url));
const site = path.resolve(root, '..');
const workspace = path.resolve(site, '..');
const projectsDir = path.join(workspace, 'portfolio-projects');
const certsDir = path.join(workspace, 'certificates');
const out = path.join(site, 'public', 'media');

// Project slug -> screenshot folders (relative to portfolio-projects).
// Every image in each folder is published, in numeric order.
const projects = {
  vidume: [{ dir: 'Vidume' }],
  soumtech: [{ dir: 'Soumtech' }],
  tal3eeb: [{ dir: 'Tal3eeb/Mobile' }, { dir: 'Tal3eeb/Web', label: 'Product website' }],
  rafah: [{ dir: 'Rafah/client', label: 'Client app' }, { dir: 'Rafah/counselor', label: 'Counselor app' }],
  watheeq: [{ dir: 'Watheeq' }],
  'sporting-qatar': [{ dir: 'Sporting-Qatar' }],
  '01gov': [{ dir: '01Gov' }],
  mihwar: [{ dir: 'Mihwar' }],
  'crew-sync': [{ dir: 'Crew_sync' }],
  'dcs-richmond': [{ dir: 'DCS-Richmond' }],
  kidsware: [{ dir: 'Kidsware' }],
  khairumma: [{ dir: 'Khairumma' }],
  'moshaf-khairumma': [{ dir: 'Moshaf-Khairumma' }],
  'shipper-driver': [{ dir: 'Shipper/Client' }],
  'shipper-operation': [{ dir: 'Shipper/Operation' }],
  'zahi-customer': [{ dir: 'Zahy/client' }],
  'zahi-laundry': [{ dir: 'Zahy/laundry' }],
  plans: [{ dir: 'Plans' }],
  sba: [{ dir: 'SBA' }],
  tutorium: [{ dir: 'Tutorium' }],
  'meet-eat': [{ dir: 'Meat_and_Eat' }],
  'my-contento': [{ dir: 'My-Contento' }],
  wepunch: [{ dir: 'We-Punch' }],
  'property-filter': [{ dir: 'Property-Filter' }],
  agzakhanh: [{ dir: 'Agzakhanh' }],
};

// Certificate key -> source file in certificates/ (all reviewed as public-appropriate).
const certificates = {
  'cert-claude-code': 'certificate-y5apqn7joicc-1775070408.pdf',
  'cert-anthropic-api': 'certificate-g69yjr4cpqcu-1775069576.pdf',
  'cert-mcp': 'certificate-wcihgc57ko4m-1775069949.pdf',
  'cert-agent-skills': 'certificate-nk7gostk63p5-1775035570.pdf',
  'cert-mal': 'Scanned Document 2.pdf',
  'cert-holol': 'Scanned Document.pdf',
  'cert-oman': 'Scanned Document 3.pdf',
  'cert-pmp': '1786117726446.jpeg',
  'cert-leadership': 'Al-Sayed Samy Shalaan.pdf',
};

// Must match the `sizes` on the hero portrait <img> (src/components/Hero.tsx).
const PORTRAIT_SIZES = '(min-width: 960px) 300px, 220px';

const IMAGE = /\.(png|jpe?g|webp)$/i;
const byNumber = (a, b) => a.localeCompare(b, 'en', { numeric: true });

const manifest = {};
const collections = {};

async function emit(input, key, widths, quality = 74) {
  const buf = typeof input === 'string' ? await readFile(input) : input;
  const meta = await sharp(buf).rotate().metadata();
  const [w0, h0] = meta.orientation >= 5 ? [meta.height, meta.width] : [meta.width, meta.height];
  const hash = createHash('sha256').update(buf).update(JSON.stringify({ widths, quality })).digest('hex').slice(0, 8);
  const entry = { ratio: Number((h0 / w0).toFixed(4)), sources: [] };
  for (const target of widths) {
    const w = Math.min(target, w0);
    if (entry.sources.some((s) => s.w === w)) continue;
    const name = `${key}-${w}.${hash}.webp`;
    await sharp(buf).rotate().resize({ width: w }).webp({ quality, effort: 6 }).toFile(path.join(out, name));
    entry.sources.push({ src: `/media/${name}`, w });
  }
  manifest[key] = entry;
  return { w: w0, h: h0 };
}

await rm(out, { recursive: true, force: true });
await mkdir(out, { recursive: true });

for (const [slug, groups] of Object.entries(projects)) {
  collections[slug] = [];
  for (const group of groups) {
    const files = (await readdir(path.join(projectsDir, group.dir))).filter((f) => IMAGE.test(f)).sort(byNumber);
    for (const file of files) {
      const key = `${slug}-${collections[slug].length + 1}`;
      const meta = await sharp(path.join(projectsDir, group.dir, file)).metadata();
      const landscape = meta.width > meta.height;
      await emit(path.join(projectsDir, group.dir, file), key, landscape ? [480, 960, 1600] : [240, 480, 800], landscape ? 72 : 74);
      collections[slug].push(group.label ? { key, group: group.label } : { key });
    }
  }
}

// PDFs are rasterised with macOS Quick Look, then go through the same pipeline.
const tmp = await mkdtemp(path.join(os.tmpdir(), 'certs-'));
for (const [key, file] of Object.entries(certificates)) {
  let source = path.join(certsDir, file);
  if (file.endsWith('.pdf')) {
    execFileSync('qlmanage', ['-t', '-s', '1800', '-o', tmp, source], { stdio: 'ignore' });
    source = path.join(tmp, `${file}.png`);
  }
  await emit(source, key, [480, 960, 1600], 80);
}
await rm(tmp, { recursive: true, force: true });

// Portrait: square head-and-shoulders crop for the circular frame.
const avatar = await sharp(path.join(workspace, 'Sayed Shalan Avatar.jpeg'))
  .extract({ left: 230, top: 88, width: 224, height: 224 })
  .resize(560, 560, { kernel: 'lanczos3' })
  .sharpen({ sigma: 0.6 })
  .png()
  .toBuffer();
await emit(avatar, 'portrait', [320, 560], 82);

// Keep the HTML preload pointed at the current hashed portrait.
const indexHtml = path.join(site, 'index.html');
const html = await readFile(indexHtml, 'utf8');
const p = manifest.portrait.sources;
const preload = `<link rel="preload" as="image" href="${p.at(-1).src}" imagesrcset="${p.map((s) => `${s.src} ${s.w}w`).join(', ')}" imagesizes="${PORTRAIT_SIZES}" type="image/webp" fetchpriority="high" />`;
await writeFile(indexHtml, html.replace(/<link rel="preload" as="image"[^>]*\/>/, preload));

await writeFile(path.join(site, 'src', 'data', 'media.json'), JSON.stringify(manifest, null, 2) + '\n');
await writeFile(path.join(site, 'src', 'data', 'collections.json'), JSON.stringify(collections, null, 2) + '\n');
console.log(`Wrote ${Object.keys(manifest).length} media entries across ${Object.keys(collections).length} projects`);
