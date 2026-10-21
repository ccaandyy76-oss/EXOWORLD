import type { Planet, PlanetEnvironmentData, PlanetId } from "../types/planet";

// Sources: NASA Planetary Fact Sheet (nssdc.gsfc.nasa.gov) and NASA Solar System Exploration.
// All numbers are rounded approximations. Gas/ice giants have no solid surface:
// their radius, temperature and gravity refer to the 1-bar pressure level.

export const planets: Planet[] = [
  {
    id: "mercury", name: "Mercury", type: "Terrestrial", color: "#B5A89A",
    description: "The smallest planet and the closest to the Sun, with a heavily cratered surface.",
    radiusKm: 2440, orbitalPeriodDays: 88, rotationPeriodHours: 1408, rotationDirection: "prograde",
    averageTempC: 167, temperatureReference: "surface", gravityMs2: 3.7, hasSolidSurface: true,
    atmosphere: "Almost none: a very thin exosphere of atoms blasted off the surface.",
    water: "No liquid water. Water ice is thought to exist in permanently shadowed polar craters.",
    environment: "Rocky, cratered surface. Temperatures swing from about -180 °C at night to about 430 °C by day.",
    habitability: "Extremely hostile: no air, intense radiation and huge temperature swings.",
    measurementNote: "Average temperature is a global mean; day/night extremes differ greatly.",
  },
  {
    id: "venus", name: "Venus", type: "Terrestrial", color: "#E8B879",
    description: "Earth's size twin, wrapped in thick clouds with a runaway greenhouse effect.",
    radiusKm: 6052, orbitalPeriodDays: 225, rotationPeriodHours: 5832, rotationDirection: "retrograde",
    averageTempC: 464, temperatureReference: "surface", gravityMs2: 8.9, hasSolidSurface: true,
    atmosphere: "Very dense carbon dioxide atmosphere with sulfuric acid clouds; surface pressure about 92 times Earth's.",
    water: "No surface water; only trace water vapor in the atmosphere.",
    environment: "Volcanic plains under permanent cloud cover, hot enough to melt lead.",
    habitability: "Surface is lethal (heat and crushing pressure). Cloud-top altitudes are far milder but remain acidic.",
    measurementNote: "Rotation is retrograde: the Sun rises in the west. One day is longer than its year.",
  },
  {
    id: "earth", name: "Earth", type: "Terrestrial", color: "#4785FF",
    description: "The only known world with life, liquid surface water and a protective magnetic field.",
    radiusKm: 6371, orbitalPeriodDays: 365, rotationPeriodHours: 24, rotationDirection: "prograde",
    averageTempC: 15, temperatureReference: "surface", gravityMs2: 9.8, hasSolidSurface: true,
    atmosphere: "About 78% nitrogen and 21% oxygen, with a protective ozone layer.",
    water: "Abundant: oceans cover about 71% of the surface.",
    environment: "Diverse climates, plate tectonics and a global magnetic field shielding the surface.",
    habitability: "The reference for habitability: supports human life without life-support equipment.",
    measurementNote: "Orbital period rounded to 365 days (about 365.25); rotation rounded to 24 h (23.93 h sidereal).",
  },
  {
    id: "mars", name: "Mars", type: "Terrestrial", color: "#E2674A",
    description: "A cold desert world with the tallest volcano and the longest canyon system known in the solar system.",
    radiusKm: 3390, orbitalPeriodDays: 687, rotationPeriodHours: 24.6, rotationDirection: "prograde",
    averageTempC: -65, temperatureReference: "surface", gravityMs2: 3.7, hasSolidSurface: true,
    atmosphere: "Thin carbon dioxide atmosphere; surface pressure under 1% of Earth's.",
    water: "Water ice at the poles and underground; no stable liquid water on the surface today.",
    environment: "Iron-oxide dust, ancient riverbeds, huge volcanoes and canyons, and frequent dust storms.",
    habitability: "Not breathable and cold, but the most studied candidate for future human outposts, with pressurized habitats required.",
    measurementNote: "Average temperature is a global mean; it ranges from roughly -140 °C to 20 °C.",
  },
  {
    id: "jupiter", name: "Jupiter", type: "Gas giant", color: "#D9A86C",
    description: "The largest planet, mostly hydrogen and helium, with a storm (the Great Red Spot) larger than Earth.",
    radiusKm: 69911, orbitalPeriodDays: 4331, rotationPeriodHours: 9.9, rotationDirection: "prograde",
    averageTempC: -110, temperatureReference: "1-bar level", gravityMs2: 24.8, hasSolidSurface: false,
    atmosphere: "Hydrogen and helium with ammonia clouds and powerful jet streams.",
    water: "Water vapor and ice exist in deeper cloud layers; no surface water.",
    environment: "No solid surface. Pressure and temperature rise steadily with depth; intense radiation belts surround the planet.",
    habitability: "Not habitable: no surface, extreme pressure and deadly radiation. Its moons (such as Europa) are studied separately.",
    measurementNote: "Radius, temperature and gravity are for the 1-bar level, not a solid surface.",
  },
  {
    id: "saturn", name: "Saturn", type: "Gas giant", color: "#E6D29A",
    description: "A gas giant known for its extensive ring system of ice and rock particles.",
    radiusKm: 58232, orbitalPeriodDays: 10747, rotationPeriodHours: 10.7, rotationDirection: "prograde",
    averageTempC: -140, temperatureReference: "1-bar level", gravityMs2: 10.4, hasSolidSurface: false,
    atmosphere: "Mostly hydrogen and helium with ammonia clouds and strong winds.",
    water: "Water ice dominates the rings; no surface water on the planet.",
    environment: "No solid surface. Low density: it would float in a large enough ocean.",
    habitability: "Not habitable. Moons such as Titan and Enceladus are studied separately.",
    measurementNote: "Radius, temperature and gravity are for the 1-bar level, not a solid surface.",
  },
  {
    id: "uranus", name: "Uranus", type: "Ice giant", color: "#8FE3E8",
    description: "An ice giant tilted about 98° on its side, rotating nearly horizontally around the Sun.",
    radiusKm: 25362, orbitalPeriodDays: 30589, rotationPeriodHours: 17.2, rotationDirection: "retrograde",
    averageTempC: -195, temperatureReference: "1-bar level", gravityMs2: 8.9, hasSolidSurface: false,
    atmosphere: "Hydrogen, helium and methane; methane gives it a blue-green color.",
    water: "Large amounts of water, ammonia and methane 'ices' exist in the interior as hot, dense fluids.",
    environment: "No solid surface; extremely cold atmosphere with faint rings and a tilted magnetic field.",
    habitability: "Not habitable: extreme cold, no surface and very distant.",
    measurementNote: "Radius, temperature and gravity are for the 1-bar level. Orbital period rounded.",
  },
  {
    id: "neptune", name: "Neptune", type: "Ice giant", color: "#4D6DFF",
    description: "The most distant planet, a dark, cold, windy ice giant.",
    radiusKm: 24622, orbitalPeriodDays: 59800, rotationPeriodHours: 16.1, rotationDirection: "prograde",
    averageTempC: -200, temperatureReference: "1-bar level", gravityMs2: 11.2, hasSolidSurface: false,
    atmosphere: "Hydrogen, helium and methane, with the fastest winds measured in the solar system (over 1,800 km/h).",
    water: "Water, ammonia and methane 'ices' make up much of the interior; no surface water.",
    environment: "No solid surface; deep blue atmosphere with storms and faint rings.",
    habitability: "Not habitable: extreme cold, high winds and no surface.",
    measurementNote: "Radius, temperature and gravity are for the 1-bar level. Orbital period rounded (about 165 Earth years).",
  },
];

const giantRef = "Reference level: 1 bar, the pressure level conventionally used as the 'surface' of a gas or ice giant. It is not a solid surface.";

/** Phase 4 environmental readings. Rounded summaries of NASA Planetary Fact Sheet / NASA Science values. */
export const planetEnvironment: Record<PlanetId, PlanetEnvironmentData> = {
  mercury: {
    temperature: { value: "About -180 °C (night) to 430 °C (day); global mean about 167 °C", approx: true, detail: "Mercury has almost no atmosphere to retain heat, so surface temperature swings enormously between night and day." },
    pressure: { value: "Near vacuum (about 10⁻¹⁴ bar, estimated)", approx: true, detail: "Mercury has only a very thin exosphere. The pressure value is an estimate listed in the NASA fact sheet." },
    composition: { value: "Exosphere of atomic oxygen, sodium, hydrogen, helium and potassium", approx: true, detail: "Atoms released from the surface by solar radiation and impacts. Not a breathable atmosphere." },
    conditions: { value: "Rocky, heavily cratered surface; permanently shadowed polar craters", approx: false, detail: "Surface conditions vary strongly with latitude and with the long day/night cycle." },
    solarDay: "About 176 Earth days (sunrise to sunrise)",
  },
  venus: {
    temperature: { value: "About 464 °C at the surface (global mean)", approx: true, detail: "Hot enough to melt lead. Temperatures are far milder at cloud-layer altitudes (roughly 50 to 55 km up), but the air there is still acidic and not breathable." },
    pressure: { value: "About 92 bar at the surface (about 92 times Earth's)", approx: true, detail: "Comparable to the pressure about 900 m under Earth's oceans. Pressure falls with altitude and is close to Earth's sea-level value at roughly 50 to 55 km altitude." },
    composition: { value: "About 96.5% carbon dioxide, about 3.5% nitrogen; sulfuric acid clouds", approx: true, detail: "Trace gases include sulfur dioxide. The clouds contain sulfuric acid droplets." },
    conditions: { value: "Volcanic plains under permanent, thick cloud cover; surface is dim and hazy", approx: false, detail: "Surface conditions are known from Soviet Venera landers (which survived only briefly) and orbital radar mapping." },
    solarDay: "About 117 Earth days; the Sun rises in the west",
  },
  earth: {
    temperature: { value: "Global mean about 15 °C; varies widely by place and season", approx: true, detail: "Earth's surface ranges from extreme cold to extreme heat. The mean is not a guarantee of comfort anywhere in particular." },
    pressure: { value: "About 1.01 bar (101 kPa) at sea level", approx: true, detail: "Falls with altitude: high mountains have too little oxygen pressure for comfortable unaided breathing." },
    composition: { value: "About 78% nitrogen, 21% oxygen, about 0.9% argon", approx: true, detail: "Also contains variable water vapor and trace gases such as carbon dioxide." },
    conditions: { value: "Liquid oceans, weather, ozone layer and a global magnetic field", approx: false, detail: "Earth is the baseline, but it is not risk-free: weather, altitude, cold, heat and water hazards all exist." },
    solarDay: "24 hours",
  },
  mars: {
    temperature: { value: "Mean about -65 °C; roughly -140 °C to 20 °C", approx: true, detail: "The thin atmosphere holds little heat, so temperatures vary strongly with latitude, season and time of day." },
    pressure: { value: "About 0.6 kPa (under 1% of Earth's); varies with season and altitude", approx: true, detail: "Far too low for liquid water to be stable on the surface and far too low for an unprotected human." },
    composition: { value: "About 95% carbon dioxide, 2.8% nitrogen, 2% argon; oxygen well under 1%", approx: true, detail: "Not breathable. Perseverance's MOXIE experiment demonstrated making small amounts of oxygen from this carbon dioxide." },
    conditions: { value: "Iron-oxide dust, rocky plains, canyons, volcanoes and seasonal global dust storms", approx: false, detail: "Surface conditions have been observed directly by landers and rovers such as Viking, Curiosity and Perseverance." },
    solarDay: "About 24 h 39 min (one sol)",
  },
  jupiter: {
    temperature: { value: "About -110 °C", approx: true, detail: giantRef + " Temperature increases with depth below this level." },
    pressure: { value: "1 bar (reference level); increases rapidly with depth", approx: true, detail: giantRef },
    composition: { value: "About 90% hydrogen, 10% helium by number; traces of methane, ammonia and water vapor", approx: true, detail: "Ammonia ice clouds form the visible cloud tops; deeper layers hold water clouds." },
    conditions: { value: "No solid surface; powerful jet streams, storms and intense radiation belts", approx: false, detail: "Conditions change continuously with altitude. There is nothing solid to stand on." },
  },
  saturn: {
    temperature: { value: "About -140 °C", approx: true, detail: giantRef },
    pressure: { value: "1 bar (reference level); increases rapidly with depth", approx: true, detail: giantRef },
    composition: { value: "About 96% hydrogen, 3% helium by number; traces of methane and ammonia", approx: true, detail: "Ammonia ice clouds near the cloud tops." },
    conditions: { value: "No solid surface; strong winds and storms; extensive rings", approx: false, detail: "The rings are mostly water ice and lie outside the atmosphere." },
  },
  uranus: {
    temperature: { value: "About -195 °C", approx: true, detail: giantRef },
    pressure: { value: "1 bar (reference level); increases rapidly with depth", approx: true, detail: giantRef },
    composition: { value: "About 83% hydrogen, 15% helium, 2% methane (by number)", approx: true, detail: "Methane absorbs red light, giving Uranus its blue-green color." },
    conditions: { value: "No solid surface; extremely cold atmosphere; axial tilt of about 98°", approx: false, detail: "Only one spacecraft (Voyager 2, 1986) has visited, so knowledge is limited." },
  },
  neptune: {
    temperature: { value: "About -200 °C", approx: true, detail: giantRef },
    pressure: { value: "1 bar (reference level); increases rapidly with depth", approx: true, detail: giantRef },
    composition: { value: "About 80% hydrogen, 19% helium, 1.5% methane (by number)", approx: true, detail: "Methane gives the blue color." },
    conditions: { value: "No solid surface; the fastest winds measured in the solar system", approx: false, detail: "Only one spacecraft (Voyager 2, 1989) has visited, so knowledge is limited." },
  },
};
