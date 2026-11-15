const areas = {
  "North-east": [
    "Eltham", "Research", "Diamond Creek", "Greensborough", "Warrandyte",
    "Templestowe", "Doncaster", "Bulleen",
  ],
  "North": [
    "Ivanhoe", "Heidelberg", "Rosanna", "Macleod", "Bundoora", "Mill Park",
    "South Morang", "Mernda", "Whittlesea", "Epping",
  ],
  "Inner north": ["Thornbury", "Northcote", "Carlton", "Fitzroy"],
  "East": [
    "Kew", "Balwyn", "Box Hill", "Blackburn", "Ringwood", "Croydon", "Lilydale",
  ],
};

export default function ServiceAreas() {
  return (
    <section className="areas" aria-labelledby="areas-title">
      <div className="areas-inner">
        <h2 id="areas-title">Areas we work in</h2>
        <p className="areas-intro">
          Based in Melbourne's northern and eastern suburbs. Don't see yours?
          Get in touch, as we may still be able to help.
        </p>
        <div className="areas-grid">
          {Object.entries(areas).map(([region, suburbs]) => (
            <div className="areas-group" key={region}>
              <h3>{region}</h3>
              <ul>
                {suburbs.map((s) => <li key={s}>{s}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}