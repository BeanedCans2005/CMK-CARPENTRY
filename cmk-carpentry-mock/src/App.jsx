import { useState } from "react";
import "./App.css";

const services = [
  { title: "Decking & Pergolas", text: "Custom Merbau, hardwood and composite decks, stairs & pergolas - built on frames that are solid, level and made to last outdoors." },
  { title: "Lock-up & Fix", text: "Doors, locks, architraves, skirting, trims and feature details - the finishing stage where everything has to line up." },
  { title: "Renovations & Extensions", text: "Internal reconfigurations, extensions, cladding, eaves and gables - managed from demolition through to lock-up and fix." },
];

const projects = ["Project One", "Project Two", "Project Three", "Project Four", "Project Five", "Project Six"];

export default function App() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: ""});
  const [sent, setSent] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Mock inquiry:", form); //no backend yet
    setSent(true);
    setForm({name: "", email: "", phone: "", message: ""});
  };

  return (
    <>
    <header className="nav">
      <span className="logo">CMK Carpentry</span>
      <nav>
        <a href="#services">Services</a>
        <a href="#work">Our Work</a>
        <a href="#contact">Contact</a>
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
      <div className="grid gallery">
        {projects.map((p) => (
          <div className="photo" key={p}>{p}</div>
        ))}
      </div>
    </section>

    <section id="contact" className="section">
        <h2>Request a Quote</h2>
        {sent ? (
          <p className="success">Thanks! We'll be in touch shortly.</p>
        ) : (
          <form onSubmit={handleSubmit} className="form">
            <input name="name" placeholder="Your name" value={form.name} onChange={handleChange} required />
            <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
            <input name="phone" placeholder="Phone (optional)" value={form.phone} onChange={handleChange} />
            <textarea name="message" rows="5" placeholder="Tell us about your project" value={form.message} onChange={handleChange} required />
            <button className="btn" type="submit">Send Inquiry</button>
          </form>
        )}
      </section>

      <footer className="footer">© {new Date().getFullYear()} CMK Carpentry · Mock design for review</footer>
    </>
  );
}