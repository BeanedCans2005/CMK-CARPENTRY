import { useEffect } from "react";
import { Link } from "react-router-dom";
import { services } from "../services";
import { projects } from "../projects";
import Hero from "../components/Hero";
import ProjectCard from "../components/ProjectCard";
import ContactForm from "../components/ContactForm";

export default function Home() {
  useEffect(() => {
    document.title = "C.M.K Carpentry Services | Decking, Lock-up & Fix, Renovations";
  }, []);

  const flagged = projects.filter((p) => p.featured);
  const featured = (flagged.length > 0 ? flagged : projects).slice(0, 3);

  return (
    <>
      <Hero />

      <section id="services" className="section wide">
        <div className="split">
          <div>
            <h2 className="split-title">Services</h2>
            <div className="service-list">
              {services.map((s, i) => (
                <div className="card service" key={s.title}>
                  <span className="service-num">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <h3>{s.title}</h3>
                    <p>{s.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="split-title">Featured Work</h2>
            {featured.length === 0 ? (
              <p className="empty">Projects coming soon.</p>
            ) : (
              <div className="featured-list">
                {featured.map((p) => <ProjectCard key={p.id} project={p} compact />)}
              </div>
            )}
            <div className="split-cta">
              <Link className="btn" to="/projects">View all {projects.length} projects</Link>
            </div>
          </div>
        </div>
      </section>

      <ContactForm />
    </>
  );
}