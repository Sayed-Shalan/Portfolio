import { useState } from 'react';
import { certificates, education } from '../data/content';
import { Icon } from './Icon';
import { Lightbox } from './Lightbox';
import { Picture } from './Picture';
import { SectionHeader } from './SectionHeader';

const groupLabel = { AI: 'AI engineering', Mobile: 'Mobile development', Leadership: 'Leadership & delivery' } as const;

const meta = (c: (typeof certificates)[number]) => [c.issuer, c.date].filter(Boolean).join(' · ');

const items = certificates.map((c) => ({ key: c.image, alt: `${c.title} certificate — ${meta(c)}`, caption: c.title }));

export function Certifications() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="section" id="certifications" aria-labelledby="certifications-title">
      <div className="container">
        <SectionHeader
          id="certifications-title"
          index="06"
          eyebrow="Certifications"
          title={
            <>
              Verified learning, <span className="muted">from Android foundations to AI agents.</span>
            </>
          }
          lead="Each card shows the certificate itself. Select one to view it full size; Anthropic certificates also link to their public verification page."
        />

        <ul className="cert-grid">
          {certificates.map((c, i) => (
            <li className="cert-card card" key={c.image} data-reveal style={{ '--d': `${(i % 3) * 60}ms` } as React.CSSProperties}>
              <button type="button" className="cert-thumb" onClick={() => setOpen(i)} aria-label={`View certificate: ${c.title}`}>
                <Picture id={c.image} alt="" sizes="(min-width: 1100px) 360px, (min-width: 700px) 45vw, 92vw" />
                <span className="cert-zoom" aria-hidden="true">
                  <Icon name="expand" size={16} />
                </span>
              </button>
              <div className="cert-info">
                <span className="cert-group">{groupLabel[c.group]}</span>
                <h3 className="cert-title">{c.title}</h3>
                <p className="cert-meta">{meta(c)}</p>
                {c.note && <p className="cert-note">{c.note}</p>}
                {c.verify && (
                  <a className="cert-verify" href={c.verify} target="_blank" rel="noopener noreferrer" aria-label={`Verify ${c.title} certificate (opens in a new tab)`}>
                    Verify credential <Icon name="arrow" size={14} />
                  </a>
                )}
              </div>
            </li>
          ))}
        </ul>

        <article className="card edu" data-reveal aria-labelledby="edu-title">
          <h3 id="edu-title" className="edu-heading">
            Education
          </h3>
          <ul className="edu-list">
            {education.map((e) => (
              <li key={e.title}>
                <p className="cert-title">{e.title}</p>
                <p className="cert-meta">
                  {e.place} · {e.period}
                </p>
                <p className="cert-note">{e.note}</p>
              </li>
            ))}
          </ul>
        </article>
      </div>

      {open !== null && <Lightbox title="Certificates" items={items} start={open} onClose={() => setOpen(null)} />}
    </section>
  );
}
