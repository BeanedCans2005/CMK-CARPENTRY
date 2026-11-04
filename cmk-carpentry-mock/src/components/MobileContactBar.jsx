import { Link } from "react-router-dom";
import PhoneIcon from "./PhoneIcon";
import { SITE, phoneHref } from "../siteInfo";

export default function MobileContactBar() {
    return (
        <div className="mobile-bar">
            {SITE.phone && (
                <a className="btn btn-ghost" href={phoneHref(SITE.phone)}>
                    <PhoneIcon /> Call now
                </a>
            )}
            <Link className="btn" to="/#contact">Get a Free Quote</Link>
        </div>
    );
}