// Add the client's real profile URLs here when they are available.
const SOCIALS = [
    { name: "Facebook", url: "" },
    { name: "Instagram", url: "" },
];

export default function SocialLinks() {
    return (
        <ul className="socials">
            {SOCIALS.map(({ name, url }) => (
                <li key={name}>
                    {url ? (
                        <a href={url} target="_blank" rel="noopener noreferrer" aria-label={`C.M.K Carpentry on ${name}`}>
                            {name}
                        </a>
                    ) : (
                        <span className="placeholder-link" title="Link coming soon">{name}</span>
                    )}
                </li>
            ))}
        </ul>
    );
}