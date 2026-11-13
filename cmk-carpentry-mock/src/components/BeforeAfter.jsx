import { useRef, useState } from "react";

// Hand-made jagged offsets (in % of the width) so the torn edge looks the same every time.
const TEAR = [0, 1.2, -0.8, 1.6, -1.4, 0.6, 1.9, -1.1, 0.4, -1.7, 1.3, -0.5, 1.8, -1.2, 0.7, -1.9, 1.1, -0.3, 1.5, -1.0, 0.2];

function tearPolygon(edge, shift = 0) {
  const points = TEAR.map((_, i) => {
    const x = edge + TEAR[(i + shift) % TEAR.length];
    const y = (i / (TEAR.length - 1)) * 100;
    return `${x.toFixed(2)}% ${y.toFixed(2)}%`;
  });
  return `polygon(0% 0%, ${points.join(", ")}, 0% 100%)`;
}

// The "before" photo sits on top and tears away to reveal the "after" photo underneath.
export default function BeforeAfter({ before, after, label = "Before and after photos" }) {
  const ref = useRef(null);
  const dragging = useRef(false);
  const [pos, setPos] = useState(55); // 0 = all "after", 100 = all "before"
  const [touched, setTouched] = useState(false);

  const moveTo = (clientX) => {
    const rect = ref.current.getBoundingClientRect();
    setPos(Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100)));
  };

  const onPointerDown = (e) => {
    dragging.current = true;
    setTouched(true);
    e.currentTarget.setPointerCapture(e.pointerId);
    moveTo(e.clientX);
  };
  const onPointerMove = (e) => {
    if (dragging.current) moveTo(e.clientX);
  };
  const stopDragging = () => {
    dragging.current = false;
  };

  const onKeyDown = (e) => {
    const step = e.shiftKey ? 10 : 5;
    let next = null;
    if (e.key === "ArrowLeft") next = pos - step;
    else if (e.key === "ArrowRight") next = pos + step;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = 100;
    if (next === null) return;
    e.preventDefault();
    setTouched(true);
    setPos(Math.max(0, Math.min(100, next)));
  };

  // The tear can travel just past both edges so either photo can fully cover the frame.
  const edge = -5 + (pos / 100) * 110;
  const grip = Math.max(4, Math.min(96, pos));

  return (
    <div
      ref={ref}
      className="ba"
      role="slider"
      tabIndex={0}
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(pos)}
      aria-valuetext={`Original photo covering ${Math.round(pos)}% of the image`}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={stopDragging}
      onPointerCancel={stopDragging}
      onKeyDown={onKeyDown}
    >
      {after ? (
        <img className="ba-layer" src={after} alt="" draggable={false} />
      ) : (
        <div className="ba-layer ba-ph after">After photo coming soon</div>
      )}

      <div className="ba-tear">
        <div className="ba-paper" style={{ clipPath: tearPolygon(edge + 1.4, 5) }} />
        {before ? (
          <img className="ba-layer" style={{ clipPath: tearPolygon(edge) }} src={before} alt="" draggable={false} />
        ) : (
          <div className="ba-layer ba-ph before" style={{ clipPath: tearPolygon(edge) }}>
            Before photo coming soon
          </div>
        )}
      </div>

      <span className="ba-chip before" style={{ opacity: pos > 12 ? 1 : 0 }}>Before</span>
      <span className="ba-chip after" style={{ opacity: pos < 88 ? 1 : 0 }}>After</span>
      <span className="ba-grip" style={{ left: `${grip}%` }} aria-hidden="true">⇄</span>
      {!touched && <span className="ba-hint">Drag to reveal the finished work</span>}
    </div>
  );
}