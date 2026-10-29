import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import media from '../data/media.json';
import { Icon } from './Icon';
import { Picture } from './Picture';

export type LightboxItem = { key: string; alt: string; caption?: string };

type Props = {
  title: string;
  items: LightboxItem[];
  start?: number;
  onClose: () => void;
};

type Entry = { ratio: number; sources: { src: string; w: number }[] };
const manifest = media as Record<string, Entry>;

const sizesFor = (key: string) =>
  manifest[key].ratio < 1 ? '(min-width: 1100px) 1040px, 94vw' : '(min-width: 768px) 440px, 80vw';

/** Warms the browser cache for a neighbouring slide so next/previous feels instant. */
function prefetch(key: string | undefined) {
  if (!key) return;
  const img = new Image();
  img.sizes = sizesFor(key);
  img.srcset = manifest[key].sources.map((s) => `${s.src} ${s.w}w`).join(', ');
}

/** Accessible modal gallery: Escape / arrow keys, focus trap, swipe, thumbnail strip. */
export function Lightbox({ title, items, start = 0, onClose }: Props) {
  const [index, setIndex] = useState(start);
  const dialogRef = useRef<HTMLDivElement>(null);
  const thumbsRef = useRef<HTMLOListElement>(null);
  const swipeX = useRef<number | null>(null);
  const titleId = useId();
  const count = items.length;
  const item = items[index];

  const go = useCallback((delta: number) => setIndex((i) => (i + delta + count) % count), [count]);

  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null;
    document.body.classList.add('lightbox-open');
    dialogRef.current?.querySelector<HTMLElement>('.lightbox-close')?.focus();
    return () => {
      document.body.classList.remove('lightbox-open');
      opener?.focus();
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowRight' && count > 1) go(1);
      else if (e.key === 'ArrowLeft' && count > 1) go(-1);
      else if (e.key === 'Tab' && dialogRef.current) {
        const focusables = [...dialogRef.current.querySelectorAll<HTMLElement>('button, a[href]')];
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [count, go, onClose]);

  useEffect(() => {
    prefetch(items[(index + 1) % count]?.key);
    prefetch(items[(index - 1 + count) % count]?.key);
    thumbsRef.current?.children[index]?.scrollIntoView?.({ block: 'nearest', inline: 'center' });
  }, [index, items, count]);

  const landscape = manifest[item.key].ratio < 1;

  return createPortal(
    <div className="lightbox" role="dialog" aria-modal="true" aria-labelledby={titleId} ref={dialogRef}>
      <div className="lightbox-backdrop" onClick={onClose} aria-hidden="true" />
      <div className="lightbox-panel">
        <header className="lightbox-head">
          <div>
            <h2 id={titleId} className="lightbox-title">
              {title}
            </h2>
            <p className="lightbox-count" aria-live="polite">
              {index + 1} / {count}
              {item.caption && <span className="lightbox-caption"> · {item.caption}</span>}
            </p>
          </div>
          <button type="button" className="lightbox-close" onClick={onClose} aria-label="Close gallery">
            <Icon name="close" size={22} />
          </button>
        </header>

        <div
          className={`lightbox-stage${landscape ? ' is-landscape' : ''}`}
          onPointerDown={(e) => (swipeX.current = e.clientX)}
          onPointerUp={(e) => {
            if (swipeX.current === null || count < 2) return;
            const dx = e.clientX - swipeX.current;
            swipeX.current = null;
            if (Math.abs(dx) > 45) go(dx < 0 ? 1 : -1);
          }}
          onPointerCancel={() => (swipeX.current = null)}
        >
          {count > 1 && (
            <button type="button" className="lightbox-nav is-prev" onClick={() => go(-1)} aria-label="Previous image">
              <Icon name="chevronLeft" size={24} />
            </button>
          )}
          <figure className="lightbox-figure">
            <Picture key={item.key} id={item.key} alt={item.alt} sizes={sizesFor(item.key)} eager className="lightbox-img" />
          </figure>
          {count > 1 && (
            <button type="button" className="lightbox-nav is-next" onClick={() => go(1)} aria-label="Next image">
              <Icon name="chevronRight" size={24} />
            </button>
          )}
        </div>

        {count > 1 && (
          <ol className="lightbox-thumbs" ref={thumbsRef} aria-label="All images">
            {items.map((t, i) => (
              <li key={t.key}>
                <button
                  type="button"
                  className="lightbox-thumb"
                  aria-label={`Show image ${i + 1} of ${count}`}
                  aria-current={i === index ? 'true' : undefined}
                  onClick={() => setIndex(i)}
                >
                  <Picture id={t.key} alt="" sizes="72px" />
                </button>
              </li>
            ))}
          </ol>
        )}
      </div>
    </div>,
    document.body,
  );
}
