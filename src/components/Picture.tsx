import { useState } from 'react';
import media from '../data/media.json';

type Entry = { ratio: number; sources: { src: string; w: number }[] };
const manifest = media as Record<string, Entry>;

type Props = {
  id: string;
  alt: string;
  sizes: string;
  className?: string;
  eager?: boolean;
};

/** Responsive WebP image whose intrinsic size is reserved up front to avoid layout shift. */
export function Picture({ id, alt, sizes, className, eager = false }: Props) {
  const [failed, setFailed] = useState(false);
  const entry = manifest[id];
  if (!entry) throw new Error(`Unknown media id: ${id}`);
  const largest = entry.sources[entry.sources.length - 1];
  const width = largest.w;
  const height = Math.round(largest.w * entry.ratio);

  // A network failure should leave a labelled placeholder, never a broken-image icon.
  if (failed) {
    return (
      <span className={`img-fallback${className ? ` ${className}` : ''}`} role={alt ? 'img' : undefined} aria-label={alt || undefined} style={{ aspectRatio: `${width} / ${height}` }}>
        <span aria-hidden="true">Image unavailable</span>
      </span>
    );
  }

  return (
    <img
      className={className}
      src={largest.src}
      srcSet={entry.sources.map((s) => `${s.src} ${s.w}w`).join(', ')}
      sizes={sizes}
      width={width}
      height={height}
      alt={alt}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      onError={() => setFailed(true)}
    />
  );
}
