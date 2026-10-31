import { useEffect } from "react";
import { Link } from "react-router-dom";
import { services } from "../services";
import { projects } from "../projects";
import ProjectCard from "../components/ProjectCard";
import ContactForm from "../components/ContactForm";

export default function Home() {
    useEffect(() => {
        document.title = "C.M.K Carpentry Services | Decking, Lock-up & fix, Renovations";
    }, []);

    const flagged = projects.filter((p) => p.featured);
    const featured = (flagged.length > 0 ? flagged : projects).slice(0, 3);

    return (
        <>
            <section className="hero">
                <h1>Quality Carpentry Built to Last</h1>
                <p>Custom timber work for homes and businesses.</p>
                <Link className="btn" to="/#contact">Get a Free Quote</Link>
            </section>

            <section id="services" className="section">
                <h2>Services</h2>
                <div className="grid">
                    {services.map((s) => (
                        <div className="card" key={s.title}>
                            <h3>{s.title}</h3>
                            <p>{s.text}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section id="work" className="section alt">
                <h2>Featured Work</h2>
                {featured.length === 0 ? (
                    <p className="empty">Projects coming soon.</p>
                ) : (
                    <div className="grid gallery">
                        {featured.map((p) => <ProjectCard key={p.id} project={p} />)}
                    </div>
                )}
                <div className="center">
                    <Link className="btn" to="/projects">View all {projects.length} projects</Link>
                </div>
            </section>

            <ContactForm />
        </>
    );
}