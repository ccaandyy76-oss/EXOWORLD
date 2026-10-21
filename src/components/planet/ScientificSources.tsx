import { allSources, scientificSources, sourceNote, sourcesByPlanet } from "../../data/scientificSources";
import type { PlanetId } from "../../types/planet";

export default function ScientificSources({ planetId }: { planetId?: PlanetId }) {
  const list = planetId ? sourcesByPlanet[planetId].map((id) => scientificSources[id]) : allSources;
  return (
    <section className="sources" aria-label="Scientific sources">
      <h3 className="sub">SCIENTIFIC SOURCES</h3>
      <p className="overview__note">{sourceNote}</p>
      <ul className="sources__list">
        {list.map((s) => (
          <li key={s.id}>
            <a href={s.url} target="_blank" rel="noreferrer noopener">{s.publisher}: {s.name}</a>
            <span> {s.usedFor}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
