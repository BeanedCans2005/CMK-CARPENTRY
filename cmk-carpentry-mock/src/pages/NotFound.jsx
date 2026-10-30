import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
    useEffect(() => {
        document.title = "Page not found | C.M.K Carpentry Services";
    }, []);

    return (
        <section className="section">
            <h2>Page not found</h2>
            <p className="center"><Link className="btn" to="/">Back to home</Link></p>
        </section>
    );
}