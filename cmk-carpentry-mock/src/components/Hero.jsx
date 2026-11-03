import { Link } from "react-router-dom";
import { services } from "../services";

// When the client supplies a strong photo, save it in /public (for example hero.jpg)
// and set it here, like "/hero.jpg". Leave it empty to keep the green background.
const HERO_IMAGE = "";

export default function Hero() {
  const style = HERO_IMAGE
    ? {
        backgroundImage: `linear-gradient(105deg, rgba(19, 41, 31, 0.92) 35%, rgba(19, 41, 31, 0.5)), url(${HERO_IMAGE})`,
      }
    : undefined;

  return (
    <section className="hero hero-split" style={style}>
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