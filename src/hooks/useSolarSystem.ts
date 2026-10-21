import { useCallback, useEffect, useState } from "react";
import type { PlanetId } from "../types/planet";
import type { SpeedMode } from "../data/sceneConfig";

export type View = "system" | "entering" | "environment";

/** All shared state for the solar system and planet exploration views. */
export function useSolarSystem() {
  const [view, setView] = useState<View>("system");
  const [entryStep, setEntryStep] = useState(0);
  const [exploring, setExploring] = useState(false);
  const [selectedId, setSelectedId] = useState<PlanetId | null>(null);
  const [paused, setPaused] = useState(false);
  const [speedMode, setSpeedMode] = useState<SpeedMode>("normal");
  const [resetNonce, setResetNonce] = useState(0);

  const startExploring = useCallback(() => setExploring(true), []);
  const select = useCallback((id: PlanetId) => {
    setExploring(true);
    setSelectedId(id);
  }, []);
  const resetView = useCallback(() => {
    setSelectedId(null);
    setResetNonce((n) => n + 1);
  }, []);
  const togglePause = useCallback(() => setPaused((p) => !p), []);

  const enterPlanet = useCallback(() => {
    setEntryStep(0);
    setView("entering");
  }, []);
  const exitPlanet = useCallback(() => setView("system"), []);

  // Entry sequence: the camera flies in (Three.js), status labels change (Framer Motion), then the environment loads.
  useEffect(() => {
    if (view !== "entering") return;
    const unit = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 400 : 1500;
    const t1 = window.setTimeout(() => setEntryStep(1), unit);
    const t2 = window.setTimeout(() => setView("environment"), unit * 2);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [view]);

  // Escape steps back one level.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (view !== "system") exitPlanet();
      else if (selectedId) resetView();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [view, selectedId, exitPlanet, resetView]);

  return { view, entryStep, enterPlanet, exitPlanet, exploring, startExploring, selectedId, select, switchPlanet: select, resetView, paused, togglePause, speedMode, setSpeedMode, resetNonce };
}
