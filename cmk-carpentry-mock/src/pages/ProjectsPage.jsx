import { useEffect } from "react";
import { projects } from "../projects";
import ProjectCard from "../components/ProjectCard";

export default function ProjectsPage() {
    useEffect(() => {
        document.title = "Projects | C.M.K Carpentry Services";
    }, []);

    return (
        <section className="section">
            <h2>Our Work</h2>
            {projects.length === 0 ? (
                <p className="empty">Projects coming soon.</p>
            ) : (
                <div className="grid gallery">
                    {projects.map((p) => <ProjectCard key={p.id} project={p} />)}
                </div>
            )}
        </section>
    );
}