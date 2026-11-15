import { useEffect, useRef } from "react";

export default function Lightbox({ items, index, onClose, onChange }) {
  const closeRef = useRef(null);
  const item = items[index];
  const prev = (index - 1 + items.length) % items.length;
  const next = (index + 1) % items.length;

  useEffect(() => {
    closeRef.current?.focus();
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onChange(prev);
      if (e.key === "ArrowRight") onChange(next);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [index, prev, next, onClose, onChange]);

  if (!item) return null;

  return (
    <div className="lightbox" role="dialog" aria-modal="true" aria-label="Project photo" onClick={onClose}>
      <button ref={closeRef} className="lb-close" aria-label="Close photo" onClick={onClose}>✕</button>
      {items.length > 1 && (
        <button
          className="lb-nav prev"
          aria-label="Previous photo"
          onClick={(e) => { e.stopPropagation(); onChange(prev); }}
        >
          ‹
        </button>
      )}
      <figure onClick={(e) => e.stopPropagation()}>
        <img src={item.src} alt={item.caption || ""} />
        {item.caption && <figcaption>{item.caption}</figcaption>}
      </figure>
      {items.length > 1 && (
        <button
          className="lb-nav next"
          aria-label="Next photo"
          onClick={(e) => { e.stopPropagation(); onChange(next); }}
        >
          ›
        </button>
      )}
    </div>
  );
}