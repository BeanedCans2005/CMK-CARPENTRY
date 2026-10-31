import { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { projects, categories } from "../projects";
import ProjectCard from "../components/ProjectCard";

export default function ProjectsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const requested = searchParams.get("service");
  const active = categories.includes(requested) ? requested : "All";
  const visible = active === "All" ? projects : projects.filter((p) => p.category === active);

  useEffect(() => {
    document.title = "Projects | C.M.K Carpentry Services";
  }, []);

  const choose = (value) => setSearchParams(value === "All" ? {} : { service: value });

  return (
    <section className="section wide">
      <Link className="back-link" to="/">← Back to home</Link>
      <h2>All Projects</h2>

      <div className="filters" role="group" aria-label="Filter projects by service">
        {["All", ...categories].map((c) => (
          <button
            key={c}
            type="button"
            className={`filter${active === c ? " active" : ""}`}
            aria-pressed={active === c}
            onClick={() => choose(c)}
          >
            {c}
          </button>
        ))}
      </div>

      <p className="result-count" aria-live="polite">
        Showing {visible.length} of {projects.length} project{projects.length === 1 ? "" : "s"}
      </p>

      {visible.length === 0 ? (
        <p className="empty">No projects in this category yet.</p>
      ) : (
        <div className="grid gallery">
          {visible.map((p) => <ProjectCard key={p.id} project={p} />)}
        </div>
      )}

      <p className="center">
        <Link className="btn" to="/">Back to home</Link>
      </p>
    </section>
  );
}