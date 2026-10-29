import { aiPillars } from '../data/content';
import { Icon } from './Icon';
import { SectionHeader } from './SectionHeader';

const flow = ['Spec & architecture', 'AI-assisted implementation', 'Human code review', 'CI quality gates', 'Store release'];

export function AiSection() {
  return (
    <section className="section ai" id="ai" aria-labelledby="ai-title">
      <div className="container">
        <SectionHeader
          id="ai-title"
          index="05"
          eyebrow="AI-powered engineering"
          title={
            <>
              AI speeds up the work. <span className="muted">Engineers still own it.</span>
            </>
          }
          lead="AI is part of how I engineer, not a slogan: it accelerates scaffolding, refactoring and review inside a loop where architecture decisions, code review and CI quality gates stay with engineers."
        />
        <div className="ai-grid">
          {aiPillars.map((p, i) => (
            <article className="card ai-card" key={p.title} data-reveal style={{ '--d': `${i * 70}ms` } as React.CSSProperties}>
              <span className="icon-badge">
                <Icon name="sparkle" size={20} />
              </span>
              <h3>{p.title}</h3>
              <p>{p.body}</p>
            </article>
          ))}
          <article className="card ai-flow" data-reveal aria-labelledby="ai-flow-title">
            <h3 id="ai-flow-title">Where AI sits in my delivery loop</h3>
            <ol>
              {flow.map((f, i) => (
                <li key={f} className={i === 1 ? 'is-ai' : undefined}>
                  <span className="ai-flow-step">{i + 1}</span>
                  {f}
                </li>
              ))}
            </ol>
            <p className="fine">Backed by four Anthropic certifications completed in 2026. See Certifications.</p>
          </article>
        </div>
      </div>
    </section>
  );
}
