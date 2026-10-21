import { motion } from "framer-motion";
import GlassPanel from "../ui/GlassPanel";
import type { Planet } from "../../types/planet";

const formatPeriod = (days: number) =>
  days > 730 ? `${days.toLocaleString("en-US")} Earth days (about ${(days / 365.25).toFixed(1)} years)` : `${days} Earth days`;

interface Props {
  planet: Planet;
  onBack: () => void;
  onEnter: () => void;
}

export default function PlanetOverviewPanel({ planet, onBack, onEnter }: Props) {
  const rows: [string, string][] = [
    ["Average temperature", `${planet.averageTempC} °C (${planet.temperatureReference})`],
    ["Gravity", `${planet.gravityMs2} m/s² (${planet.hasSolidSurface ? "surface" : "1-bar level"})`],
    ["Atmosphere", planet.atmosphere],
    ["Orbital period", formatPeriod(planet.orbitalPeriodDays)],
    ["Water", planet.water],
    ["Habitability", planet.habitability],
  ];

  return (
    <motion.aside
      className="overview"
      aria-label={`${planet.name} overview`}
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 24 }}
      transition={{ duration: 0.35 }}
    >
      <GlassPanel className="overview__panel">
        <p className="overview__type">{planet.type.toUpperCase()}</p>
        <h2 className="overview__name">{planet.name}</h2>
        <p className="overview__desc">{planet.description}</p>
        <dl className="overview__list">
          {rows.map(([k, v]) => (
            <div key={k}>
              <dt>{k}</dt>
              <dd>{v}</dd>
            </div>
          ))}
        </dl>
        <p className="overview__note">Values are rounded. {planet.measurementNote}</p>
        <div className="overview__actions">
          <button type="button" className="btn btn--primary" onClick={onEnter}>ENTER PLANET</button>
          <button type="button" className="btn" onClick={onBack}>BACK TO SOLAR SYSTEM</button>
        </div>
      </GlassPanel>
    </motion.aside>
  );
}
