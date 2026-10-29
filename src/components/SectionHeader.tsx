import type { ReactNode } from 'react';

export function SectionHeader({ index, eyebrow, title, lead, id }: { index: string; eyebrow: string; title: ReactNode; lead?: ReactNode; id: string }) {
  return (
    <header className="section-header" data-reveal>
      <p className="eyebrow">
        <span className="eyebrow-index">{index}</span>
        {eyebrow}
      </p>
      <h2 id={id} className="section-title">
        {title}
      </h2>
      {lead && <p className="section-lead">{lead}</p>}
    </header>
  );
}
