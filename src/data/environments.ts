import type { PlanetId } from "../types/planet";

export type LookMode = "surface" | "overview";

/** Visual settings for a walkable-surface scene. Educational visualization, not a real location. */
export interface SurfaceConfig {
  seed: number;
  skyTop: string; skyHorizon: string; fog: string; fogDensity: number;
  ground: [string, string]; rock: string;
  sunColor: string; sunDir: [number, number, number]; sunSize: number; sunIntensity: number;
  ambient: number; relief: number; mountains: number; craters: number; rocks: number;
  sea?: boolean; stars?: boolean;
  clouds?: { count: number; color: string; opacity: number; height: number };
}

export interface EnvironmentInfo {
  /** Present only for planets with a solid surface. Gas and ice giants get an orbital view instead. */
  surface?: SurfaceConfig;
  modeLabel: string;
  caption: string;
  radiation: string;
  resources: string[];
  humanStatus: string;
  dayNote?: string;
}

const giantCaption = "No solid surface exists here, so there is nothing to walk on. This is an orbital view of the cloud tops. Temperature and gravity are measured at the 1-bar pressure level.";

export const environments: Record<PlanetId, EnvironmentInfo> = {
  mercury: {
    surface: { seed: 5, skyTop: "#000000", skyHorizon: "#05060a", fog: "#05060a", fogDensity: 0.0015, ground: ["#4a4744", "#8d8884"], rock: "#3a3836", sunColor: "#fff7e6", sunDir: [-0.8, 0.14, -0.55], sunSize: 36, sunIntensity: 6, ambient: 0.04, relief: 0.8, mountains: 0.7, craters: 46, rocks: 120, stars: true },
    modeLabel: "SURFACE EXPLORATION",
    caption: "Airless, heavily cratered terrain with harsh light and deep shadow. Visualization inspired by Mercury, not an exact location.",
    radiation: "Extreme: almost no atmosphere and only a weak magnetic field leave the surface exposed to solar radiation.",
    resources: ["Abundant solar energy", "Water ice in permanently shadowed polar craters", "Metal-rich rock"],
    humanStatus: "No humans have visited. Robotic missions include Mariner 10 and MESSENGER.",
    dayNote: "One solar day (sunrise to sunrise) lasts about 176 Earth days.",
  },
  venus: {
    surface: { seed: 8, skyTop: "#a8641f", skyHorizon: "#e0a24a", fog: "#d9983f", fogDensity: 0.03, ground: ["#5a3a22", "#8a5a30"], rock: "#3d281a", sunColor: "#ffc070", sunDir: [0, 0.6, -0.8], sunSize: 0, sunIntensity: 1.6, ambient: 0.9, relief: 1.2, mountains: 1.2, craters: 5, rocks: 110, clouds: { count: 16, color: "#f0b45a", opacity: 0.55, height: 35 } },
    modeLabel: "SURFACE EXPLORATION",
    caption: "A dim, hazy, oppressive landscape under thick clouds. The real surface is far hotter and under much higher pressure than this view suggests.",
    radiation: "Moderate at the surface: the thick atmosphere blocks most radiation, but heat and pressure are lethal.",
    resources: ["Carbon dioxide atmosphere", "Abundant solar energy at cloud-top altitudes"],
    humanStatus: "No humans have visited. Soviet Venera landers survived only briefly on the surface; Magellan mapped it from orbit.",
    dayNote: "One solar day lasts about 117 Earth days; the Sun rises in the west.",
  },
  earth: {
    surface: { seed: 11, skyTop: "#3b78d8", skyHorizon: "#bfe0ff", fog: "#a9d0f5", fogDensity: 0.006, ground: ["#3f7a45", "#6b8f4a"], rock: "#6a6a66", sunColor: "#fff4dc", sunDir: [-0.5, 0.55, -0.65], sunSize: 14, sunIntensity: 3.2, ambient: 0.8, relief: 2, mountains: 1.1, craters: 0, rocks: 30, sea: true, clouds: { count: 18, color: "#ffffff", opacity: 0.8, height: 55 } },
    modeLabel: "SURFACE EXPLORATION",
    caption: "Blue sky, clouds, ocean and green land: the benchmark for habitability. A generic landscape, not a specific place.",
    radiation: "Low: the magnetic field and atmosphere shield the surface.",
    resources: ["Liquid water", "Breathable air", "Fertile soil and minerals", "Abundant energy sources"],
    humanStatus: "Home to humanity. People have lived continuously in low Earth orbit aboard the International Space Station.",
  },
  mars: {
    surface: { seed: 3, skyTop: "#8a5a44", skyHorizon: "#d9a27f", fog: "#c98f6c", fogDensity: 0.011, ground: ["#8c4a2f", "#b0653f"], rock: "#5e3626", sunColor: "#ffe9d0", sunDir: [-0.6, 0.28, -0.75], sunSize: 18, sunIntensity: 3, ambient: 0.55, relief: 1, mountains: 1, craters: 14, rocks: 160 },
    modeLabel: "SURFACE EXPLORATION",
    caption: "Rust-red terrain, craters, rocks, distant ridges and a dusty sky. An educational visualization inspired by Mars, not an exact location.",
    radiation: "High: the thin atmosphere and lack of a global magnetic field leave the surface far more exposed than on Earth.",
    resources: ["Water ice at the poles and underground", "Carbon dioxide atmosphere (usable for oxygen and fuel)", "Regolith for construction", "Solar energy"],
    humanStatus: "No humans have visited. Robotic landers and rovers include Viking, Curiosity and Perseverance.",
    dayNote: "A Martian solar day (a sol) lasts about 24 h 39 min.",
  },
  jupiter: {
    modeLabel: "ORBITAL VIEW", caption: giantCaption,
    radiation: "Extreme: intense radiation belts surround the planet.",
    resources: ["Hydrogen and helium atmosphere (theoretical only)", "No accessible surface resources"],
    humanStatus: "No humans have visited. Robotic flybys and orbiters include Galileo and Juno.",
  },
  saturn: {
    modeLabel: "ORBITAL VIEW", caption: giantCaption + " The rings are made mostly of water ice particles.",
    radiation: "Significant radiation belts exist near the planet, weaker than Jupiter's.",
    resources: ["Hydrogen and helium atmosphere (theoretical only)", "Water ice in the rings"],
    humanStatus: "No humans have visited. The Cassini orbiter studied Saturn from 2004 to 2017.",
  },
  uranus: {
    modeLabel: "ORBITAL VIEW", caption: giantCaption + " Uranus is tilted about 98°, so it spins on its side.",
    radiation: "Radiation belts exist, but knowledge is limited: only Voyager 2 has visited (1986).",
    resources: ["Hydrogen, helium and methane (theoretical only)"],
    humanStatus: "No humans have visited. Voyager 2 made the only flyby, in 1986.",
  },
  neptune: {
    modeLabel: "ORBITAL VIEW", caption: giantCaption,
    radiation: "Radiation belts exist, but knowledge is limited: only Voyager 2 has visited (1989).",
    resources: ["Hydrogen, helium and methane (theoretical only)"],
    humanStatus: "No humans have visited. Voyager 2 made the only flyby, in 1989.",
  },
};
