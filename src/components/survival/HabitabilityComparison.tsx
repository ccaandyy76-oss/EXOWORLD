import { X } from "lucide-react";
import ScientificSources from "../planet/ScientificSources";
import { planets, planetEnvironment } from "../../data/planets";
import { challengeIndex, challengeIndexMethod, getDemand, habitatFeasibility, statusInfo } from "../../data/survivalRules";
import type { Planet, PlanetId, Tier } from "../../types/planet";

const TMIN = -210, TMAX = 470;
const pct = (t: number) => `${Math.max(0, Math.min(100, ((t - TMIN) / (TMAX - TMIN)) * 100))}%`;
const tierWord = (t: Tier) => ["None", "Minor", "Moderate", "Severe", "Extreme", "Beyond engineering"][t];
const tierColor = ["#5BE3A0", "#8FD9A8", "#FFB454", "#FF9A54", "#FF5D73", "#C26BFF"];

function Pill({ t, label }: { t: Tier; label?: string }) {
  return <span className="pill" style={{ borderColor: tierColor[t], color: tierColor[t] }}>{label ?? tierWord(t)}</span>;
}

interface Props { onSelect: (id: PlanetId) => void; onClose: () => void; currentId?: PlanetId | null }

export default function HabitabilityComparison({ onSelect, onClose, currentId }: Props) {
  const row = (p: Planet) => {
    const env = planetEnvironment[p.id];
    const idx = challengeIndex(p.id);
    const hab = habitatFeasibility(p.id);
    const support = Math.max(getDemand(p.id, "pressure").tier, getDemand(p.id, "oxygen").tier, getDemand(p.id, "temperature").tier) as Tier;
    const ratio = p.gravityMs2 / 9.8;
    return (
      <tr key={p.id} className={p.id === currentId ? "cmp__current" : undefined}>
        <th scope="row">
          <button type="button" className="cmp__planet" onClick={() => onSelect(p.id)} aria-label={`Open ${p.name} overview`}>
            <span className="chip__dot" style={{ background: p.color }} />{p.name}
          </button>
        </th>
        <td>
          <div className="scale" title={`${p.averageTempC} °C (${p.temperatureReference})`}>
            <span className="scale__zero" style={{ left: pct(0) }} />
            <span className="scale__mark" style={{ left: pct(p.averageTempC) }} />
          </div>
          <small>{p.averageTempC} °C <em>({p.temperatureReference}, approx.)</em></small>
        </td>
        <td>
          <div className="bar"><span style={{ width: `${Math.min(100, (ratio / 2.6) * 100)}%` }} /></div>
          <small>{p.gravityMs2} m/s² · {ratio.toFixed(2)}× Earth</small>
        </td>
        <td><small>{env.pressure.value}</small></td>
        <td><Pill t={getDemand(p.id, "radiation").tier} />{getDemand(p.id, "radiation").uncertain && <small> limited data</small>}</td>
        <td><Pill t={getDemand(p.id, "water").tier} /></td>
        <td>{p.hasSolidSurface ? <Pill t={getDemand(p.id, "habitat").tier} label={getDemand(p.id, "habitat").tier === 0 ? "Easy" : "Solid surface"} /> : <Pill t={5} label="No solid surface" />}</td>
        <td><Pill t={support} label={support === 0 ? "None" : `Tier ${support}`} /></td>
        <td><span className="pill" style={{ borderColor: statusInfo[hab.status].color, color: statusInfo[hab.status].color }}>{hab.label}</span></td>
        <td>
          <div className="bar bar--idx"><span style={{ width: `${idx}%` }} /></div>
          <small>{idx}/100</small>
        </td>
      </tr>
    );
  };

  return (
    <div className="cmp" role="dialog" aria-label="Habitability comparison">
      <div className="cmp__panel glass">
        <div className="drawer__head">
          <h2 className="exp__h">HABITABILITY COMPARISON</h2>
          <button type="button" className="icon-btn icon-btn--sm" aria-label="Close comparison" onClick={onClose}><X size={16} /></button>
        </div>
        <p className="overview__desc">Select a planet to open its overview. Temperatures on giant planets are at the 1-bar level.</p>
        <div className="cmp__scroll">
          <table className="cmp__table">
            <thead>
              <tr>
                <th>Planet</th><th>Temperature</th><th>Gravity</th><th>Atmospheric pressure</th><th>Radiation</th>
                <th>Water availability</th><th>Surface accessibility</th><th>Life-support need</th><th>Protected habitat feasibility</th><th>Challenge index*</th>
              </tr>
            </thead>
            <tbody>{planets.map(row)}</tbody>
          </table>
        </div>
        <p className="overview__note">Temperature bar spans about -210 °C to 470 °C; the tick marks 0 °C. Gravity bar is relative to about 2.6× Earth. Habitat feasibility assumes a fully equipped research base (configuration D). Life-support need is the highest of the pressure, oxygen and temperature tiers.</p>
        <p className="overview__note">* {challengeIndexMethod}</p>
        <ScientificSources />
      </div>
    </div>
  );
}
