import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import TopNavigation from "./TopNavigation";
import SolarSystemCanvas from "../solar-system/SolarSystemCanvas";
import SolarSystemControls from "../solar-system/SolarSystemControls";
import PlanetOverviewPanel from "../planet/PlanetOverviewPanel";
import PlanetExploration from "../planet/PlanetExploration";
import EntrySequence from "../planet/EntrySequence";
import HabitabilityComparison from "../survival/HabitabilityComparison";
import StatusBadge from "../ui/StatusBadge";
import { planets } from "../../data/planets";
import { SPEEDS } from "../../data/sceneConfig";
import { useSolarSystem } from "../../hooks/useSolarSystem";

export default function MainLayout() {
  const s = useSolarSystem();
  const [comparing, setComparing] = useState(false);
  const selected = planets.find((p) => p.id === s.selectedId) ?? null;
  const inSystem = s.view === "system";

  // Only one WebGL canvas exists at a time: the solar system is unmounted while a planet is explored.
  if (s.view === "environment" && selected) {
    return <PlanetExploration planet={selected} onExit={s.exitPlanet} onSwitch={s.switchPlanet} />;
  }

  return (
    <div className="app">
      <TopNavigation onHabitability={() => setComparing(true)} />

      <main className="hero">
        <div className="scene">
          <SolarSystemCanvas approach={s.view === "entering"} selectedId={s.selectedId} onSelect={s.select} speed={s.paused ? 0 : SPEEDS[s.speedMode]} resetNonce={s.resetNonce} />
        </div>

        {!s.exploring && (
          <div className="hero__copy">
            <h1 className="hero__title">
              YOUR NEXT HOME<br />MAY BE ANOTHER WORLD.
            </h1>
            <p className="hero__text">
              Travel across the solar system. Explore alien environments. Discover the conditions required for life beyond Earth.
            </p>
            <div className="hero__actions">
              <button type="button" className="btn btn--primary" onClick={s.startExploring}>BEGIN EXPLORATION</button>
              <button type="button" className="btn" onClick={() => s.select("mars")}>EXPLORE MARS</button>
            </div>
          </div>
        )}

        {s.exploring && inSystem && (
          <SolarSystemControls
            paused={s.paused}
            speedMode={s.speedMode}
            selectedId={s.selectedId}
            onTogglePause={s.togglePause}
            onSpeed={s.setSpeedMode}
            onReset={s.resetView}
            onSelect={s.select}
          />
        )}

        <AnimatePresence>
          {selected && inSystem && <PlanetOverviewPanel key={selected.id} planet={selected} onBack={s.resetView} onEnter={s.enterPlanet} />}
        </AnimatePresence>

        {comparing && (
          <HabitabilityComparison
            currentId={s.selectedId}
            onClose={() => setComparing(false)}
            onSelect={(id) => { setComparing(false); s.select(id); }}
          />
        )}

        {selected && s.view === "entering" && <EntrySequence planet={selected} step={s.entryStep} />}
      </main>

      <footer className="infobar" aria-label="System information">
        <div className="infobar__item">
          <span className="infobar__label">SOLAR SYSTEM</span>
          <span className="infobar__value">{planets.length} PLANETS</span>
        </div>
        <div className="infobar__item">
          <span className="infobar__label">MODE</span>
          <span className="infobar__value">{s.view === "entering" ? "PLANETARY DESCENT" : s.exploring ? "EXPLORATION MODE" : "INTRO MODE"}</span>
        </div>
        <div className="infobar__item">
          <span className="infobar__label">CURRENT DESTINATION</span>
          <span className="infobar__value">{selected ? selected.name.toUpperCase() : "NONE SELECTED"}</span>
        </div>
        <div className="infobar__item">
          <span className="infobar__label">SYSTEM STATUS</span>
          <StatusBadge text={s.paused ? "SIMULATION PAUSED" : "3D SCENE ONLINE"} color={s.paused ? "#FFB454" : "#64E7FF"} />
        </div>
      </footer>
    </div>
  );
}
