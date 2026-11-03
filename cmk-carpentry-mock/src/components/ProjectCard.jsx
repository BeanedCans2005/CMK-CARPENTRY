import { Link } from "react-router-dom";
import { getImages, getSummary } from "../projects";

export default function ProjectCard({ project: p, compact = false }) {
  const cover = getImages(p)[0];

  return (
    <Link className={`project${compact ? " compact" : ""}`} to={`/projects/${p.id}`}>
      {cover ? (
        <img src={cover} alt={`${p.title}${p.location ? `, ${p.location}` : ""}`} loading="lazy" />
      ) : (
        <div className="photo">Photo coming soon</div>
      )}
      <div className="project-body">
        {p.placeholder && <span className="badge">Placeholder</span>}
        <h3>{p.title}</h3>
        <p className="meta">{[p.location, p.clientName].filter(Boolean).join(" · ")}</p>
        {!compact && <p>{getSummary(p)}</p>}
        {!compact && p.workCompleted?.length > 0 && (
          <ul className="tags">
            {p.workCompleted.map((w) => <li key={w}>{w}</li>)}
          </ul>
        )}
        <span className="view-link">View project →</span>
      </div>
    </Link>
  );
}