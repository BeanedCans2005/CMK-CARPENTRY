import { useState } from "react";
import SocialLinks from "./SocialLinks";

// Set to false once a real form service is connected.
const DEMO_MODE = true;

const emptyForm = { name: "", email: "", phone: "", message: "" };

function validate(f) {
    const errors = {};
    if (!f.name.trim()) errors.name = "Please enter your name.";
    if (!/^\S+@\S+\.\S+$/.test(f.email.trim())) errors.email = "Please enter a valid email address.";
    if (f.phone.trim() && !/^[0-9+()\s-]{8,}$/.test(f.phone.trim())) errors.phone = "Please enter a valid phone number.";
    if (f.message.trim().length < 10 ) errors.message = "Please tell us a little more about your project.";
    return errors;
}

export default function ContactForm() {
    const [form, setForm] = useState(emptyForm);
    const [errors, setErrors ] = useState({});
    const [status, setStatus ] = useState("idle"); // idle | sending | sent | error

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
        if(errors[name]) setErrors({ ...errors, [name]: undefined });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const found = validate(form);
        setErrors(found);
        if (Object.keys(found).length > 0) return;

        setStatus("sending");
        try {
            // TODO: replace this block with the real form service call once chosen.
            console.log("Demo inquiry (not sent):", form);
            await new Promise((resolve) => setTimeout(resolve, 600));
            setStatus("sent");
            emptyForm(emptyForm);
        } catch {
            SetStatus("error");
        }
    };

    const fieldProps = (name) => ({
        id: name,
        name,
        value: form[name],
        onChange: handleChange,
        "aria-invalid": errors[name] ? "true" : undefined,
        "aria-describedby": errors[name] ? `${name}-error`: undefined,
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
                    {DEMO_MODE ? "Demo only: this inquiry was not actually sent." : "Thanks! We'll be in touch shortly."}
                </p>
            ) : (
                <form onSubmit={handleSubmit} className="form" noValidate>
                    {DEMO_MODE && <p className="demo-note">Demo form: submissions are not sent anywhere yet.</p>}

                    <div className="field">
                        <label htmlFor="Name">Name</label>
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
                            Sorry, something went wrong and your inquiry was not sent. Please try again.
                        </p>
                    )}

                    <button className="btn" type="submit" disabled={status === "sending"}>
                        {status === "sending" ? "Sending..." : "Send Inquiry"}
                    </button>
                </form>
            )}
            <SocialLinks />
        </section>
    );
}