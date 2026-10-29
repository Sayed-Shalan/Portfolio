import { Fragment } from 'react';
import media from '../data/media.json';
import { profile } from '../data/content';
import { HeroBackdrop, HeroOrbit } from './HeroArt';
import { Icon } from './Icon';

// Must match PORTRAIT_SIZES in scripts/prepare-assets.mjs (used by the HTML preload).
const PORTRAIT_SIZES = '(min-width: 960px) 300px, 220px';
const portrait = media.portrait.sources;

export function Hero() {
  return (
    <section id="top" className="hero" aria-labelledby="hero-title">
      <div className="hero-glow" aria-hidden="true" />
      <HeroBackdrop />
      <div className="container hero-grid">
        <div className="hero-copy">
          <p className="hero-kicker">
            <span className="pulse" aria-hidden="true" />
            <span className="hero-bio">
              {profile.bio.split(' | ').map((part, i) => (
                <Fragment key={part}>
                  {i > 0 && ' '}
                  <span className="hero-bio-part">{i > 0 ? `| ${part}` : part}</span>
                </Fragment>
              ))}
            </span>
          </p>
          <h1 id="hero-title" className="hero-title">
            I design and engineer <em>secure, scalable, high-performance</em> mobile solutions.
          </h1>
          <p className="hero-lead">
            Mobile Solutions Architect working across Flutter and native Android, shipping to Android and iOS for fintech,
            govtech, healthtech and e-commerce. I own the architecture, security model, performance and release pipeline, and I
            use AI-assisted workflows to move faster without lowering the bar.
          </p>
          <div className="hero-ctas">
            <a className="btn btn-primary" href={profile.cv.href} download={profile.cv.filename}>
              <Icon name="download" size={18} />
              Download CV
            </a>
            <a className="btn btn-ghost" href="#work">
              View selected work
              <Icon name="arrow" size={18} />
            </a>
          </div>
          <ul className="hero-links" aria-label="Contact and profiles">
            <li>
              <a href={profile.phone.tel}>
                <Icon name="phone" size={18} /> Call Me
              </a>
            </li>
            <li>
              <a href={profile.phone.whatsapp} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp (opens in a new tab)">
                <Icon name="whatsapp" size={18} /> WhatsApp
              </a>
            </li>
            <li>
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
                <Icon name="linkedin" size={18} /> LinkedIn
              </a>
            </li>
            <li>
              <a href={profile.github} target="_blank" rel="noopener noreferrer">
                <Icon name="github" size={18} /> GitHub
              </a>
            </li>
            <li>
              <a href={`mailto:${profile.email}`}>
                <Icon name="mail" size={18} /> Email
              </a>
            </li>
          </ul>
        </div>

        <figure className="hero-visual">
          <HeroOrbit />
          <div className="portrait-ring">
            <img
              className="portrait-img"
              src={portrait[portrait.length - 1].src}
              srcSet={portrait.map((s) => `${s.src} ${s.w}w`).join(', ')}
              sizes={PORTRAIT_SIZES}
              width={560}
              height={560}
              alt="Portrait of Sayed Shalan"
              fetchPriority="high"
              decoding="async"
            />
          </div>
          <figcaption className="portrait-tag">
            <span className="portrait-tag-label">Currently at Beetleware</span>
            <span className="portrait-tag-meta">
              <Icon name="pin" size={14} /> {profile.location}
            </span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
