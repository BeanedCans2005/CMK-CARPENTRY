import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { projects, getParagraphs, getBuild, getImages, getGallery } from "../projects";
import BeforeAfter from "../components/BeforeAfter";
import Lightbox from "../components/ImageLightbox";
import SocialLinks from "../components/SocialLinks";

export default function ProjectDetail() {
  const { id } = useParams();
  const project = projects.find((p) => p.id === id);
  const [lightbox, setLightbox] = useState(null);

  useEffect(() => {
    document.title = project
      ? `${project.title} | C.M.K Carpentry Services`
      : "Project not found | C.M.K Carpentry Services";
  }, [project]);

  useEffect(() => {
    setLightbox(null);
  }, [id]);

  if (!project) {
    return (
      <section className="section">
        <h2>Project not found</h2>
        <p className="empty">We couldn't find that project.</p>
        <p className="center"><Link className="btn" to="/projects">Back to all projects</Link></p>
      </section>
    );
  }

  const cover = getImages(project)[0];
  const gallery = getGallery(project);
  const overview = getParagraphs(project);
  const build = getBuild(project);
  const facts = [
    ["Service", project.category],
    ["Location", project.location],
    ["Duration", project.duration],
    ["Client", project.clientName],
  ].filter(([, value]) => value);

  const index = projects.findIndex((p) => p.id === id);
  const prev = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];

  return (
    <article className="section wide project-page">
      <Link className="back-link" to="/projects">← All projects</Link>
      {project.placeholder && <span className="badge">Placeholder</span>}
      <h1>{project.title}</h1>
      <p className="meta">{[project.location, project.clientName].filter(Boolean).join(" · ")}</p>

      {cover ? (
        <img
          className="project-cover"
          src={cover}
          alt={`${project.title}${project.location ? `, ${project.location}` : ""}`}
        />
      ) : (
        <div className="photo project-cover">Photo coming soon</div>
      )}

      <div className="project-layout">
        <div className="project-text">
          {overview.length > 0 && (
            <section>
              <h2>Overview</h2>
              {overview.map((para, i) => <p key={i}>{para}</p>)}
            </section>
          )}
          {project.brief && (
            <section>
              <h2>The brief</h2>
              <p>{project.brief}</p>
            </section>
          )}
          {build.length > 0 && (
            <section>
              <h2>The build</h2>
              {build.map((para, i) => <p key={i}>{para}</p>)}
            </section>
          )}
        </div>

        <aside className="project-facts" aria-label="Project details">
          <h2>Project details</h2>
          <dl>
            {facts.map(([label, value]) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
            {project.materials?.length > 0 && (
              <div>
                <dt>Materials</dt>
                <dd>
                  <ul>{project.materials.map((m) => <li key={m}>{m}</li>)}</ul>
                </dd>
              </div>
            )}
            {project.workCompleted?.length > 0 && (
              <div>
                <dt>Work completed</dt>
                <dd>
                  <ul className="tags">{project.workCompleted.map((w) => <li key={w}>{w}</li>)}</ul>
                </dd>
              </div>
            )}
          </dl>
          <Link className="btn" to="/#contact">Get a free quote</Link>
        </aside>
      </div>

      {project.beforeAfter && (
        <section className="project-block">
          <h2 className="block-title">Before &amp; after</h2>
          <BeforeAfter
            before={project.beforeAfter.before}
            after={project.beforeAfter.after}
            label={`Before and after photos of ${project.title}`}
          />
        </section>
      )}

      {(gallery.length > 0 || project.placeholder) && (
        <section className="project-block">
          <h2 className="block-title">Gallery</h2>
          <div className="gallery-grid">
            {gallery.length > 0
              ? gallery.map((g, i) => (
                  <button
                    key={g.src}
                    type="button"
                    className="gallery-item"
                    aria-label={`Enlarge photo ${i + 1}${g.caption ? `: ${g.caption}` : ""}`}
                    onClick={() => setLightbox(i)}
                  >
                    <img src={g.src} alt="" loading="lazy" />
                    {g.caption && <span>{g.caption}</span>}
                  </button>
                ))
              : [1, 2, 3].map((n) => <div className="photo" key={n}>Photo coming soon</div>)}
          </div>
        </section>
      )}

      {projects.length > 1 && (
        <nav className="project-pager" aria-label="More projects">
          <Link to={`/projects/${prev.id}`}>← {prev.title}</Link>
          <Link to={`/projects/${next.id}`}>{next.title} →</Link>
        </nav>
      )}

      <div className="follow">
        <p>Follow our latest work</p>
        <SocialLinks label />
      </div>

      {lightbox !== null && (
        <Lightbox items={gallery} index={lightbox} onClose={() => setLightbox(null)} onChange={setLightbox} />
      )}
    </article>
  );
}