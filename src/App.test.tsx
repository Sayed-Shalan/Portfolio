import { fireEvent, render, screen, within } from '@testing-library/react';
import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';
import App from './App';
import media from './data/media.json';
import collections from './data/collections.json';
import { caseStudies, certificates, galleryApps, nav, profile, screenshotsFor } from './data/content';

const BIO = 'Mobile Solutions Architect & Team Lead | Flutter, Android & iOS | AI-Powered Engineering';

describe('Portfolio', () => {
  it('renders the exact bio, the primary message and a single downloadable CV', () => {
    const { container } = render(<App />);
    expect(container.querySelector('.hero-bio')?.textContent).toBe(BIO);
    expect(screen.getByRole('heading', { level: 1 }).textContent).toBe(
      'I design and engineer secure, scalable, high-performance mobile solutions.',
    );
    const cvLinks = container.querySelectorAll('a[href^="/cv/"]');
    expect(cvLinks.length).toBeGreaterThan(0);
    cvLinks.forEach((a) => {
      expect(a).toHaveAttribute('href', '/cv/Sayed-CV.pdf');
      expect(a).toHaveAttribute('download', 'Sayed-CV.pdf');
    });
    expect(screen.getAllByRole('link', { name: 'Download CV' }).length).toBeGreaterThan(0);
  });

  it('has no statistics section or project-count labels', () => {
    const { container } = render(<App />);
    expect(container.querySelector('.stats, .stat')).toBeNull();
    const text = container.textContent ?? '';
    expect(text).not.toMatch(/\b\d+\+? (apps|projects|case studies)\b/i);
    expect(text).not.toMatch(/Show all \d+/);
  });

  it('shows the first six featured projects in the required order', () => {
    const { container } = render(<App />);
    const titles = [...container.querySelectorAll('.case-title')].map((h) => h.textContent);
    expect(titles.slice(0, 6)).toEqual(['Vidume', 'SoumTech', 'Tal3eeb', 'Rfah', 'Watheeq Capital', 'Sporting Qatar']);
  });

  it('offers call and WhatsApp actions with correct links', () => {
    render(<App />);
    for (const link of screen.getAllByRole('link', { name: 'Call Me' })) expect(link).toHaveAttribute('href', 'tel:+201120207774');
    for (const link of screen.getAllByRole('link', { name: /^WhatsApp/ })) expect(link).toHaveAttribute('href', 'https://wa.me/201120207774');
  });

  it('has a section for every navigation item', () => {
    const { container } = render(<App />);
    for (const item of nav) expect(container.querySelector(`#${item.id}`)).not.toBeNull();
  });

  it('opens and closes the mobile menu accessibly', () => {
    render(<App />);
    const toggle = screen.getByRole('button', { name: /open menu/i });
    expect(toggle).toHaveAttribute('aria-expanded', 'false');
    fireEvent.click(toggle);
    expect(toggle).toHaveAttribute('aria-expanded', 'true');
    const menu = screen.getByRole('navigation', { name: 'Mobile' });
    expect(within(menu).getAllByRole('link').length).toBeGreaterThanOrEqual(nav.length);
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(toggle).toHaveAttribute('aria-expanded', 'false');
  });

  it('expands the shipped-apps gallery and keeps every cover image', () => {
    const { container } = render(<App />);
    fireEvent.click(screen.getByRole('button', { name: /show more apps/i }));
    for (const app of galleryApps) expect(screen.getByRole('heading', { name: app.name })).toBeInTheDocument();
    expect(container.querySelectorAll('.gallery .app-cover img')).toHaveLength(galleryApps.length);
  });

  it('browses every screenshot of a project in the gallery, with keyboard support', () => {
    render(<App />);
    fireEvent.click(screen.getAllByRole('button', { name: /view all \d+ screenshots/i })[0]);
    const dialog = screen.getByRole('dialog', { name: 'Vidume screenshots' });
    const total = collections.vidume.length;
    expect(within(dialog).getAllByRole('button', { name: /show image/i })).toHaveLength(total);
    const start = caseStudies[0].shots[0].n;
    expect(within(dialog).getByText(`${start} / ${total}`, { exact: false })).toBeInTheDocument();
    fireEvent.keyDown(document, { key: 'ArrowRight' });
    expect(within(dialog).getByText(`${start + 1} / ${total}`, { exact: false })).toBeInTheDocument();
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(screen.queryByRole('dialog')).toBeNull();
  });

  it('previews certificates in the lightbox', () => {
    render(<App />);
    fireEvent.click(screen.getByRole('button', { name: `View certificate: ${certificates[0].title}` }));
    const dialog = screen.getByRole('dialog', { name: 'Certificates' });
    expect(within(dialog).getByRole('img', { name: new RegExp(certificates[0].title) })).toBeInTheDocument();
    fireEvent.click(within(dialog).getByRole('button', { name: 'Close gallery' }));
    expect(screen.queryByRole('dialog')).toBeNull();
  });

  it('every image has alt text or is explicitly decorative', () => {
    const { container } = render(<App />);
    fireEvent.click(screen.getByRole('button', { name: /show more apps/i }));
    container.querySelectorAll('img').forEach((img) => {
      const alt = img.getAttribute('alt');
      expect(alt).not.toBeNull();
      // Decorative (alt="") only inside a button that carries its own label.
      if (alt === '') expect(img.closest('button')?.getAttribute('aria-label')).toBeTruthy();
      else expect(alt!.length).toBeGreaterThan(3);
    });
  });
});

describe('Content integrity', () => {
  const m = media as Record<string, { sources: { src: string }[] }>;

  it('every screenshot, certificate and portrait exists in the manifest and on disk', () => {
    const keys = [
      ...caseStudies.flatMap((c) => screenshotsFor(c.slug, c.name).map((s) => s.key)),
      ...galleryApps.flatMap((a) => screenshotsFor(a.slug, a.name).map((s) => s.key)),
      ...certificates.map((c) => c.image),
      'portrait',
    ];
    for (const k of keys) {
      expect(m[k], k).toBeDefined();
      for (const s of m[k].sources) expect(existsSync(resolve('public' + s.src)), s.src).toBe(true);
    }
  });

  it('every project collection matches the number of source screenshots', () => {
    const groups: Record<string, string[]> = {
      vidume: ['Vidume'], soumtech: ['Soumtech'], tal3eeb: ['Tal3eeb/Mobile', 'Tal3eeb/Web'], rafah: ['Rafah/client', 'Rafah/counselor'],
      watheeq: ['Watheeq'], 'sporting-qatar': ['Sporting-Qatar'],
    };
    for (const [slug, dirs] of Object.entries(groups)) {
      const count = dirs.flatMap((d) => readdirSync(resolve('..', 'portfolio-projects', d)).filter((f) => /\.(png|jpe?g)$/i.test(f))).length;
      expect(collections[slug as keyof typeof collections], slug).toHaveLength(count);
    }
  });

  it('card screenshots stay attached to their own project', () => {
    for (const c of caseStudies) {
      for (const s of c.shots) expect(s.alt.startsWith(c.name === 'Watheeq Capital' ? 'Watheeq' : c.name), `${c.slug} #${s.n}`).toBe(true);
      for (const item of collections[c.slug]) expect(item.key.startsWith(`${c.slug}-`)).toBe(true);
    }
  });

  it('only the Team Lead CV is published, under a neutral name', () => {
    expect(readdirSync(resolve('public/cv'))).toEqual(['Sayed-CV.pdf']);
    expect(profile.cv.href).toBe('/cv/Sayed-CV.pdf');
  });

  it('store links are https and point at official stores or the product site', () => {
    const allowed = /^https:\/\/(play\.google\.com|apps\.apple\.com|tal3eeb\.com)\//;
    for (const s of [...caseStudies, ...galleryApps].map((x) => x.store)) {
      for (const url of Object.values(s)) expect(url).toMatch(allowed);
    }
  });

  it('does not publish the street address', () => {
    const src = readFileSync(resolve('src/data/content.ts'), 'utf8') + readFileSync(resolve('index.html'), 'utf8');
    expect(src).not.toMatch(/Maadi/i);
  });
});
