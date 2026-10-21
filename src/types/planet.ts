export type PlanetId =
  | "mercury" | "venus" | "earth" | "mars"
  | "jupiter" | "saturn" | "uranus" | "neptune";

export type PlanetType = "Terrestrial" | "Gas giant" | "Ice giant";

export interface Planet {
  id: PlanetId;
  name: string;
  type: PlanetType;
  /** UI / placeholder color (not a scientific measurement) */
  color: string;
  description: string;
  /** Mean radius in kilometers (NASA Planetary Fact Sheet; gas giants use the 1-bar level) */
  radiusKm: number;
  /** Sidereal orbital period in Earth days (rounded) */
  orbitalPeriodDays: number;
  /** Sidereal rotation period in Earth hours (rounded) */
  rotationPeriodHours: number;
  rotationDirection: "prograde" | "retrograde";
  /** Average temperature in °C. See temperatureReference for what it refers to. */
  averageTempC: number;
  temperatureReference: "surface" | "1-bar level";
  /** Gravity in m/s² at the surface, or at the 1-bar level for gas and ice giants */
  gravityMs2: number;
  hasSolidSurface: boolean;
  atmosphere: string;
  water: string;
  environment: string;
  habitability: string;
  /** Short note explaining which values are rounded or reference-level based */
  measurementNote: string;
}

/* ───────── Phase 4: scientific research, survival and habitability ───────── */

/** One displayed environmental reading. `approx` marks rounded, variable or reference-dependent values. */
export interface EnvReading {
  value: string;
  approx: boolean;
  /** Explanation shown in the tooltip / expandable description. */
  detail: string;
}

export interface PlanetEnvironmentData {
  temperature: EnvReading;
  pressure: EnvReading;
  composition: EnvReading;
  conditions: EnvReading;
  /** Solar day (sunrise to sunrise) for planets where that is meaningful. */
  solarDay?: string;
}

/** How well an observation is established. */
export type Evidence = "confirmed" | "interpretation" | "possibility";

export interface EvidenceItem {
  evidence: Evidence;
  text: string;
}

export interface Mission {
  name: string;
  /** Years as published by the agency (e.g. "1976" or "2004–2017"). */
  years: string;
  /** Only "completed" and "ongoing" missions are history. "planned" is never presented as a result. */
  status: "completed" | "ongoing" | "planned";
  agency: string;
  summary: string;
}

export interface PlanetResearch {
  waterEvidence: EvidenceItem[];
  sunlight: string;
  resources: EvidenceItem[];
  uncertainties: string[];
  humanChallenges: string[];
  missions: Mission[];
}

export interface ScientificSource {
  id: string;
  name: string;
  publisher: string;
  url: string;
  /** What this source is used for in the app. */
  usedFor: string;
}

/* Survival rules */

export type HazardId =
  | "pressure" | "oxygen" | "temperature" | "radiation" | "gravity"
  | "water" | "energy" | "food" | "habitat";

/** Equipment configurations A–D. */
export type ConfigId = "none" | "suit" | "habitat" | "base";

/**
 * Educational demand / protection tier (a rule-table value, not a measurement):
 * 0 none · 1 minor · 2 moderate · 3 severe · 4 extreme · 5 beyond demonstrated engineering.
 */
export type Tier = 0 | 1 | 2 | 3 | 4 | 5;

export interface HazardDemand {
  tier: Tier;
  /** Planet-specific explanation of why this tier applies. */
  why: string;
  /** True where the underlying scientific knowledge is limited. */
  uncertain?: boolean;
  /** Optional planet-specific equipment note. */
  equipment?: string;
}

export type StatusKind = "baseline" | "unsafe" | "specialized" | "viable" | "longterm" | "beyond";
