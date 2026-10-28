import {useState} from "react";
import "./App.css";
import { projects } from "./projects";

// Set to false once a real form service is connected
const DEMO_MODE = true;

const services = [
  { title: "Decking & Pergolas", text: "Custom Merbau, hardwood and composite decks, stairs & pergolas - built on frames that are solid, level and made to last outdoors."},
  { title: "Lock-up & Fix", text: "Doors, locks, architraves, skirting, trims and feature details - the finishing stage where everything has to line up."},
  { title: "Renovations & Extensions", text: "Internal reconfigurations, extensions, cladding, eaves and gables - managed from demolition through to lock-up and fix."},
];

// Add the client's real profile URLs here when they are available.
const SOCIALS = [
  { name: "Facebook", url: "" },
  { name: "Instagram", url: "" },
];

const emptyForm = { name: "", email: "", phone: "", message: "" };

function validate(f) {
  const errors = {};
  if (!f.name.trim()) errors.name = "Please enter your name.";
  if (!/^\S+@\S+\.\S+$/.test(f.email.trim())) errors.email = "Please enter a valid email address.";
  if (f.phone.trim() && !/^[0-9+()\s-]{8,}$/.test(f.phone.trim())) errors.phone = "Please enter a valid phone number.";
  if (f.message.trim().length < 10) errors.message = "Please tell us a little about your project (at least 10 characters).";
  return errors;
}

function SocialLinks() {
  return (
    <ul className="socials">
      {SOCIALS.map(({ name, url }) => (
        <li key={name}>
          {url ? (
            <a href={url} target="_blank" rel="noopener noreferrer" aria-label={`C.M.K Carpentry on ${name}`}>
              {name}
            </a>
          ) : (
            <span className="placeholder-link" title = "Link coming soon">{name}</span>
          )}
        </li>
      ))}
    </ul>
  );
}

export default function App() {
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: undefined });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const found = validate(form);
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    setStatus("sending");
    try {
      // TODO: replace this block wth the real form service call once chosen.
      console.log("Demo inquiry (not sent):", form);
      await new Promise((resolve) => setTimeout(resolve, 600));
      setStatus("sent");
      setForm(emptyForm);
    } catch {
      setStatus("error");
    }
  };

  const fieldProps = (name) => ({
    id: name,
    name,
    value: form[name],
    onChange: handleChange,
    "aria-invalid": errors[name] ? "true" : undefined,
    "aria-describedby": errors[name] ? `${name}-error` : undefined,
  });

  const fieldError = (name) =>
    errors[name] ? (
      <p className="field-error" id={`${name}-error`} role="alert">{errors[name]}</p>
    ) : null;

  return (
    <>
    <header className="nav">
      <span className="logo">C.M.K Carpentry</span>
      <button
        className="menu-toggle"
        aria-label="Toggle menu"
        aria-expanded={menuOpen}
        aria-controls="primary-nav"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? "✕" : "☰"}
      </button>  
      <nav id="primary-nav" className={menuOpen ? "open" : ""}>
        <a href="#services" onClick={closeMenu}>Services</a>
        <a href="#work" onClick={closeMenu}>Our Work</a>
        <a href="#contact" onClick={closeMenu}>Contact</a>
        <SocialLinks />
      </nav>
    </header>

    <section className="hero">
      <h1>Quality Carpentry, Built to Last</h1>
      <p>Custom timber work for homes and businesses.</p>
      <a className="btn" href="#contact">Get a Free Quote</a>
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
      <h2>Our Work</h2>
      {projects.length === 0 ? (
        <p className="empty"> Projects coming soon.</p>
      ) : (
        <div className="grid gallery">
          {projects.map((p) => (
            <article className="project" key={p.id}>
              {p.photo ? (
                <img
                  src={p.photo}
                  alt={`${p.title}${p.location ? `, ${p.location}` : ""}`}
                  loading="lazy"
                />
              ) : (
                <div className="photo">Photo coming soon</div>
              )}
              <div className="project-body">
                {p.placeholder && <span className="badge">Placeholder</span>}
                <h3>{p.title}</h3>
                <p className="meta">{[p.location, p.clientName].filter(Boolean).join(" · ")}</p>
                <p>{p.description}</p>
                {p.workCompleted?.length > 0 && (
                  <ul className="tags">
                    {p.workCompleted.map((w) => <li key={w}>{w}</li>)}
                  </ul>
                )}
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
    
    <section id="contact" className="section">
      <h2>Request a Quote</h2>
      {status === "sent" ? (
        <p className="success" role="status">
          {DEMO_MODE
            ? "Demo only: this inquiry was not actually sent."
            : "Thanks! We'll be in touch shortly."}
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="form" noValidate>
          {DEMO_MODE && (
            <p className="demo-note">Demo form: submissions are not sent anywhere yet.</p>
          )}

          <div className="field">
            <label htmlFor="name">Name</label>
            <input {...fieldProps("name")} autoComplete="name" />
            {fieldError("name")}
          </div>

          <div className="field">
            <label htmlFor="email">Email</label>
            <input {...fieldProps("email")} type="email" autoComplete="email" />
            {fieldError("email")}
          </div>

          <div className="field">
            <label htmlFor="phone">Phone <span className="optional">(optional)</span></label>
            <input {...fieldProps("phone")} type="tel" autoComplete="tel" />
            {fieldError("phone")}
          </div>

          <div className="field">
            <label htmlFor="message">Tell us about your project</label>
            <textarea {...fieldProps("message")} rows="5" />
            {fieldError("message")}
          </div>

          {status === "error" && (
            <p className="form-error" role="alert">
              Sorry, something went wrong with your inquiry and was not sent. Please try again.
            </p>
          )}

          <button className="btn" type="submit" disabled={status === "sending"}>
            {status === "sending" ? "Sending..." : "Send Inquiry"}
          </button>
        </form>
      )}
      <SocialLinks />
    </section>

    <footer className="footer">
      <SocialLinks />
      <p>© {new Date().getFullYear()} C.M.K Carpentry Services · Mock design for review</p>
    </footer>
  </>
  );
}