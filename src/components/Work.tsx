import { useId, useState } from 'react';
import { caseStudies, galleryApps, screenshotsFor, shotKey, type CaseStudy, type Store } from '../data/content';
import { Icon } from './Icon';
import { Lightbox, type LightboxItem } from './Lightbox';
import { Picture } from './Picture';
import { SectionHeader } from './SectionHeader';

const INITIAL_GALLERY = 8;
const CARD_SHOTS = 3;

type Viewer = { title: string; items: LightboxItem[]; start: number };
type OpenViewer = (viewer: Viewer) => void;

function StoreLinks({ store, name, compact = false }: { store: Store; name: string; compact?: boolean }) {
  const links = [
    store.play && { href: store.play, icon: 'play' as const, label: 'Google Play' },
    store.appStore && { href: store.appStore, icon: 'apple' as const, label: 'App Store' },
    store.web && { href: store.web, icon: 'globe' as const, label: 'Website' },
  ].filter(Boolean) as { href: string; icon: 'play' | 'apple' | 'globe'; label: string }[];

  return (
    <ul className={`store-links${compact ? ' is-compact' : ''}`}>
      {links.map((l) => (
        <li key={l.label}>
          <a href={l.href} target="_blank" rel="noopener noreferrer" aria-label={`${name} on ${l.label} (opens in a new tab)`}>
            <Icon name={l.icon} size={compact ? 16 : 17} />
            {!compact && <span>{l.label}</span>}
          </a>
        </li>
      ))}
    </ul>
  );
}

function CaseStudyCard({ study, index, onView }: { study: CaseStudy; index: number; onView: OpenViewer }) {
  const titleId = `case-${study.slug}`;
  const all = screenshotsFor(study.slug, study.name, [...study.shots, ...(study.extra ? [study.extra] : [])]);
  const open = (n: number) => onView({ title: study.name, items: all, start: n - 1 });

  return (
    <article className={`case card${index % 2 ? ' is-flipped' : ''}`} aria-labelledby={titleId} data-reveal>
      <div className="case-body">
        <div className="case-meta">
          <span className="case-index">{String(index + 1).padStart(2, '0')}</span>
          <span className="case-domain">{study.domain}</span>
          {study.highlight && <span className="case-highlight">{study.highlight}</span>}
        </div>
        <h3 id={titleId} className="case-title">
          {study.name}
        </h3>
        <p className="case-summary">{study.summary}</p>

        <dl className="case-facts">
          <div>
            <dt>Role</dt>
            <dd>{study.role}</dd>
          </div>
          <div>
            <dt>Platforms</dt>
            <dd>{study.platforms}</dd>
          </div>
        </dl>

        <div className="case-challenge">
          <h4>The engineering problem</h4>
          <p>{study.challenge}</p>
        </div>

        <div className="case-contrib">
          <h4>{study.listTitle ?? 'What I delivered'}</h4>
          <ul className="check-list">
            {study.contributions.map((c) => (
              <li key={c}>
                <Icon name="check" size={16} />
                <span>{c}</span>
              </li>
            ))}
          </ul>
        </div>

        <ul className="stack-list" aria-label="Technologies">
          {study.stack.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>

        <StoreLinks store={study.store} name={study.name} />
      </div>

      <div className="case-media">
        <ul className="shots" aria-label={`${study.name} screenshots`}>
          {study.shots.slice(0, CARD_SHOTS).map((s) => (
            <li className="shot" key={s.n}>
              <button type="button" className="shot-btn" onClick={() => open(s.n)} aria-label={`Enlarge: ${s.alt}`}>
                <Picture id={shotKey(study.slug, s.n)} alt={s.alt} sizes="(min-width: 1200px) 180px, (min-width: 960px) 15vw, (min-width: 600px) 28vw, 30vw" />
              </button>
            </li>
          ))}
        </ul>
        {study.extra && (
          <figure className="case-extra">
            <button type="button" className="shot-btn" onClick={() => open(study.extra!.n)} aria-label={`Enlarge: ${study.extra.alt}`}>
              <Picture id={shotKey(study.slug, study.extra.n)} alt={study.extra.alt} sizes="(min-width: 960px) 560px, 92vw" />
            </button>
            <figcaption>{study.extra.caption}</figcaption>
          </figure>
        )}
        <button type="button" className="btn btn-ghost btn-sm view-all" onClick={() => open(study.shots[0].n)}>
          <Icon name="images" size={17} />
          View all {all.length} screenshots
        </button>
      </div>
    </article>
  );
}

export function Work() {
  const [expanded, setExpanded] = useState(false);
  const [viewer, setViewer] = useState<Viewer | null>(null);
  const galleryId = useId();
  const visible = expanded ? galleryApps : galleryApps.slice(0, INITIAL_GALLERY);

  return (
    <section className="section" id="work" aria-labelledby="work-title">
      <div className="container">
        <SectionHeader
          id="work-title"
          index="02"
          eyebrow="Selected work"
          title={
            <>
              Products in the hands of real users. <span className="muted">Engineered to last.</span>
            </>
          }
          lead="Case studies from recruitment, regulated finance, auctions, telehealth, AR gaming and sport — each one an architecture, security and performance problem before it was a UI. Every screenshot is from the shipped app."
        />

        <div className="cases">
          {caseStudies.map((s, i) => (
            <CaseStudyCard key={s.slug} study={s} index={i} onView={setViewer} />
          ))}
        </div>

        <div className="gallery-head" data-reveal>
          <h3 className="gallery-title">More shipped apps</h3>
          <p className="gallery-sub">Across EdTech, logistics, workforce, marketplaces and more. Select any app to browse its screenshots.</p>
        </div>

        <ul className="gallery" id={galleryId}>
          {visible.map((app, i) => {
            const items = screenshotsFor(app.slug, app.name);
            return (
              <li className={`app-card${i >= INITIAL_GALLERY ? ' is-new' : ''}`} key={app.slug}>
                <button
                  type="button"
                  className="app-cover"
                  onClick={() => setViewer({ title: app.name, items, start: app.cover - 1 })}
                  aria-label={`View all ${items.length} ${app.name} screenshots`}
                >
                  <Picture id={shotKey(app.slug, app.cover)} alt={`${app.name} app screenshot`} sizes="(min-width: 1200px) 260px, (min-width: 768px) 30vw, 46vw" />
                  <span className="app-cover-hint" aria-hidden="true">
                    <Icon name="images" size={15} /> {items.length}
                  </span>
                </button>
                <div className="app-info">
                  <span className="app-domain">{app.domain}</span>
                  <h4>{app.name}</h4>
                  <p>{app.blurb}</p>
                  <StoreLinks store={app.store} name={app.name} compact />
                </div>
              </li>
            );
          })}
        </ul>
        {galleryApps.length > INITIAL_GALLERY && (
          <div className="gallery-more">
            <button type="button" className="btn btn-ghost" aria-expanded={expanded} aria-controls={galleryId} onClick={() => setExpanded((e) => !e)}>
              {expanded ? 'Show fewer apps' : 'Show more apps'}
            </button>
          </div>
        )}
      </div>

      {viewer && <Lightbox title={`${viewer.title} screenshots`} items={viewer.items} start={viewer.start} onClose={() => setViewer(null)} />}
    </section>
  );
}
