import type { PlanetId } from "../types/planet";

// Visual-only settings for the 3D scene. NOT to scale: distances, sizes and speeds are compressed.
export const SUN_RADIUS = 2.4;

export const ORBIT_RADIUS: Record<PlanetId, number> = {
  mercury: 6, venus: 8.5, earth: 11.5, mars: 14.5,
  jupiter: 21, saturn: 28, uranus: 34, neptune: 40,
};

export const DEFAULT_CAMERA: [number, number, number] = [0, 34, 62];
export const MAX_CAMERA_DISTANCE = 140;

export const SPEEDS = { slow: 0.25, normal: 1, fast: 4 } as const;
export type SpeedMode = keyof typeof SPEEDS;

/** Compressed planet size derived from the real radius in planets.ts */
export const visualSize = (radiusKm: number) => 0.45 * Math.pow(radiusKm / 6371, 0.45);

/** Seconds for one orbit at normal speed. Square-root compression of the real period keeps the ordering correct. */
export const orbitSeconds = (periodDays: number) => 20 * Math.sqrt(periodDays / 88);
