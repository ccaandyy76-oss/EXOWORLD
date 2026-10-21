# EXOWORLD — BEYOND EARTH

Interactive planetary exploration website. Built in five phases; this is **Phase 1** (foundation, architecture, visual design).

## Setup (Windows, VS Code or Cursor)

Requires Node.js 18+ (20 LTS recommended).

```
npm install
npm run dev      # start dev server (http://localhost:5173)
npm run build    # type-check + production build
npm run preview  # serve the production build
```

## Stack
React 18, TypeScript, Vite, Three.js, @react-three/fiber, @react-three/drei, Framer Motion, Lucide React, plain CSS.

## Structure
- `src/data/planets.ts` — all 8 planets (NASA Planetary Fact Sheet values, rounded; gas/ice giants use the 1-bar level).
- `src/types/planet.ts` — planet types.
- `src/components/scene/SolarSystemPlaceholder.tsx` — temporary CSS placeholder, replaced by the Three.js scene in Phase 2.
- `src/components/layout`, `src/components/ui` — shell and reusable components.
- `src/styles` — design tokens, layout, panels.

## Phase 1 status
Controls that are not implemented yet (navigation sections, settings, fullscreen, exploration buttons) are intentionally disabled.
Three.js, drei and fiber are installed but not used until Phase 2.

## Phase 2 — Interactive 3D solar system
- `src/components/solar-system/` — `SolarSystemCanvas` (scene, lights, camera rig), `Sun`, `Planet`, `PlanetaryOrbits`, `StarField`, `PlanetLabels`, `SolarSystemControls`.
- `src/components/planet/PlanetOverviewPanel.tsx` — overview of the selected planet, from `data/planets.ts`.
- `src/data/sceneConfig.ts` — visual-only settings (orbit radii, size and time compression). The scene is **not to scale**.
- `src/utils/textures.ts` — procedural canvas textures (no external files to fail).
- `src/hooks/useSolarSystem.ts` — shared UI state (selection, pause, speed, reset).

Controls: drag to rotate, scroll/pinch to zoom, right-drag to pan (when no planet is selected), click or tap a planet to focus it, **RESET VIEW**, **Esc** or **BACK TO SOLAR SYSTEM** to return. Reduced-motion users get instant camera moves.
ENTER PLANET stays disabled until Phase 3.

## Phase 3 — Planetary exploration
Select a planet, then **ENTER PLANET**: the camera approaches, status labels run, and the environment loads.
- `src/components/environment/` — `PlanetEnvironmentCanvas` (the single canvas while exploring), `SurfaceScene` (shared terrain, sky, sun, rocks, clouds, camera modes), `MarsSurface` (Mars scene + drifting dust), `AtmosphereScene` (orbital view for gas and ice giants).
- `src/components/planet/PlanetExploration.tsx` — HUD (info panel, tabs, planet switcher, fullscreen, hide interface); `EntrySequence.tsx` — entry labels.
- `src/data/environments.ts` — per-planet scene settings and text (radiation, resources, exploration status).
- `src/utils/terrain.ts` — procedural terrain; `src/utils/format.ts` — unit formatting.

Mercury, Venus, Earth and Mars have surface scenes (LOOK AROUND / ORBIT TERRAIN). Jupiter, Saturn, Uranus and Neptune have no solid surface, so they get an orbital view only. Esc steps back. HUMAN SURVIVAL shows "COMING IN PHASE 4".

## Phase 4 — Scientific research, survival simulator and habitability
- `src/data/planets.ts` — planet facts plus `planetEnvironment` (temperature, pressure, composition, conditions; rounded values flagged APPROX.).
- `src/data/planetResearch.ts` — water evidence, resources, uncertainties, human challenges and missions for all eight planets. Each statement is tagged CONFIRMED, INTERPRETATION or FUTURE POSSIBILITY; planned missions are labeled as not flown.
- `src/data/survivalRules.ts` — centralized, deterministic rule table (no randomness): hazard demand tiers per planet, protection tiers for configurations A–D, `assess()`, status labels and the illustrative challenge index.
- `src/data/scientificSources.ts` — NASA/ESA sources shown in the app.
- `src/components/planet/EnvironmentPanel.tsx`, `PlanetResearchPanel.tsx`, `ScientificSources.tsx`
- `src/components/survival/SurvivalSimulator.tsx`, `SurvivalResult.tsx`, `HabitabilityComparison.tsx`

Where to find it: enter a planet, then use the bottom tabs ENVIRONMENT / RESEARCH / HUMAN SURVIVAL / HABITABILITY (click an open tab again to close it). The HABITABILITY link in the top navigation opens the same comparison from the solar system view; clicking a planet there opens its overview.

Limitations: tiers are simplified educational rule values, not measurements or medical thresholds. The simulator never gives survival times or probabilities. The challenge index is a custom visualization, not an accepted scientific habitability metric. Verify mission status (Juno, BepiColombo, planned missions) on the linked NASA/ESA pages.
