import type { PlanetId, PlanetResearch } from "../types/planet";

/**
 * Research content for the planetary research panel.
 * Each statement is tagged as a confirmed observation, an interpretation, or a future possibility.
 * Missions: "planned" entries are never shown as completed.
 */
export const planetResearch: Record<PlanetId, PlanetResearch> = {
  mercury: {
    waterEvidence: [
      { evidence: "confirmed", text: "Earth-based radar and the MESSENGER orbiter found bright radar deposits and reflective material in permanently shadowed polar craters." },
      { evidence: "interpretation", text: "These deposits are interpreted as largely water ice, possibly covered by darker organic-rich material. No spacecraft has landed to sample it." },
    ],
    sunlight: "Very strong sunlight (closest planet to the Sun), but the 176-Earth-day solar day means long periods of darkness at most locations.",
    resources: [
      { evidence: "interpretation", text: "Polar ice could in principle supply water, oxygen and hydrogen." },
      { evidence: "possibility", text: "Abundant solar power and metal-rich rock might be exploited by future operations. No such use has been demonstrated." },
    ],
    uncertainties: ["Amount, purity and accessibility of polar ice are unknown.", "Surface composition is known mainly from orbit."],
    humanChallenges: [
      "No atmosphere: no breathable oxygen and no pressure; any human needs full pressurization.",
      "Extreme temperature swings between day and night.",
      "High radiation exposure with no atmospheric shielding and only a weak magnetic field.",
      "Long travel time and heavy fuel demands for a deep-Sun-gravity destination.",
      "Water would need to come from distant polar craters; food would need fully enclosed production.",
    ],
    missions: [
      { name: "Mariner 10", years: "1974–1975", status: "completed", agency: "NASA", summary: "First spacecraft to visit Mercury, with three flybys; mapped part of the surface." },
      { name: "MESSENGER", years: "2004–2015", status: "completed", agency: "NASA", summary: "First spacecraft to orbit Mercury (2011–2015). Mapped the whole planet and found evidence of polar water ice." },
      { name: "BepiColombo", years: "Launched 2018", status: "ongoing", agency: "ESA / JAXA", summary: "En route, with Mercury flybys completed. Entry into Mercury orbit is planned for late 2026; check ESA for the current status." },
    ],
  },
  venus: {
    waterEvidence: [
      { evidence: "confirmed", text: "Only trace water vapor has been measured in the atmosphere. No liquid water on the surface." },
      { evidence: "interpretation", text: "Venus may once have had more water that was lost as the planet heated; this is still studied." },
    ],
    sunlight: "Sunlight is strong above the clouds, but thick clouds greatly reduce how much reaches the surface.",
    resources: [
      { evidence: "confirmed", text: "The atmosphere is mostly carbon dioxide." },
      { evidence: "possibility", text: "Cloud-layer altitudes have mild temperatures and Earth-like pressure, which has inspired floating-habitat concepts. None has been built or tested." },
    ],
    uncertainties: ["The surface has been observed directly only briefly by landers.", "Extent of current volcanic activity is still being investigated."],
    humanChallenges: [
      "Surface temperature of about 464 °C and pressure of about 92 bar are beyond demonstrated long-duration engineering.",
      "Sulfuric acid clouds are corrosive.",
      "The atmosphere has no breathable oxygen.",
      "Thick clouds limit solar power at the surface.",
      "A sustained habitat would need a design that does not exist today; cloud-layer concepts remain theoretical.",
    ],
    missions: [
      { name: "Mariner 2", years: "1962", status: "completed", agency: "NASA", summary: "First successful flyby of another planet; measured Venus's hot surface from space." },
      { name: "Venera 7", years: "1970", status: "completed", agency: "USSR", summary: "First spacecraft to transmit data from the surface of another planet." },
      { name: "Venera 9, 10, 13 and 14", years: "1975–1982", status: "completed", agency: "USSR", summary: "Landers returned the first surface images; Venera 13 operated for about two hours." },
      { name: "Magellan", years: "1989–1994", status: "completed", agency: "NASA", summary: "Radar-mapped nearly the whole surface from orbit." },
      { name: "Venus Express", years: "2005–2014", status: "completed", agency: "ESA", summary: "Studied the atmosphere and clouds from orbit." },
      { name: "DAVINCI, VERITAS and EnVision", years: "Planned", status: "planned", agency: "NASA / ESA", summary: "Planned missions. They have not flown; check the agencies for the current schedule." },
    ],
  },
  earth: {
    waterEvidence: [
      { evidence: "confirmed", text: "Liquid water covers about 71% of the surface; ice caps, groundwater and atmospheric vapor are all measured." },
    ],
    sunlight: "Moderate sunlight at a distance that allows liquid water; varies with latitude, season and weather.",
    resources: [
      { evidence: "confirmed", text: "Liquid water, breathable air, fertile soil, minerals and diverse energy sources." },
    ],
    uncertainties: ["Local conditions vary widely; Earth is a baseline, not a uniform environment."],
    humanChallenges: [
      "Needs no life-support equipment in typical conditions, but not every place or activity is safe.",
      "Extreme weather, high altitude, polar cold, desert heat and deep water all require protection.",
      "Long-term habitation is sustainable but depends on managing climate, resources and ecosystems.",
    ],
    missions: [
      { name: "Sputnik 1", years: "1957", status: "completed", agency: "USSR", summary: "First artificial satellite." },
      { name: "Explorer 1", years: "1958", status: "completed", agency: "NASA", summary: "First US satellite; its data revealed the Van Allen radiation belts." },
      { name: "International Space Station", years: "2000–present", status: "ongoing", agency: "NASA, Roscosmos, ESA, JAXA, CSA", summary: "Continuously crewed in low Earth orbit since November 2000." },
    ],
  },
  mars: {
    waterEvidence: [
      { evidence: "confirmed", text: "Water ice caps at both poles, and buried ice detected by orbiters and exposed by the Phoenix lander." },
      { evidence: "confirmed", text: "Rover findings of minerals formed in water show that liquid water existed on ancient Mars." },
      { evidence: "interpretation", text: "Seasonal dark streaks may involve briny water; this is debated." },
      { evidence: "possibility", text: "Ice could be mined for drinking water, oxygen and fuel. No such operation exists." },
    ],
    sunlight: "Weaker than at Earth because Mars is farther from the Sun; dust storms can reduce it substantially.",
    resources: [
      { evidence: "confirmed", text: "Carbon dioxide atmosphere; MOXIE on Perseverance produced small amounts of oxygen from it." },
      { evidence: "confirmed", text: "Regolith and rock are present everywhere; Phoenix detected perchlorate salts in the soil." },
      { evidence: "possibility", text: "Regolith for construction and radiation shielding; local ice for water." },
    ],
    uncertainties: ["Amount and accessibility of subsurface ice at candidate sites.", "Long-term effects of Mars's reduced gravity on humans are unknown.", "Whether liquid water exists briefly or locally today."],
    humanChallenges: [
      "Atmospheric pressure under 1% of Earth's and no breathable oxygen.",
      "Cold temperatures.",
      "Radiation exposure is higher than on Earth's surface because there is no global magnetic field and the atmosphere is thin.",
      "Water must be extracted and purified; dust storms can limit solar power.",
      "Soil contains perchlorates, so food production would need controlled, treated growth systems.",
      "Long-term stays raise open questions about reduced gravity, medical care, resupply and psychological strain.",
    ],
    missions: [
      { name: "Mariner 4", years: "1964–1965", status: "completed", agency: "NASA", summary: "First successful Mars flyby; returned the first close images." },
      { name: "Viking 1 and 2", years: "1975–1982", status: "completed", agency: "NASA", summary: "First successful Mars landers; searched for signs of life." },
      { name: "Mars Pathfinder / Sojourner", years: "1997", status: "completed", agency: "NASA", summary: "First rover on Mars." },
      { name: "Spirit and Opportunity", years: "2004–2018", status: "completed", agency: "NASA", summary: "Found evidence that liquid water once existed." },
      { name: "Phoenix", years: "2008", status: "completed", agency: "NASA", summary: "Landed near the north pole and confirmed water ice below the surface." },
      { name: "Curiosity", years: "2012–present", status: "ongoing", agency: "NASA", summary: "Found that Gale Crater once had conditions suitable for life; its radiation instrument measures surface exposure." },
      { name: "Perseverance and Ingenuity", years: "2021–present", status: "ongoing", agency: "NASA", summary: "Collecting samples, tested MOXIE oxygen production, and flew the first powered aircraft on another world (Ingenuity, retired)." },
      { name: "Mars Sample Return", years: "Planned", status: "planned", agency: "NASA / ESA", summary: "A planned concept whose design and schedule have been under review. It has not flown." },
    ],
  },
  jupiter: {
    waterEvidence: [
      { evidence: "confirmed", text: "Water vapor was measured by the Galileo probe in the atmosphere, in lower amounts than predicted at its entry site." },
      { evidence: "interpretation", text: "Water clouds are expected deeper in the atmosphere. Global water abundance is still being refined." },
    ],
    sunlight: "Much weaker than at Earth because of the distance from the Sun.",
    resources: [
      { evidence: "possibility", text: "Hydrogen and helium are abundant, but no practical way to access them has been demonstrated." },
    ],
    uncertainties: ["Interior structure and the depth of the winds.", "Total water content."],
    humanChallenges: [
      "No solid surface: nothing to stand or build on.",
      "Pressure and temperature change rapidly with depth.",
      "Intense radiation belts.",
      "Much stronger gravity at the 1-bar level (about 2.5 times Earth's).",
      "Very weak sunlight for power; no accessible water or food sources.",
    ],
    missions: [
      { name: "Pioneer 10 and 11", years: "1973–1974", status: "completed", agency: "NASA", summary: "First flybys, measuring Jupiter's radiation environment." },
      { name: "Voyager 1 and 2", years: "1979", status: "completed", agency: "NASA", summary: "Detailed flybys that discovered Jupiter's rings and volcanism on Io." },
      { name: "Galileo", years: "1995–2003", status: "completed", agency: "NASA", summary: "Orbiter and atmospheric probe; the probe measured the atmosphere down to about 22 bar." },
      { name: "Juno", years: "2016–", status: "ongoing", agency: "NASA", summary: "Polar orbiter studying the atmosphere, interior and magnetic field. Check NASA for current operations status." },
    ],
  },
  saturn: {
    waterEvidence: [
      { evidence: "confirmed", text: "The rings are mostly water ice particles." },
      { evidence: "interpretation", text: "Water exists deeper in the atmosphere, but it is not directly sampled." },
    ],
    sunlight: "Very weak compared with Earth.",
    resources: [
      { evidence: "confirmed", text: "Ring water ice is abundant." },
      { evidence: "possibility", text: "Ring ice and the moons Titan and Enceladus have been proposed as future resources; none has been used." },
    ],
    uncertainties: ["Interior structure and ring age.", "Atmospheric water abundance."],
    humanChallenges: [
      "No solid surface to build on.",
      "Extremely cold atmosphere.",
      "Radiation belts, weaker than Jupiter's.",
      "Very weak sunlight for power; no accessible food or water on the planet.",
    ],
    missions: [
      { name: "Pioneer 11", years: "1979", status: "completed", agency: "NASA", summary: "First flyby of Saturn." },
      { name: "Voyager 1 and 2", years: "1980–1981", status: "completed", agency: "NASA", summary: "Flybys that revealed ring structure and moons." },
      { name: "Cassini–Huygens", years: "1997–2017", status: "completed", agency: "NASA / ESA / ASI", summary: "Orbited Saturn from 2004 to 2017; Huygens landed on Titan in 2005." },
      { name: "Dragonfly", years: "Planned", status: "planned", agency: "NASA", summary: "A planned rotorcraft mission to Titan. It has not flown." },
    ],
  },
  uranus: {
    waterEvidence: [
      { evidence: "interpretation", text: "Models suggest large amounts of water, ammonia and methane in a hot, dense interior fluid. This is inferred, not sampled." },
    ],
    sunlight: "Extremely weak at this distance.",
    resources: [
      { evidence: "possibility", text: "Hydrogen, helium and methane exist in the atmosphere, but nothing is accessible." },
    ],
    uncertainties: ["Only one flyby, in 1986, so atmosphere, magnetic field and radiation belts are poorly constrained.", "Internal structure."],
    humanChallenges: [
      "No solid surface.",
      "Extremely cold atmosphere.",
      "Very distant: travel takes many years.",
      "Radiation environment is poorly known.",
      "Extremely weak sunlight for power; no accessible food or water.",
    ],
    missions: [
      { name: "Voyager 2", years: "1986", status: "completed", agency: "NASA", summary: "The only spacecraft to visit Uranus; discovered new moons and rings." },
      { name: "Uranus Orbiter and Probe", years: "Proposed", status: "planned", agency: "NASA", summary: "Recommended as a top priority by the U.S. planetary science Decadal Survey. It is a recommendation, not an approved or flown mission." },
    ],
  },
  neptune: {
    waterEvidence: [
      { evidence: "interpretation", text: "Models suggest water, ammonia and methane in a hot, dense interior. This is inferred, not sampled." },
    ],
    sunlight: "Extremely weak at this distance.",
    resources: [
      { evidence: "possibility", text: "Hydrogen, helium and methane exist in the atmosphere, but nothing is accessible." },
    ],
    uncertainties: ["Only one flyby, in 1989.", "Interior structure and radiation environment are poorly known."],
    humanChallenges: [
      "No solid surface.",
      "Extremely cold atmosphere with very strong winds.",
      "Very distant: travel takes decades.",
      "Radiation environment is poorly known.",
      "Extremely weak sunlight for power; no accessible food or water.",
    ],
    missions: [
      { name: "Voyager 2", years: "1989", status: "completed", agency: "NASA", summary: "The only spacecraft to visit Neptune; observed the Great Dark Spot and Triton's geysers." },
    ],
  },
};
