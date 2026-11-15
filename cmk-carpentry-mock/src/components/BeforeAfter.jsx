import { useRef, useState } from "react";

export default function BeforeAfter({ before, after, beforeLabel = "Before", afterLabel = "After", alt = "Before and after photo" }) {
  const [pos, setPos] = useState(50);
  const box = useRef(null);

  const move = (clientX) => {
    const r = box.current.getBoundingClientRect();
    const pct = ((clientX - r.left) / r.width) * 100;
    setPos(Math.min(100, Math.max(0, pct)));
  };

  const onPointerDown = (e) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    move(e.clientX);
  };
  const onPointerMove = (e) => {
    if (e.currentTarget.hasPointerCapture(e.pointerId)) move(e.clientX);
  };
  const onKeyDown = (e) => {
    if (e.key === "ArrowLeft") setPos((p) => Math.max(0, p - 5));
    if (e.key === "ArrowRight") setPos((p) => Math.min(100, p + 5));
  };

  return (
    <div
      className="ba"
      ref={box}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
    >
      <img className="ba-img" src={after} alt={`${alt} (after)`} draggable="false" />
      <img
        className="ba-img ba-before"
        src={before}
        alt={`${alt} (before)`}
        draggable="false"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
      />
      <span className="ba-tag ba-tag-before">{beforeLabel}</span>
      <span className="ba-tag ba-tag-after">{afterLabel}</span>
      <div className="ba-line" style={{ left: `${pos}%` }}>
        <button
          type="button"
          className="ba-handle"
          role="slider"
          aria-label="Reveal before and after"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(pos)}
          onKeyDown={onKeyDown}
        >
          ⟷
        </button>
      </div>
    </div>
  );
}