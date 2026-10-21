import { planets } from "./planets";
import type { ConfigId, HazardDemand, HazardId, PlanetId, StatusKind, Tier } from "../types/planet";

/**
 * Centralized, deterministic rule table for the educational survival assessment.
 * Tiers are rule-table values for comparison, NOT measurements and NOT medical thresholds:
 *   0 none · 1 minor · 2 moderate · 3 severe · 4 extreme · 5 beyond demonstrated engineering.
 * No randomness is used anywhere. The same planet + configuration always gives the same result.
 */

export const hazardOrder: HazardId[] = ["pressure", "oxygen", "temperature", "radiation", "gravity", "water", "energy", "food", "habitat"];

export const hazardInfo: Record<HazardId, { label: string; equipment: string; lifeCritical: boolean }> = {
  pressure: { label: "Atmospheric pressure", equipment: "Pressurized suit or habitat shell that holds internal pressure", lifeCritical: true },
  oxygen: { label: "Breathable oxygen", equipment: "Breathable-air supply with carbon dioxide removal", lifeCritical: true },
  temperature: { label: "Temperature", equipment: "Thermal control: insulation, heating or cooling", lifeCritical: true },
  radiation: { label: "Radiation", equipment: "Radiation shielding and exposure monitoring", lifeCritical: false },
  gravity: { label: "Gravity", equipment: "Exercise and medical countermeasures (gravity itself cannot be changed)", lifeCritical: false },
  water: { label: "Water access", equipment: "Water source, recycling and purification", lifeCritical: false },
  energy: { label: "Energy availability", equipment: "Power generation and storage", lifeCritical: false },
  food: { label: "Food production", equipment: "Stored food and closed-loop food production", lifeCritical: false },
  habitat: { label: "Habitat requirements", equipment: "Pressurized, shielded habitat structure with maintenance and resupply", lifeCritical: true },
};

export interface ConfigInfo {
  id: ConfigId;
  letter: string;
  label: string;
  description: string;
  /** Protection tier this equipment can provide for each hazard. Never above 4: no tier-5 system has been demonstrated. */
  capability: Record<HazardId, Tier>;
}

export const configs: ConfigInfo[] = [
  { id: "none", letter: "A", label: "No protective equipment", description: "You have no specialized protection.",
    capability: { pressure: 0, oxygen: 0, temperature: 0, radiation: 0, gravity: 0, water: 0, energy: 0, food: 0, habitat: 0 } },
  { id: "suit", letter: "B", label: "Spacesuit", description: "A suitable spacesuit and life-support system for the scenario being assessed. Limited-duration protection, not a place to live.",
    capability: { pressure: 3, oxygen: 3, temperature: 3, radiation: 1, gravity: 0, water: 1, energy: 1, food: 0, habitat: 0 } },
  { id: "habitat", letter: "C", label: "Pressurized habitat", description: "Inside a suitable pressurized habitat with environmental controls.",
    capability: { pressure: 4, oxygen: 4, temperature: 3, radiation: 2, gravity: 0, water: 2, energy: 2, food: 2, habitat: 3 } },
  { id: "base", letter: "D", label: "Fully equipped research base", description: "Habitat, life support, radiation mitigation, power and additional support infrastructure.",
    capability: { pressure: 4, oxygen: 4, temperature: 4, radiation: 3, gravity: 1, water: 3, energy: 3, food: 3, habitat: 4 } },
];

export const configById = Object.fromEntries(configs.map((c) => [c.id, c])) as Record<ConfigId, ConfigInfo>;

const h = (tier: Tier, why: string, extra: Partial<HazardDemand> = {}): HazardDemand => ({ tier, why, ...extra });

type Demands = Record<Exclude<HazardId, "gravity">, HazardDemand>;

/** Planet-specific hazard demand tiers with the reason for each. Gravity is derived from planet data. */
const demands: Record<PlanetId, Demands> = {
  mercury: {
    pressure: h(3, "Essentially no atmosphere: an unprotected human would be exposed to near-vacuum."),
    oxygen: h(3, "No breathable atmosphere, only a trace exosphere."),
    temperature: h(4, "Surface swings from about -180 °C at night to about 430 °C by day, and one solar day lasts about 176 Earth days."),
    radiation: h(4, "No substantial atmosphere and only a weak magnetic field, close to the Sun."),
    water: h(3, "No liquid water. Polar ice is thought to exist in permanently shadowed craters but has not been sampled."),
    energy: h(2, "Solar energy is abundant, but the very long day and night cycle requires storage or careful site choice."),
    food: h(4, "No soil, water or atmosphere to support agriculture; food would need fully enclosed, resource-intensive production."),
    habitat: h(4, "A solid surface can host structures, but extreme thermal cycling, radiation and distance make habitats very demanding."),
  },
  venus: {
    pressure: h(5, "Surface pressure is about 92 times Earth's, beyond any demonstrated crewed system.", { equipment: "Pressure vessel able to withstand about 92 bar outside (none demonstrated for crews)" }),
    oxygen: h(3, "The atmosphere is mostly carbon dioxide with sulfuric acid clouds."),
    temperature: h(5, "The surface is about 464 °C, hot enough to melt lead.", { equipment: "Active cooling far beyond demonstrated crewed systems" }),
    radiation: h(1, "The thick atmosphere blocks most radiation at the surface."),
    water: h(4, "No surface water and only trace vapor in the atmosphere."),
    energy: h(3, "Thick clouds reduce sunlight at the surface, and heat damages most hardware."),
    food: h(4, "No soil or water, and a hostile environment; food would need to be produced or delivered."),
    habitat: h(5, "Landers have operated only briefly (Venera 13 about two hours). Sustained surface structures have not been demonstrated.", { equipment: "None demonstrated. Floating cloud-layer habitats are theoretical concepts only." }),
  },
  earth: {
    pressure: h(0, "Sea-level pressure supports unaided breathing (high altitude is an exception)."),
    oxygen: h(0, "About 21% oxygen. Not available underwater, in smoke or at high altitude."),
    temperature: h(0, "Mean about 15 °C. Extreme heat and cold exist in some regions and seasons, so clothing and shelter still matter."),
    radiation: h(0, "The magnetic field and atmosphere shield the surface."),
    water: h(0, "Abundant liquid water, though not everywhere."),
    energy: h(0, "Many energy sources are available."),
    food: h(0, "Agriculture is established, though local conditions vary."),
    habitat: h(0, "Humans live in many climates on Earth, though disasters and weather can still be hazardous."),
  },
  mars: {
    pressure: h(3, "Surface pressure is under 1% of Earth's, far too low for an unprotected human."),
    oxygen: h(3, "The atmosphere is mostly carbon dioxide, with well under 1% oxygen."),
    temperature: h(3, "Mean about -65 °C, ranging roughly from -140 °C to 20 °C."),
    radiation: h(3, "A thin atmosphere and no global magnetic field expose the surface to more radiation than on Earth."),
    water: h(2, "Ice is confirmed at the poles and underground, but extraction and purification at scale are undemonstrated."),
    energy: h(2, "Sunlight is available but weaker than at Earth, and dust storms can reduce it substantially."),
    food: h(3, "Soil contains perchlorates (detected by Phoenix), so growing food needs controlled, treated systems."),
    habitat: h(3, "A solid surface allows construction, but pressure vessels, shielding and dust management are needed."),
  },
  jupiter: {
    pressure: h(2, "The 1-bar reference level is similar to Earth sea level, but pressure rises rapidly with depth and there is no surface."),
    oxygen: h(3, "Hydrogen and helium atmosphere; not breathable."),
    temperature: h(3, "About -110 °C at the 1-bar level."),
    radiation: h(4, "Intense radiation belts surround the planet.", { uncertain: false }),
    water: h(4, "Only vapor and deeper clouds; no accessible source."),
    energy: h(3, "Sunlight is much weaker than at Earth."),
    food: h(4, "Nothing to grow food in or on."),
    habitat: h(5, "There is no solid surface. Any structure would have to float in the atmosphere, which has not been demonstrated.", { equipment: "None demonstrated. Atmospheric habitat concepts are theoretical." }),
  },
  saturn: {
    pressure: h(2, "The 1-bar reference level is similar to Earth sea level, but pressure rises rapidly with depth and there is no surface."),
    oxygen: h(3, "Hydrogen and helium atmosphere; not breathable."),
    temperature: h(4, "About -140 °C at the 1-bar level."),
    radiation: h(3, "Significant radiation belts exist, weaker than Jupiter's."),
    water: h(4, "Ring ice exists, but it is far from any accessible location and not on the planet."),
    energy: h(4, "Sunlight is very weak at this distance."),
    food: h(4, "Nothing to grow food in or on."),
    habitat: h(5, "There is no solid surface. Any structure would have to float in the atmosphere, which has not been demonstrated.", { equipment: "None demonstrated. Atmospheric habitat concepts are theoretical." }),
  },
  uranus: {
    pressure: h(2, "The 1-bar reference level is similar to Earth sea level, but pressure rises rapidly with depth and there is no surface."),
    oxygen: h(3, "Hydrogen, helium and methane atmosphere; not breathable."),
    temperature: h(4, "About -195 °C at the 1-bar level."),
    radiation: h(3, "Radiation belts exist, but only one flyby (Voyager 2, 1986) has measured them.", { uncertain: true }),
    water: h(4, "Water is inferred deep in the interior and is not accessible."),
    energy: h(4, "Sunlight is extremely weak at this distance."),
    food: h(4, "Nothing to grow food in or on."),
    habitat: h(5, "There is no solid surface. Any structure would have to float in the atmosphere, which has not been demonstrated.", { equipment: "None demonstrated. Atmospheric habitat concepts are theoretical." }),
  },
  neptune: {
    pressure: h(2, "The 1-bar reference level is similar to Earth sea level, but pressure rises rapidly with depth and there is no surface."),
    oxygen: h(3, "Hydrogen, helium and methane atmosphere; not breathable."),
    temperature: h(4, "About -200 °C at the 1-bar level."),
    radiation: h(3, "Radiation belts exist, but only one flyby (Voyager 2, 1989) has measured them.", { uncertain: true }),
    water: h(4, "Water is inferred deep in the interior and is not accessible."),
    energy: h(4, "Sunlight is extremely weak at this distance."),
    food: h(4, "Nothing to grow food in or on."),
    habitat: h(5, "There is no solid surface and winds are the fastest measured in the solar system. Atmospheric structures have not been demonstrated.", { equipment: "None demonstrated. Atmospheric habitat concepts are theoretical." }),
  },
};

/** Gravity demand is derived from planet data (ratio to Earth's 9.8 m/s²), so it is never hardcoded separately. */
function gravityDemand(id: PlanetId): HazardDemand {
  const planet = planets.find((p) => p.id === id)!;
  const ratio = planet.gravityMs2 / 9.8;
  const ref = planet.hasSolidSurface ? "at the surface" : "at the 1-bar level";
  const text = `${planet.gravityMs2} m/s² ${ref} (${ratio.toFixed(2)}× Earth).`;
  if (ratio >= 1.5) return { tier: 4, why: `${text} Sustained high gravity strains the body and equipment.` };
  if (ratio >= 1.1) return { tier: 2, why: `${text} Somewhat higher than Earth's.` };
  if (ratio >= 0.95) return { tier: 0, why: `${text} Close to Earth's.` };
  if (ratio >= 0.8) return { tier: 1, why: `${text} Slightly lower than Earth's; long-term effects are minor but unstudied.` };
  return { tier: 2, why: `${text} Much lower than Earth's. Long-term health effects of reduced gravity are not well understood.`, uncertain: true };
}

export function getDemand(id: PlanetId, hazard: HazardId): HazardDemand {
  return hazard === "gravity" ? gravityDemand(id) : demands[id][hazard];
}

/** Illustrative challenge index (0–100): sum of the nine hazard tiers relative to the maximum. A custom visualization, not a scientific metric. */
export function challengeIndex(id: PlanetId): number {
  const total = hazardOrder.reduce((s, hz) => s + getDemand(id, hz).tier, 0);
  return Math.round((total / (hazardOrder.length * 5)) * 100);
}

export const challengeIndexMethod =
  "Illustrative educational score, not an accepted scientific habitability metric. It sums the nine rule-table hazard tiers (each 0 to 5, see the survival simulator) for a planet and divides by the maximum possible. Higher means more demanding environmental challenges. The tiers are simplified educational judgments based on the cited sources.";

export const statusInfo: Record<StatusKind, { label: string; color: string; summary: string }> = {
  baseline: { label: "NO SPECIALIZED LIFE SUPPORT REQUIRED (EARTH BASELINE)", color: "#5BE3A0", summary: "Earth is the familiar baseline. Typical conditions support human life without equipment, but not every environment or activity on Earth is risk-free." },
  unsafe: { label: "UNSAFE WITHOUT LIFE SUPPORT", color: "#FF5D73", summary: "Without protective equipment, one or more conditions here is hostile to unprotected humans." },
  specialized: { label: "REQUIRES SPECIALIZED PROTECTION", color: "#FF9A54", summary: "This equipment does not fully address the life-critical hazards, or it provides only limited-duration protection." },
  viable: { label: "POTENTIALLY VIABLE INSIDE A SUITABLE HABITAT", color: "#64E7FF", summary: "Life-critical hazards can be addressed by this equipment. Sustained habitation is a separate and harder question." },
  longterm: { label: "LONG-TERM HABITATION REQUIRES ADDITIONAL INFRASTRUCTURE", color: "#FFB454", summary: "Life-critical hazards can be addressed, but significant sustainment challenges remain." },
  beyond: { label: "BEYOND CURRENT ENGINEERING FOR SUSTAINED HABITATION", color: "#C26BFF", summary: "At least one life-critical condition exceeds anything demonstrated for crewed systems." },
};

export type HazardLevel = "none" | "mitigated" | "partial" | "unmitigated" | "beyond";

export interface HazardAssessment {
  hazard: HazardId;
  label: string;
  demand: Tier;
  capability: Tier;
  residual: number;
  level: HazardLevel;
  why: string;
  uncertain: boolean;
  equipment: string;
  provided: boolean;
}

export interface Assessment {
  planetId: PlanetId;
  configId: ConfigId;
  status: StatusKind;
  hazards: HazardAssessment[];
  primary: HazardAssessment[];
  reasons: string[];
  limitedDuration: boolean;
}

export function assess(planetId: PlanetId, configId: ConfigId): Assessment {
  const planet = planets.find((p) => p.id === planetId)!;
  const cfg = configById[configId];
  const isEarth = planetId === "earth";

  const hazards: HazardAssessment[] = hazardOrder.map((hz) => {
    const d = getDemand(planetId, hz);
    const cap = cfg.capability[hz];
    const residual = Math.max(0, d.tier - cap);
    let level: HazardLevel = "none";
    if (d.tier > 0) {
      if (residual === 0) level = "mitigated";
      else if (d.tier === 5) level = "beyond";
      else if (cap > 0) level = "partial";
      else level = "unmitigated";
    }
    return {
      hazard: hz, label: hazardInfo[hz].label, demand: d.tier, capability: cap, residual, level,
      why: d.why, uncertain: !!d.uncertain, equipment: d.equipment ?? hazardInfo[hz].equipment, provided: residual === 0,
    };
  });

  // Life-critical hazards. A suit is not a habitat, so structural habitat needs only count against it when nothing demonstrated exists (tier 5).
  const lifeCritical = hazards.filter((x) => hazardInfo[x.hazard].lifeCritical && (x.hazard !== "habitat" || configId !== "suit" || x.demand === 5));
  const lcResidual = lifeCritical.filter((x) => x.residual > 0);
  const sustain = hazards.filter((x) => !hazardInfo[x.hazard].lifeCritical);
  const sustainResidual = sustain.filter((x) => x.residual > 0);
  const sustainSum = sustainResidual.reduce((s, x) => s + x.residual, 0);
  const sustainMax = sustainResidual.reduce((m, x) => Math.max(m, x.residual), 0);

  let status: StatusKind;
  const reasons: string[] = [];

  if (isEarth) {
    status = "baseline";
    reasons.push("Earth's pressure, oxygen, temperature and radiation shielding are within the range humans evolved for.");
    if (configId !== "none") reasons.push("This equipment is not required for typical conditions on Earth, but it remains useful in extreme environments such as deep water, high altitude or polar cold.");
    reasons.push("Earth is a baseline, not a risk-free environment.");
  } else if (configId === "none") {
    const lethal = lifeCritical.filter((x) => x.demand >= 2);
    status = lethal.length ? "unsafe" : "specialized";
    lethal.forEach((x) => reasons.push(`${x.label}: ${x.why}`));
    reasons.push("With no equipment, none of these hazards is mitigated.");
  } else if (lcResidual.some((x) => x.demand === 5 && x.residual > 0)) {
    status = "beyond";
    lcResidual.filter((x) => x.demand === 5).forEach((x) => reasons.push(`${x.label}: ${x.why}`));
    reasons.push(`The strongest equipment tier in these rules (tier ${cfg.capability.habitat}) is below what this condition requires.`);
    if (!planet.hasSolidSurface) reasons.push("This is a giant planet: conditions are described at the 1-bar level, but there is no solid surface to stand on, so atmospheric conditions cannot be treated like a ground location.");
  } else if (lcResidual.length) {
    status = "specialized";
    lcResidual.forEach((x) => reasons.push(`${x.label}: needs tier ${x.demand} protection; this configuration provides tier ${x.capability}.`));
  } else if (configId === "suit") {
    status = "specialized";
    reasons.push("The suit can address pressure, oxygen and temperature here, but it protects for a limited duration. A suit is not a place to live.");
    sustainResidual.forEach((x) => reasons.push(`${x.label}: not sufficiently addressed by a suit.`));
  } else if (configId === "habitat") {
    status = "viable";
    reasons.push("The habitat can address pressure, oxygen, temperature and structure for this planet.");
    if (sustainResidual.length) reasons.push(`Sustained stays would still need to resolve: ${sustainResidual.map((x) => x.label.toLowerCase()).join(", ")}.`);
  } else {
    // Fully equipped base
    const heavy = sustainMax >= 2 || sustainSum >= 3;
    status = heavy ? "longterm" : "viable";
    reasons.push("The research base can address the life-critical hazards for this planet.");
    if (sustainResidual.length) reasons.push(`Remaining sustainment challenges: ${sustainResidual.map((x) => x.label.toLowerCase()).join(", ")}.`);
    reasons.push("No human has yet lived beyond low Earth orbit for a sustained period, so long-term habitation remains unproven.");
  }

  const primary = [...hazards].filter((x) => x.demand >= 2).sort((a, b) => b.demand - a.demand || b.residual - a.residual).slice(0, 5);

  return { planetId, configId, status, hazards, primary, reasons, limitedDuration: configId === "suit" };
}

/** Feasibility label for a protected habitat (config C) used by the comparison view. */
export function habitatFeasibility(id: PlanetId): { label: string; status: StatusKind } {
  const a = assess(id, "base");
  const map: Record<StatusKind, string> = {
    baseline: "Not required", viable: "Plausible with research base", longterm: "Needs more infrastructure",
    specialized: "Insufficient today", unsafe: "Insufficient today", beyond: "Not demonstrated",
  };
  return { label: map[a.status], status: a.status };
}

export const simulatorDisclaimer =
  "This is an educational environmental risk assessment based on simple rules. It does not predict survival times, medical outcomes or the fate of any individual. Real outcomes depend on equipment design, exposure duration, operations, health and other factors. Limited-duration protection (such as a suit) is not sustained human habitation.";
