import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, Eye, EyeOff, Maximize, Minimize } from "lucide-react";
import EnvironmentPanel from "./EnvironmentPanel";
import PlanetResearchPanel from "./PlanetResearchPanel";
import SurvivalSimulator from "../survival/SurvivalSimulator";
import HabitabilityComparison from "../survival/HabitabilityComparison";
import PlanetEnvironmentCanvas from "../environment/PlanetEnvironmentCanvas";
import IconButton from "../ui/IconButton";
import { planets } from "../../data/planets";
import { environments, type LookMode } from "../../data/environments";
import type { Planet, PlanetId } from "../../types/planet";

type Tab = "environment" | "research" | "survival" | "compare";
const tabs: { id: Tab; label: string }[] = [
  { id: "environment", label: "ENVIRONMENT" },
  { id: "research", label: "RESEARCH" },
  { id: "survival", label: "HUMAN SURVIVAL" },
  { id: "compare", label: "HABITABILITY" },
];

interface Props {
  planet: Planet;
  onExit: () => void;
  onSwitch: (id: PlanetId) => void;
}

export default function PlanetExploration({ planet, onExit, onSwitch }: Props) {
  const env = environments[planet.id];
  const isSurface = !!env.surface;
  const [hud, setHud] = useState(true);
  const [tab, setTab] = useState<Tab>("environment");
  const [look, setLook] = useState<LookMode>("surface");
  const [fullscreen, setFullscreen] = useState(false);
  const [synced, setSynced] = useState(true);

  useEffect(() => {
    const onChange = () => setFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, []);

  // Show "environmental data synchronized" briefly after arriving at or switching to a planet.
  useEffect(() => {
    setSynced(true);
    const id = window.setTimeout(() => setSynced(false), 3000);
    return () => window.clearTimeout(id);
  }, [planet.id]);

  const toggleFullscreen = () => {
    if (document.fullscreenElement) void document.exitFullscreen();
    else void document.documentElement.requestFullscreen().catch(() => undefined);
  };

  return (
    <motion.div className="exp" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
      <div className="exp__canvas"><PlanetEnvironmentCanvas planet={planet} look={look} /></div>

      <div className="exp__hud">
        <div className="exp__tr">
          <IconButton label="Return to solar system" onClick={onExit}><ArrowLeft size={18} /></IconButton>
          <IconButton label={fullscreen ? "Exit fullscreen" : "Fullscreen"} onClick={toggleFullscreen} disabled={!document.fullscreenEnabled}>
            {fullscreen ? <Minimize size={18} /> : <Maximize size={18} />}
          </IconButton>
          <IconButton label={hud ? "Hide interface" : "Show interface"} onClick={() => setHud((h) => !h)}>
            {hud ? <EyeOff size={18} /> : <Eye size={18} />}
          </IconButton>
        </div>

        {hud && (
          <>
            <div className="exp__tl">
              <span className="brand__name">EXOWORLD</span>
              <strong className="exp__planet">{planet.name.toUpperCase()}</strong>
              <span className="brand__tag">{env.modeLabel}</span>
            </div>

            <div className="exp__switch" role="group" aria-label="Switch planet">
              {planets.map((p) => (
                <button key={p.id} type="button" className="chip" aria-pressed={p.id === planet.id} onClick={() => onSwitch(p.id)} title={p.name}>
                  <span className="chip__dot" style={{ background: p.color }} />
                  <span className="exp__chiplabel">{p.name}</span>
                </button>
              ))}
            </div>

            <EnvironmentPanel planet={planet} />

            {tab === "research" && <PlanetResearchPanel planet={planet} onClose={() => setTab("environment")} />}
            {tab === "survival" && <SurvivalSimulator planet={planet} onClose={() => setTab("environment")} />}
            {tab === "compare" && (
              <HabitabilityComparison
                currentId={planet.id}
                onClose={() => setTab("environment")}
                onSelect={(id) => { onSwitch(id); setTab("environment"); }}
              />
            )}

            {isSurface && (
              <div className="exp__modes" role="group" aria-label="Camera mode">
                <button type="button" className="chip" aria-pressed={look === "surface"} onClick={() => setLook("surface")}>LOOK AROUND</button>
                <button type="button" className="chip" aria-pressed={look === "overview"} onClick={() => setLook("overview")}>ORBIT TERRAIN</button>
              </div>
            )}

            <nav className="exp__nav glass" role="tablist" aria-label="Exploration sections">
              {tabs.map((t) => (
                <button key={t.id} type="button" role="tab" aria-selected={tab === t.id} className="exp__tab" onClick={() => setTab(tab === t.id && t.id !== "environment" ? "environment" : t.id)}>{t.label}</button>
              ))}
            </nav>
          </>
        )}

        <AnimatePresence>
          {synced && (
            <motion.p className="exp__banner" initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} role="status">
              ENVIRONMENTAL DATA SYNCHRONIZED
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
