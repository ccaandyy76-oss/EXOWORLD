import { useState } from "react";
import { ChevronDown } from "lucide-react";
import GlassPanel from "../ui/GlassPanel";
import { planetEnvironment } from "../../data/planets";
import { environments } from "../../data/environments";
import type { Planet } from "../../types/planet";

interface Row { key: string; label: string; value: string; approx: boolean; detail: string }

/** Environmental HUD. All values come from centralized planet data. */
export default function EnvironmentPanel({ planet }: { planet: Planet }) {
  const [open, setOpen] = useState<string | null>(null);
  const env = planetEnvironment[planet.id];
  const ext = environments[planet.id];
  const ref = planet.hasSolidSurface ? "surface" : "1-bar level";
  const ratio = (planet.gravityMs2 / 9.8).toFixed(2);

  const rows: Row[] = [
    { key: "temp", label: "Temperature", ...env.temperature },
    { key: "press", label: "Pressure", ...env.pressure },
    { key: "comp", label: "Atmosphere", ...env.composition },
    { key: "grav", label: "Gravity", value: `${planet.gravityMs2} m/s² (${ratio}× Earth), ${ref}`, approx: true, detail: planet.hasSolidSurface ? "Gravitational acceleration at the surface." : "Gravity at the 1-bar level. There is no solid surface, so gravity changes with altitude and depth." },
    { key: "rad", label: "Radiation", value: ext.radiation, approx: true, detail: "Qualitative summary of radiation exposure from the Sun, cosmic rays and planetary radiation belts. Actual exposure depends on altitude, shielding and solar activity." },
    { key: "water", label: "Water", value: planet.water, approx: false, detail: "See the research panel for which statements are confirmed observations and which are interpretations." },
    { key: "cond", label: "Conditions", ...env.conditions },
  ];

  return (
    <GlassPanel className="exp__left">
      {!planet.hasSolidSurface && <p className="exp__notice">NO SOLID SURFACE. Values refer to the 1-bar level.</p>}
      <dl className="envrows">
        {rows.map((r) => {
          const isOpen = open === r.key;
          return (
            <div key={r.key} className="envrow">
              <dt>{r.label}{r.approx && <span className="approx" title="Approximate: rounded, variable, or dependent on reference conditions">APPROX.</span>}</dt>
              <dd>
                <button type="button" className="envrow__btn" aria-expanded={isOpen} title={r.detail} onClick={() => setOpen(isOpen ? null : r.key)}>
                  <span>{r.value}</span>
                  <ChevronDown size={14} className={isOpen ? "chev chev--open" : "chev"} aria-hidden />
                </button>
                {isOpen && <p className="envrow__detail">{r.detail}</p>}
              </dd>
            </div>
          );
        })}
      </dl>
      <p className="overview__note">{ext.caption}</p>
    </GlassPanel>
  );
}
