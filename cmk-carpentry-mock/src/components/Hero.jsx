import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { services } from "../services";

// Hero background photos. Save images in /public/hero and list them like "/hero/deck.jpg".
// 0 images = green background only, 1 = static photo, 2+ = slow crossfade.
// TESTPHOTO is a temporary example; replace it with the client's photos.

const HERO_IMAGES = ["/projects/TESTPHOTO.jpeg"]
const SLIDE_MS = 6000; // time each photo stays on screen

export default function Hero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (HERO_IMAGES.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const  timer = setInterval(
      () => setCurrent((i) => (i + 1) % HERO_IMAGES.length),
      SLIDE_MS
    );
    return () => clearInterval(timer);
    
  }, []);

  return (
    <section className="hero hero-split">
      <div className="hero-slides" aria-hidden="true">
        {HERO_IMAGES.map((src, i) => (
          <div
            key={`${src}-${i}`}
            className={`hero-slide${i === current ? " active" : ""}`}
            style={{ backgroundImage: `url(${src})` }}
          />
        ))}
      </div>
      <div className="hero-overlay" aria-hidden="true" />

      <div className="hero-inner">
        <p className="eyebrow">{services.map((s) => s.title).join(" · ")}</p>
        <h1>Quality carpentry, <span className="hl">built to last.</span></h1>
        <p className="hero-lead">Custom timber work for homes and businesses.</p>
        <div className="hero-actions">
          <Link className="btn" to="/#contact">Get a Free Quote</Link>
          <Link className="btn btn-ghost" to="/projects">See our work</Link>
        </div>
      </div>
    </section>
  );
}