import { useEffect } from 'react';

export function useBodyScrollLock(locked) {
  useEffect(() => {
    if (!locked) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = previous; };
  }, [locked]);
}

export function useEscape(onEscape, enabled = true) {
  useEffect(() => {
    if (!enabled) return;
    const handler = (event) => {
      if (event.key === 'Escape') onEscape();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onEscape, enabled]);
}
