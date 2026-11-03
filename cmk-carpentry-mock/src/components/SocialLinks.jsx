// Add the client's real profile URLs here when he supplies them.
const SOCIALS = [
  {
    name: "Facebook",
    url: "",
    icon: <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />,
  },
  {
    name: "Instagram",
    url: "",
    icon: (
      <>
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </>
    ),
  },
];

function Icon({ children }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {children}
    </svg>
  );
}

// label = true shows the platform name next to the icon.
export default function SocialLinks({ label = false }) {
  return (
    <ul className="socials">
      {SOCIALS.map(({ name, url, icon }) => (
        <li key={name}>
          {url ? (
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`C.M.K Carpentry on ${name}`}
              title={name}
            >
              <Icon>{icon}</Icon>
              {label && <span>{name}</span>}
            </a>
          ) : (
            <span className="placeholder-link" role="img" aria-label={`${name} (link coming soon)`} title={`${name} link coming soon`}>
              <Icon>{icon}</Icon>
              {label && <span>{name}</span>}
            </span>
          )}
        </li>
      ))}
    </ul>
  );
}