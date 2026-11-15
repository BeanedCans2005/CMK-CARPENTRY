import { useState } from "react";
import SocialLinks from "./SocialLinks";
import { SITE } from "../siteInfo";

// Paste the Formspree endpoint here, like "https://formspree.io/f/abcdwxyz".
// While it's empty the form stays in demo mode and sends nothing.
const FORM_ENDPOINT = "https://formspree.io/f/meagaqea";
const DEMO_MODE = !FORM_ENDPOINT;

// "_gotcha" is a hidden spam trap: real visitors never fill it in.
const emptyForm = { name: "", email: "", phone: "", message: "", _gotcha: "" };

function validate(f) {
  const errors = {};
  if (!f.name.trim()) errors.name = "Please enter your name.";
  if (!/^\S+@\S+\.\S+$/.test(f.email.trim())) errors.email = "Please enter a valid email address.";
  if (f.phone.trim() && !/^[0-9+()\s-]{8,}$/.test(f.phone.trim())) errors.phone = "Please enter a valid phone number.";
  if (f.message.trim().length < 10) errors.message = "Please tell us a little about your project (at least 10 characters).";
  return errors;
}

export default function ContactForm() {
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: undefined });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status === "sending") return;

    const found = validate(form);
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    // A bot filled in the hidden field: look successful and send nothing.
    if (form._gotcha) {
      setStatus("sent");
      return;
    }

    setStatus("sending");
    try {
      if (DEMO_MODE) {
        console.log("Demo inquiry (not sent):", form);
        await new Promise((resolve) => setTimeout(resolve, 600));
      } else {
        const res = await fetch(FORM_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({
            ...form,
            _subject: `New quote request from ${form.name.trim()}`,
          }),
        });
        if (!res.ok) throw new Error(`Form service responded ${res.status}`);
      }
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
    <section id="contact" className="section">
      <h2>Request a Quote</h2>
      {status === "sent" ? (
        <p className="success" role="status">
          {DEMO_MODE
            ? "Demo only: this inquiry was not actually sent."
            : "Thanks! We've received your inquiry and will be in touch shortly."}
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="form" noValidate>
          {DEMO_MODE && <p className="demo-note">Demo form: submissions are not sent anywhere yet.</p>}

          <input
            type="text"
            name="_gotcha"
            value={form._gotcha}
            onChange={handleChange}
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            style={{ position: "absolute", left: "-9999px" }}
          />

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
              Sorry, something went wrong and your inquiry was not sent.
              {SITE.phone ? ` Please try again, or call us on ${SITE.phone}.` : " Please try again."}
            </p>
          )}

          <button className="btn" type="submit" disabled={status === "sending"}>
            {status === "sending" ? "Sending..." : "Send Inquiry"}
          </button>
          <p className="demo-note">We'll only use your details to reply to your enquiry.</p>
        </form>
      )}
      <SocialLinks label />
    </section>
  );
}