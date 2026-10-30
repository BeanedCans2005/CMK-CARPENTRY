import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { projects, getParagraphs, getImages } from "../projects";

export default function ProjectDetail() {
    const { id } = useParams();
    const project = projects.find((p) => p.id === id);

    useEffect(() => {
        document.title = project
        ? `${project.title} | C.M.K Carpentry Services`
        : "Project not found | C.M.K Carpentry Services";
    }, [project]);

    if (!project) {
        return (
            <section className="section">
                <h2>Project not found</h2>
                <p className="empty">We couldn't find that project.</p>
                <p className="center"><Link className="btn" to="/projects">Back to all projects</Link></p>
            </section>
        );
    }

    const images = getImages(project);

    return (
        <article className="section project-page">
            <Link className="back-link" to="/projects">← All projects</Link>
            {project.placeholder && <span className="badge">Placeholder</span>}
            <h1>{project.title}</h1>
            <p className="meta">{[project.location, project.clientName].filter(Boolean).join(" · ")}</p>

            {images.length > 0 ? (
                <div className="project-photos">
                    {images.map((src, i) => (
                        <img
                            key={src}
                            src={src}
                            alt={`${project.title}, photo ${i + 1}`}
                            loading={i === 0 ? "eager" : "lazy"}
                        />
                    ))}
                </div>
            ) : (
                <div className="photo">Photos coming soon</div>
            )}

            <div className="project-text">
                {getParagraphs(project).map((para, i ) => <p key={i}>{para}</p>)}
                {project.workCompleted?.length > 0 && (
                    <ul className="tags">
                        {project.workCompleted.map((w) => <li key={w}>{w}</li>)}
                    </ul>
                )}
            </div>

            <p className="center"><Link className="btn" to="/#contact">Get a free quote</Link></p>
        </article>
    );
}