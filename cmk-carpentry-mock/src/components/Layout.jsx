import { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import SocialLinks from "./SocialLinks";

export default function Layout() {
    const [menuOpen, setMenuOpen] = useState(false);
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

    return (
        <>
        <header className="nav">
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
                <Link to="/#contact" onClick={closeMenu}>Contact</Link>
                <SocialLinks />
                </nav>
        </header>
        
        <main>
            <Outlet />
        </main>

        <footer className="footer">
            <SocialLinks />
            <p>© {new Date().getFullYear()} C.M.K Carpentry Services · Mock design for review</p>
        </footer>

        </>
    );
}