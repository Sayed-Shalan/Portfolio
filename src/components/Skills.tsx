import { skillGroups } from '../data/content';
import { SectionHeader } from './SectionHeader';

export function Skills() {
  return (
    <section className="section" id="skills" aria-labelledby="skills-title">
      <div className="container">
        <SectionHeader
          id="skills-title"
          index="03"
          eyebrow="Capabilities"
          title={
            <>
              A full mobile toolkit, <span className="muted">grouped by discipline.</span>
            </>
          }
        />
        <div className="skills-grid">
          {skillGroups.map((g, i) => (
            <article className="card skill-card" key={g.title} data-reveal style={{ '--d': `${(i % 4) * 50}ms` } as React.CSSProperties}>
              <h3>
                <span className="skill-index">{String(i + 1).padStart(2, '0')}</span>
                {g.title}
              </h3>
              <ul className="tag-list">
                {g.items.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
