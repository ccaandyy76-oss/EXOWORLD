import { useMemo, useState } from "react";
import { X } from "lucide-react";
import GlassPanel from "../ui/GlassPanel";
import SurvivalResult from "./SurvivalResult";
import { assess, configs } from "../../data/survivalRules";
import type { ConfigId, Planet } from "../../types/planet";

interface Props { planet: Planet; onClose: () => void }

export default function SurvivalSimulator({ planet, onClose }: Props) {
  const [config, setConfig] = useState<ConfigId>("none");
  // Pure, deterministic rule evaluation: recomputed immediately whenever planet or configuration changes.
  const a = useMemo(() => assess(planet.id, config), [planet.id, config]);

  return (
    <GlassPanel className="exp__drawer exp__drawer--wide">
      <div className="drawer__head">
        <h2 className="exp__h">COULD YOU SURVIVE HERE?</h2>
        <button type="button" className="icon-btn icon-btn--sm" aria-label="Close survival simulator" onClick={onClose}><X size={16} /></button>
      </div>
      <p className="overview__desc">Configure your equipment and discover the environmental challenges of living beyond Earth.</p>
      <p className="overview__note">Assessing: <strong>{planet.name}</strong>{planet.hasSolidSurface ? "" : " (1-bar reference level; no solid surface)"}. Use the planet buttons at the top to change planet.</p>

      <div role="radiogroup" aria-label="Equipment configuration" className="cfgs">
        {configs.map((c) => (
          <button key={c.id} type="button" role="radio" aria-checked={config === c.id} className="cfg" onClick={() => setConfig(c.id)}>
            <span className="cfg__letter">{c.letter}</span>
            <span><strong>{c.label}</strong><span className="cfg__desc">{c.description}</span></span>
          </button>
        ))}
      </div>

      <SurvivalResult a={a} />
    </GlassPanel>
  );
}
