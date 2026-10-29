import { profile } from '../data/content';
import { Icon } from './Icon';

export function Contact() {
  return (
    <section className="section contact" id="contact" aria-labelledby="contact-title">
      <div className="container">
        <div className="contact-card card" data-reveal>
          <div className="contact-glow" aria-hidden="true" />
          <p className="eyebrow">
            <span className="eyebrow-index">07</span>Contact
          </p>
          <h2 id="contact-title" className="contact-title">
            Building something that has to <em>perform?</em>
          </h2>
          <p className="contact-lead">
            I'm open to Mobile Solutions Architect, Senior Flutter Engineer and Senior Android Engineer roles. Call, message me on
            WhatsApp, or email — whichever suits you.
          </p>
          <div className="contact-actions">
            <a className="btn btn-primary btn-lg" href={`mailto:${profile.email}`}>
              <Icon name="mail" size={20} />
              Email me
            </a>
            <a className="btn btn-ghost btn-lg" href={profile.phone.tel}>
              <Icon name="phone" size={20} />
              Call Me
            </a>
            <a className="btn btn-ghost btn-lg" href={profile.phone.whatsapp} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp (opens in a new tab)">
              <Icon name="whatsapp" size={20} />
              WhatsApp
            </a>
          </div>
          <dl className="contact-details">
            <div>
              <dt>Email</dt>
              <dd>{profile.email}</dd>
            </div>
            <div>
              <dt>Phone &amp; WhatsApp</dt>
              <dd>{profile.phone.display}</dd>
            </div>
          </dl>
          <ul className="contact-links">
            <li>
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
                <Icon name="linkedin" size={20} />
                <span>LinkedIn</span>
                <Icon name="arrow" size={16} className="contact-arrow" />
              </a>
            </li>
            <li>
              <a href={profile.github} target="_blank" rel="noopener noreferrer">
                <Icon name="github" size={20} />
                <span>GitHub</span>
                <Icon name="arrow" size={16} className="contact-arrow" />
              </a>
            </li>
            <li>
              <a href={profile.cv.href} download={profile.cv.filename}>
                <Icon name="download" size={20} />
                <span>Download CV</span>
                <Icon name="arrow" size={16} className="contact-arrow" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
