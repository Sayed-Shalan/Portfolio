import { principles } from '../data/content';
import { Icon, type IconName } from './Icon';
import { SectionHeader } from './SectionHeader';

const principleIcons: IconName[] = ['layers', 'shield', 'gauge', 'globe', 'check', 'rocket'];
const domains = ['Fintech', 'GovTech', 'HealthTech', 'E-commerce', 'Logistics', 'EdTech', 'PropTech', 'Workforce'];

export function Profile() {
  return (
    <section className="section" aria-labelledby="profile-title" id="profile">
      <div className="container">
        <SectionHeader
          id="profile-title"
          index="01"
          eyebrow="Engineering profile"
          title={
            <>
              Architect by discipline. <span className="muted">Engineer by habit.</span>
            </>
          }
        />
        <div className="bento">
          <article className="card bento-intro" data-reveal>
            <p className="bento-intro-text">
              I design mobile solutions end to end: the architecture and module boundaries, the security model, the performance
              budget and the release pipeline. I started in 2016 with native Android in Java and Kotlin, moved into Flutter, and
              today ship Flutter and Android apps to both stores at Beetleware, where I own mobile architecture and code quality
              and lead the mobile team.
            </p>
            <p className="bento-intro-text">
              I stay hands-on in the code — designing modules, wiring native integrations through platform channels and Pigeon,
              profiling and tuning performance. Having worked on PHP/Laravel backends and DevOps pipelines too, I treat delivery as
              one system: the API contract, the app, the CI pipeline and the store release.
            </p>
          </article>

          {principles.map((p, i) => (
            <article className="card principle" key={p.title} data-reveal style={{ '--d': `${i * 60}ms` } as React.CSSProperties}>
              <span className="icon-badge">
                <Icon name={principleIcons[i]} size={22} />
              </span>
              <h3>{p.title}</h3>
              <p>{p.body}</p>
            </article>
          ))}

          <article className="card bento-domains" data-reveal>
            <h3>Domains shipped to production</h3>
            <ul className="tag-list">
              {domains.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul>
            <p className="fine">Apps for clients in Saudi Arabia, Qatar, the UAE, Oman and the US.</p>
          </article>
        </div>
      </div>
    </section>
  );
}
