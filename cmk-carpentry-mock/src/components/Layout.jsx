import { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import SocialLinks from "./SocialLinks";
import PhoneIcon from "./PhoneIcon";
import MobileContactBar from "./MobileContactBar";
import Footer from "./Footer";
import { SITE, phoneHref } from "../siteInfo";

export default function Layout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [atContact, setAtContact] = useState(false);
  const { pathname, hash, key } = useLocation();
  const closeMenu = () => setMenuOpen(false);

  // After navigating: scroll to the #section if there is one, otherwise to the top.
  useEffect(() => {
    if (hash) {
      requestAnimationFrame(() => document.getElementById(hash.slice(1))?.scrollIntoView());
    } else {
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  }, [pathname, hash, key]);

  // Hide the floating quote button while the contact form is on screen.
  useEffect(() => {
    setAtContact(false);
    const el = document.getElementById("contact");
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setAtContact(entry.isIntersecting),
      { threshold: 0.25 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [pathname]);

  return (
    <>
      <header className="nav">
        <div className="nav-inner">
          <Link className="logo" to="/" onClick={closeMenu}>C.M.K Carpentry</Link>
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
            <NavLink to="/" end onClick={closeMenu}>Home</NavLink>
            <Link to="/#services" onClick={closeMenu}>Services</Link>
            <NavLink to="/projects" onClick={closeMenu}>Projects</NavLink>
            {SITE.phone && (
              <a
                className="nav-phone"
                href={phoneHref(SITE.phone)}
                aria-label={`Call ${SITE.phone}`}
                onClick={closeMenu}
              >
                <PhoneIcon /> <span>{SITE.phone}</span>
              </a>
            )}
            <Link className="btn btn-sm" to="/#contact" onClick={closeMenu}>Get a Free Quote</Link>
            <SocialLinks />
          </nav>
        </div>
      </header>

      <main>
        <Outlet />
      </main>

      <Footer />
      <MobileContactBar />

      {/* Desktop only: always-visible quote button */}
      <Link
        className={`btn float-quote${atContact ? " is-hidden" : ""}`}
        to="/#contact"
        aria-hidden={atContact}
        tabIndex={atContact ? -1 : 0}
      >
        Get a Free Quote
      </Link>
    </>
  );
}