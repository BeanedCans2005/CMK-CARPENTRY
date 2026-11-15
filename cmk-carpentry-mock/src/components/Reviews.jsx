import { Link } from "react-router-dom";
import { reviews } from "../reviews";

export default function Reviews() {
  if (!reviews.length) return null;
  return (
    <section className="reviews" aria-labelledby="reviews-title">
      <div className="reviews-inner">
        <h2 id="reviews-title">What our customers say</h2>
        <div className="reviews-grid">
          {reviews.map((r) => (
            <figure className="review-card" key={r.name + r.text.slice(0, 12)}>
              <blockquote>“{r.text}”</blockquote>
              <figcaption>
                <strong>{r.name}</strong>
                {r.suburb ? <span>, {r.suburb}</span> : null}
                {r.project ? (
                  <Link to={`/projects/${r.project}`}> · View the project</Link>
                ) : null}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}