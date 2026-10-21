import { useState } from "react";
import { X } from "lucide-react";
import GlassPanel from "../ui/GlassPanel";
import ScientificSources from "./ScientificSources";
import { planetEnvironment } from "../../data/planets";
import { planetResearch } from "../../data/planetResearch";
import { environments } from "../../data/environments";
import { formatDays, formatHours } from "../../utils/format";
import type { Evidence, Planet } from "../../types/planet";

type Section = "environment" | "water" | "human" | "history";
const sections: { id: Section; label: string }[] = [
  { id: "environment", label: "ENVIRONMENT" },
  { id: "water", label: "WATER & RESOURCES" },
  { id: "human", label: "HUMAN CHALLENGES" },
  { id: "history", label: "EXPLORATION HISTORY" },
];

const evidenceLabel: Record<Evidence, string> = { confirmed: "CONFIRMED", interpretation: "INTERPRETATION", possibility: "FUTURE POSSIBILITY" };
const statusLabel = { completed: "COMPLETED", ongoing: "ONGOING", planned: "PLANNED, NOT FLOWN" } as const;

interface Props { planet: Planet; onClose: () => void }

export default function PlanetResearchPanel({ planet, onClose }: Props) {
  const [section, setSection] = useState<Section>("environment");
  const env = planetEnvironment[planet.id];
  const ext = environments[planet.id];
  const r = planetResearch[planet.id];

  const envRows: [string, string][] = [
    ["Temperature", `${env.temperature.value} (${planet.temperatureReference})`],
    ["Atmospheric composition", env.composition.value],
    ["Pressure", env.pressure.value],
    ["Gravity", `${planet.gravityMs2} m/s² (${(planet.gravityMs2 / 9.8).toFixed(2)}× Earth)`],
    ["Terrain or atmospheric conditions", `${env.conditions.value}. ${planet.environment}`],
    ["Length of day", `Rotation: ${formatHours(planet.rotationPeriodHours)}, ${planet.rotationDirection}${env.solarDay ? `. Solar day: ${env.solarDay}` : ""}`],
    ["Length of year", formatDays(planet.orbitalPeriodDays)],
  ];

  return (
    <GlassPanel className="exp__drawer exp__drawer--wide">
      <div className="drawer__head">
        <h2 className="exp__h">{planet.name.toUpperCase()} RESEARCH</h2>
        <button type="button" className="icon-btn icon-btn--sm" aria-label="Close research panel" onClick={onClose}><X size={16} /></button>
      </div>
      <div className="subtabs" role="tablist" aria-label="Research sections">
        {sections.map((s) => (
          <button key={s.id} type="button" role="tab" className="subtab" aria-selected={section === s.id} onClick={() => setSection(s.id)}>{s.label}</button>
        ))}
      </div>

      {section === "environment" && (
        <dl className="overview__list">
          {envRows.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}
        </dl>
      )}

      {section === "water" && (
        <>
          <h3 className="sub">EVIDENCE FOR WATER</h3>
          <ul className="evlist">{r.waterEvidence.map((e) => <li key={e.text}><span className={`ev ev--${e.evidence}`}>{evidenceLabel[e.evidence]}</span> {e.text}</li>)}</ul>
          <h3 className="sub">SUNLIGHT AVAILABILITY</h3>
          <p className="para">{r.sunlight}</p>
          <h3 className="sub">POTENTIAL LOCAL RESOURCES</h3>
          <ul className="evlist">{r.resources.map((e) => <li key={e.text}><span className={`ev ev--${e.evidence}`}>{evidenceLabel[e.evidence]}</span> {e.text}</li>)}</ul>
          <p className="overview__note">{ext.resources.join(" · ")}</p>
          <h3 className="sub">IMPORTANT UNCERTAINTIES</h3>
          <ul className="exp__list">{r.uncertainties.map((u) => <li key={u}>{u}</li>)}</ul>
        </>
      )}

      {section === "human" && (
        <>
          <ul className="exp__list">{r.humanChallenges.map((c) => <li key={c}>{c}</li>)}</ul>
          <p className="overview__note">Open the survival simulator to see how equipment changes these challenges.</p>
        </>
      )}

      {section === "history" && (
        <>
          <ul className="missions">
            {r.missions.map((m) => (
              <li key={m.name} className={m.status === "planned" ? "mission mission--planned" : "mission"}>
                <div className="mission__top"><strong>{m.name}</strong><span className="mission__years">{m.years}</span></div>
                <span className={`ev ev--${m.status}`}>{statusLabel[m.status]}</span> <span className="mission__agency">{m.agency}</span>
                <p className="para">{m.summary}</p>
              </li>
            ))}
          </ul>
          <p className="overview__note">Planned missions are shown for context only and are not results.</p>
        </>
      )}

      <ScientificSources planetId={planet.id} />
    </GlassPanel>
  );
}
