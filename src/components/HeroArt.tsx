// Hand-built SVG cover art for the hero: device silhouettes, an architecture
// graph and data flowing between layers. Decorative only (aria-hidden); all
// motion is CSS so prefers-reduced-motion can switch it off.

/** Full-bleed backdrop: long data-flow curves across the hero. */
export function HeroBackdrop() {
  const flows = [
    'M-60 760 C 260 700 480 820 780 620 S 1220 330 1520 380',
    'M-60 540 C 220 520 420 600 700 470 S 1120 180 1520 220',
    'M200 980 C 420 820 640 860 900 700 S 1260 560 1520 600',
  ];
  return (
    <svg className="hero-backdrop" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="hb-fade" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#8fa3bd" stopOpacity="0" />
          <stop offset="0.45" stopColor="#8fa3bd" stopOpacity="0.16" />
          <stop offset="1" stopColor="#8fa3bd" stopOpacity="0.05" />
        </linearGradient>
      </defs>
      {flows.map((d, i) => (
        <g key={d}>
          <path d={d} className="hb-line" stroke="url(#hb-fade)" />
          <path d={d} className="hb-pulse" style={{ animationDelay: `${i * -2.6}s` }} />
        </g>
      ))}
    </svg>
  );
}

function Phone({ x, y, w, h, rotate, lit = false, className = '' }: { x: number; y: number; w: number; h: number; rotate: number; lit?: boolean; className?: string }) {
  const pad = w * 0.09;
  const inner = w - pad * 2;
  return (
    // Float animation (CSS transform) sits on the outer group so it can't clobber the SVG rotation.
    <g className={`ho-phone ${className}`}>
      <g transform={`rotate(${rotate} ${x + w / 2} ${y + h / 2})`}>
      <rect x={x} y={y} width={w} height={h} rx={w * 0.2} className="ho-phone-body" />
      <rect x={x + w * 0.36} y={y + pad * 0.9} width={w * 0.28} height={pad * 0.55} rx={pad * 0.3} className="ho-phone-notch" />
      <rect x={x + pad} y={y + pad * 2.4} width={inner * 0.55} height={pad * 0.7} rx={pad * 0.35} className="ho-ui-strong" />
      <rect x={x + pad} y={y + pad * 3.8} width={inner} height={h * 0.2} rx={pad * 0.8} className={lit ? 'ho-ui-lit' : 'ho-ui'} />
      <rect x={x + pad} y={y + pad * 4.6 + h * 0.2} width={inner * 0.47} height={h * 0.16} rx={pad * 0.7} className="ho-ui" />
      <rect x={x + pad + inner * 0.53} y={y + pad * 4.6 + h * 0.2} width={inner * 0.47} height={h * 0.16} rx={pad * 0.7} className="ho-ui" />
      <rect x={x + pad} y={y + h * 0.66} width={inner * 0.8} height={pad * 0.55} rx={pad * 0.3} className="ho-ui-strong" />
      <rect x={x + pad} y={y + h * 0.66 + pad * 1.2} width={inner * 0.6} height={pad * 0.55} rx={pad * 0.3} className="ho-ui" />
      <rect x={x + w * 0.3} y={y + h - pad * 1.4} width={w * 0.4} height={pad * 0.35} rx={pad * 0.2} className="ho-ui-strong" />
      </g>
    </g>
  );
}

/** Composition that frames the circular portrait: orbits, devices and an architecture graph. */
export function HeroOrbit() {
  // Architecture nodes sit on the middle orbit (r = 228 around 300,300).
  const node = (deg: number) => {
    const r = (deg * Math.PI) / 180;
    return [300 + 228 * Math.cos(r), 300 + 228 * Math.sin(r)] as const;
  };
  const nodes = [-62, -8, 38, 128, 196, 238].map(node);
  const links = [
    `M${nodes[0][0]} ${nodes[0][1]} Q 420 150 ${nodes[1][0]} ${nodes[1][1]}`,
    `M${nodes[1][0]} ${nodes[1][1]} Q 560 380 ${nodes[2][0]} ${nodes[2][1]}`,
    `M${nodes[3][0]} ${nodes[3][1]} Q 150 520 ${nodes[4][0]} ${nodes[4][1]}`,
    `M${nodes[4][0]} ${nodes[4][1]} Q 40 220 ${nodes[5][0]} ${nodes[5][1]}`,
    `M${nodes[5][0]} ${nodes[5][1]} Q 240 20 ${nodes[0][0]} ${nodes[0][1]}`,
  ];

  return (
    <svg className="hero-orbit" viewBox="0 0 600 600" aria-hidden="true" focusable="false">
      <defs>
        <radialGradient id="ho-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0.45" stopColor="#b9f36b" stopOpacity="0.16" />
          <stop offset="1" stopColor="#b9f36b" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="ho-body" x1="0" x2="0.4" y1="0" y2="1">
          <stop offset="0" stopColor="#243041" />
          <stop offset="1" stopColor="#111821" />
        </linearGradient>
        <linearGradient id="ho-arc" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#b9f36b" stopOpacity="0.9" />
          <stop offset="1" stopColor="#b9f36b" stopOpacity="0" />
        </linearGradient>
      </defs>

      <circle cx="300" cy="300" r="250" fill="url(#ho-glow)" className="ho-breathe" />
      <circle cx="300" cy="300" r="290" className="ho-ring is-faint" />
      <circle cx="300" cy="300" r="228" className="ho-ring" />
      <g className="ho-spin">
        <circle cx="300" cy="300" r="190" className="ho-ring is-dotted" />
        <circle cx="300" cy="300" r="190" className="ho-arc" stroke="url(#ho-arc)" />
      </g>

      <Phone x={18} y={150} w={112} h={226} rotate={-14} className="is-left" />
      <Phone x={468} y={262} w={104} h={210} rotate={11} lit className="is-right" />

      {links.map((d, i) => (
        <g key={d}>
          <path d={d} className="ho-link" />
          <path d={d} className="ho-flow" style={{ animationDelay: `${i * -1.3}s` }} />
        </g>
      ))}
      {nodes.map(([x, y], i) => (
        <rect key={i} x={x - 7} y={y - 7} width="14" height="14" rx="4" className={`ho-node${i === 1 || i === 4 ? ' is-lit' : ''}`} />
      ))}
    </svg>
  );
}
