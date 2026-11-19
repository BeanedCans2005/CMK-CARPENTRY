import { Link } from "react-router-dom";
import SocialLinks from "./SocialLinks";
import PhoneIcon from "./PhoneIcon";
import { services } from "../services";
import { SITE, phoneHref } from "../siteInfo";

const SHOW_DRAFT_NOTE = true; // set to false before launch

export default function Footer() {
  const hasContact = SITE.phone || SITE.email || SITE.serviceArea;
  const legal = [SITE.abn && `ABN ${SITE.abn}`, SITE.licence && `Licence ${SITE.licence}`].filter(Boolean);

  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div>
          <Link className="footer-logo" to="/">C.M.K Carpentry</Link>
          <SocialLinks label />
        </div>

        <div>
          <h3>Services</h3>
          <ul>
            {services.map((s) => (
              <li key={s.title}>
                <Link to={`/projects?service=${encodeURIComponent(s.title)}`}>{s.title}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3>Explore</h3>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/projects">Projects</Link></li>
            <li><Link to="/#contact">Get a Free Quote</Link></li>
          </ul>
        </div>

        {hasContact && (
          <div>
            <h3>Contact</h3>
            <ul>
              {SITE.phone && (
                <li>
                  <a className="footer-phone" href={phoneHref(SITE.phone)}>
                    <PhoneIcon size={16} /> {SITE.phone}
                  </a>
                </li>
              )}
              {SITE.email && <li><a href={`mailto:${SITE.email}`}>{SITE.email}</a></li>}
              {SITE.serviceArea && <li>{SITE.serviceArea}</li>}
            </ul>
          </div>
        )}
      </div>

      <div className="footer-bottom">
        <p>
          © {new Date().getFullYear()} C.M.K Carpentry Services
          {legal.length > 0 && ` · ${legal.join(" · ")}`}
        </p>
        {SHOW_DRAFT_NOTE && <p></p>}
      </div>
    </footer>
  );
}