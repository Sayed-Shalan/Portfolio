import { experience } from '../data/content';
import { SectionHeader } from './SectionHeader';

export function Experience() {
  return (
    <section className="section" id="experience" aria-labelledby="experience-title">
      <div className="container">
        <SectionHeader
          id="experience-title"
          index="04"
          eyebrow="Experience"
          title={
            <>
              From native Android <span className="muted">to mobile architecture.</span>
            </>
          }
        />
        <ol className="timeline">
          {experience.map((job) => (
            <li className="timeline-item" key={job.company + job.period} data-reveal>
              <div className="timeline-when">
                <span className="timeline-period">{job.period}</span>
              </div>
              <div className="timeline-dot" aria-hidden="true" />
              <div className="timeline-body card">
                <h3>
                  {job.title} <span className="timeline-at">· {job.company}</span>
                </h3>
                <ul>
                  {job.points.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
        <p className="fine timeline-note" data-reveal>
          Also shipped: Hitchhiker, ReTag, Hitclinic, Foodyz, Wimo Ship and Swever.
        </p>
      </div>
    </section>
  );
}
