import { useEffect, useRef } from 'react';
import { useBodyScrollLock, useEscape } from '../hooks.js';

export default function Lightbox({ photos, index, onChange, onClose }) {
  const closeRef = useRef(null);
  useBodyScrollLock(true);
  useEscape(onClose);

  useEffect(() => {
    closeRef.current?.focus();
    const handler = (event) => {
      if (event.key === 'ArrowLeft') onChange(Math.max(0, index - 1));
      if (event.key === 'ArrowRight') onChange(Math.min(photos.length - 1, index + 1));
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [index, photos.length, onChange]);

  const photo = photos[index];
  return (
    <div className="lightbox-overlay" role="dialog" aria-modal="true" aria-label="Photo viewer">
      <header className="lightbox-topbar">
        <button ref={closeRef} className="round-icon inverse" onClick={onClose} aria-label="Close photo viewer">
          <i className="bi bi-x-lg" />
        </button>
        <span>{index + 1} / {photos.length}</span>
        <button className="quiet-button inverse-text" onClick={() => navigator.clipboard?.writeText(location.href)}>
          <i className="bi bi-share me-2" />Share
        </button>
      </header>
      <button className="lightbox-arrow previous" disabled={index === 0}
        onClick={() => onChange(index - 1)} aria-label="Previous photo">
        <i className="bi bi-chevron-left" />
      </button>
      <figure className="lightbox-figure">
        <img src={photo.src} alt={photo.alt} />
        <figcaption>{photo.category}</figcaption>
      </figure>
      <button className="lightbox-arrow next" disabled={index === photos.length - 1}
        onClick={() => onChange(index + 1)} aria-label="Next photo">
        <i className="bi bi-chevron-right" />
      </button>
    </div>
  );
}
