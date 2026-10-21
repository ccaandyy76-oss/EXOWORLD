import type { PlanetId, ScientificSource } from "../types/planet";

/**
 * Sources used for the Phase 4 scientific content. URLs point to agency landing pages.
 * Values in the app are rounded educational summaries of these sources, not exact reproductions.
 */
export const scientificSources: Record<string, ScientificSource> = {
  factsheet: { id: "factsheet", name: "Planetary Fact Sheet", publisher: "NASA NSSDCA", url: "https://nssdc.gsfc.nasa.gov/planetary/factsheet/", usedFor: "Radius, gravity, temperature, pressure, composition, orbital and rotation periods." },
  solarSystem: { id: "solarSystem", name: "Solar System Exploration", publisher: "NASA Science", url: "https://science.nasa.gov/solar-system/", usedFor: "Planet overviews, atmospheres, water, magnetic fields and missions." },
  mercury: { id: "mercury", name: "Mercury", publisher: "NASA Science", url: "https://science.nasa.gov/mercury/", usedFor: "Mercury environment, polar ice and exploration." },
  venus: { id: "venus", name: "Venus", publisher: "NASA Science", url: "https://science.nasa.gov/venus/", usedFor: "Venus atmosphere, surface conditions and exploration." },
  earth: { id: "earth", name: "Earth", publisher: "NASA Science", url: "https://science.nasa.gov/earth/", usedFor: "Earth baseline environment." },
  mars: { id: "mars", name: "Mars", publisher: "NASA Science", url: "https://science.nasa.gov/mars/", usedFor: "Mars atmosphere, water ice, radiation and exploration." },
  jupiter: { id: "jupiter", name: "Jupiter", publisher: "NASA Science", url: "https://science.nasa.gov/jupiter/", usedFor: "Jupiter atmosphere, radiation and exploration." },
  saturn: { id: "saturn", name: "Saturn", publisher: "NASA Science", url: "https://science.nasa.gov/saturn/", usedFor: "Saturn atmosphere, rings and exploration." },
  uranus: { id: "uranus", name: "Uranus", publisher: "NASA Science", url: "https://science.nasa.gov/uranus/", usedFor: "Uranus atmosphere and exploration." },
  neptune: { id: "neptune", name: "Neptune", publisher: "NASA Science", url: "https://science.nasa.gov/neptune/", usedFor: "Neptune atmosphere and exploration." },
  missions: { id: "missions", name: "NASA Missions", publisher: "NASA Science", url: "https://science.nasa.gov/missions/", usedFor: "Mission dates, status and objectives. Check here for current mission status." },
  marsProgram: { id: "marsProgram", name: "Mars Exploration Program", publisher: "NASA / JPL", url: "https://mars.nasa.gov/", usedFor: "Mars landers, rovers, MOXIE and water ice findings." },
  hrp: { id: "hrp", name: "Human Research Program", publisher: "NASA", url: "https://www.nasa.gov/hrp/", usedFor: "Background on radiation, reduced gravity and life-support challenges for humans." },
  esaBepi: { id: "esaBepi", name: "BepiColombo", publisher: "ESA", url: "https://www.esa.int/Science_Exploration/Space_Science/BepiColombo", usedFor: "BepiColombo mission status." },
};

/** Sources relevant to each planet's research panel. */
export const sourcesByPlanet: Record<PlanetId, string[]> = {
  mercury: ["factsheet", "mercury", "missions", "esaBepi", "hrp"],
  venus: ["factsheet", "venus", "missions", "hrp"],
  earth: ["factsheet", "earth", "missions", "hrp"],
  mars: ["factsheet", "mars", "marsProgram", "missions", "hrp"],
  jupiter: ["factsheet", "jupiter", "missions", "hrp"],
  saturn: ["factsheet", "saturn", "missions", "hrp"],
  uranus: ["factsheet", "uranus", "missions", "hrp"],
  neptune: ["factsheet", "neptune", "missions", "hrp"],
};

export const allSources = Object.values(scientificSources);

export const sourceNote =
  "Values shown are rounded educational summaries. Many depend on location, season, time of day or a reference altitude (for example the 1-bar level on giant planets). Consult the sources for exact figures and current mission status.";
