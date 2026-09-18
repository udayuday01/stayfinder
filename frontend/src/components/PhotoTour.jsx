import { useEffect, useMemo, useRef, useState } from 'react';
import { useBodyScrollLock, useEscape } from '../hooks.js';

export default function PhotoTour({ photos, initialIndex = 0, onClose, onOpenPhoto }) {
  const closeRef = useRef(null);
  const [filter, setFilter] = useState('All photos');
  const categories = useMemo(() => ['All photos', ...new Set(photos.map(p => p.category))], [photos]);
  const shown = filter === 'All photos' ? photos : photos.filter(p => p.category === filter);

  useBodyScrollLock(true);
  useEscape(onClose);

  useEffect(() => { closeRef.current?.focus(); }, []);
  useEffect(() => {
    const previous = document.activeElement;
    return () => previous?.focus?.();
  }, []);

  return (
    <div className="tour-overlay" role="dialog" aria-modal="true" aria-label="Photo tour">
      <header className="tour-topbar">
        <button ref={closeRef} className="round-icon" onClick={onClose} aria-label="Close photo tour">
          <i className="bi bi-x-lg" />
        </button>
        <span className="tour-title">Photo tour <span className="muted">· {photos.length} photos</span></span>
        <button className="quiet-button" onClick={() => navigator.clipboard?.writeText(location.href)}>
          <i className="bi bi-share me-2" />Share
        </button>
      </header>
      <div className="tour-layout">
        <aside className="tour-categories" aria-label="Photo categories">
          {categories.map(category => (
            <button key={category} className={`category-button ${filter === category ? 'selected' : ''}`}
              onClick={() => setFilter(category)}>{category}</button>
          ))}
        </aside>
        <main className="tour-main">
          <div className="tour-grid">
            {shown.map(photo => {
              const index = photos.indexOf(photo);
              return (
                <button className="tour-photo" key={`${photo.src}-${index}`}
                  onClick={() => onOpenPhoto(index)} aria-label={`Open photo ${index + 1}: ${photo.alt}`}>
                  <img src={photo.src} alt={photo.alt} loading="lazy" />
                  <span>{photo.category}</span>
                </button>
              );
            })}
          </div>
        </main>
      </div>
    </div>
  );
}
