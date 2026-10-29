import { useCallback, useEffect, useRef, useState } from 'react';
import { nav, profile } from '../data/content';
import { useActiveSection } from '../hooks/useReveal';
import { Icon } from './Icon';

const ids = nav.map((n) => n.id);

export function Nav() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useActiveSection(ids, useCallback((id: string) => setActive(id), []));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const close = useCallback((restoreFocus = true) => {
    setOpen(false);
    if (restoreFocus) toggleRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!open) return;
    document.body.classList.add('menu-open');
    panelRef.current?.querySelector<HTMLElement>('a')?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key !== 'Tab' || !panelRef.current) return;
      // Keep focus inside the menu (toggle button + panel links) while it is open.
      const focusables = [toggleRef.current!, ...panelRef.current.querySelectorAll<HTMLElement>('a')];
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    const mq = window.matchMedia('(min-width: 960px)');
    const onMq = () => mq.matches && close(false);
    document.addEventListener('keydown', onKey);
    mq.addEventListener('change', onMq);
    return () => {
      document.body.classList.remove('menu-open');
      document.removeEventListener('keydown', onKey);
      mq.removeEventListener('change', onMq);
    };
  }, [open, close]);

  return (
    <header className={`site-header${scrolled ? ' is-scrolled' : ''}${open ? ' is-open' : ''}`}>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <div className="nav-bar container">
        <a className="brand" href="#top" aria-label="Sayed Shalan — back to top">
          <span className="brand-mark" aria-hidden="true">
            S
          </span>
          <span className="brand-name">
            Sayed Shalan<span className="brand-dot">.</span>
          </span>
        </a>

        <nav className="nav-desktop" aria-label="Primary">
          <ul>
            {nav.map((item) => (
              <li key={item.id}>
                <a href={`#${item.id}`} aria-current={active === item.id ? 'location' : undefined}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="nav-actions">
          <a className="btn btn-primary btn-sm nav-cv" href={profile.cv.href} download={profile.cv.filename} aria-label="Download CV">
            <Icon name="download" size={16} />
            <span>CV</span>
          </a>
          <button
            ref={toggleRef}
            type="button"
            className="nav-toggle"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((o) => !o)}
          >
            <Icon name={open ? 'close' : 'menu'} size={22} />
          </button>
        </div>
      </div>

      <div id="mobile-menu" ref={panelRef} className="nav-mobile" hidden={!open}>
        <nav aria-label="Mobile">
          <ul>
            {nav.map((item, i) => (
              <li key={item.id} style={{ '--i': i } as React.CSSProperties}>
                <a href={`#${item.id}`} onClick={() => close(false)} aria-current={active === item.id ? 'location' : undefined}>
                  <span className="nav-mobile-index">0{i + 1}</span>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="nav-mobile-footer">
            <a className="btn btn-primary" href={profile.cv.href} download={profile.cv.filename} onClick={() => close(false)}>
              <Icon name="download" size={18} /> Download CV
            </a>
            <a className="nav-mobile-mail" href={`mailto:${profile.email}`}>
              {profile.email}
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
