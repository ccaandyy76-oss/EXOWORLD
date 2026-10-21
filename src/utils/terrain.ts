import { BufferAttribute, Color, PlaneGeometry } from "three";
import type { SurfaceConfig } from "../data/environments";

export function seededRandom(seed: number) {
  let s = seed * 7919 + 13;
  return () => (s = (s * 16807) % 2147483647) / 2147483647;
}

const smooth = (a: number, b: number, t: number) => {
  const k = Math.min(1, Math.max(0, (t - a) / (b - a)));
  return k * k * (3 - 2 * k);
};

/** Deterministic ground height. Flat near the origin so the viewer always stands on level ground. */
export function makeHeightFn(cfg: SurfaceConfig) {
  const rand = seededRandom(cfg.seed);
  const ph = cfg.seed;
  const craters = Array.from({ length: cfg.craters }, () => {
    const r = 6 + rand() * 16, a = rand() * Math.PI * 2, d = 45 + rand() * 70;
    return { x: Math.cos(a) * d, z: Math.sin(a) * d, r, depth: r * 0.12 };
  });
  return (x: number, z: number) => {
    const d = Math.hypot(x, z);
    let h = (Math.sin(x * 0.07 + ph) * Math.cos(z * 0.06 - ph) * 1.6 + Math.sin(x * 0.19 + z * 0.13) * 0.55 + Math.sin(x * 0.43) * Math.cos(z * 0.37) * 0.22) * cfg.relief * smooth(5, 26, d);
    h += smooth(55, 150, d) * Math.max(0, Math.abs(Math.sin(x * 0.03 + z * 0.018 + ph)) * 20 + Math.sin(x * 0.07 - z * 0.05) * 5 + Math.cos(z * 0.045 + ph) * 6) * cfg.mountains;
    for (const c of craters) {
      const q = Math.hypot(x - c.x, z - c.z) / c.r;
      if (q < 1) h -= c.depth * (1 - q * q);
      if (q < 1.6) h += c.depth * 0.4 * Math.exp(-(((q - 1) / 0.18) ** 2));
    }
    if (cfg.sea) h += 1.2 - smooth(30, 95, d) * (7 + 3 * Math.sin(Math.atan2(z, x) * 3 + ph));
    return h;
  };
}

/** One 300 x 300 plane with 140 x 140 segments (about 20k vertices), colored by height. */
export function buildTerrain(cfg: SurfaceConfig, heightAt: (x: number, z: number) => number) {
  const geo = new PlaneGeometry(300, 300, 140, 140);
  geo.rotateX(-Math.PI / 2);
  const pos = geo.attributes.position;
  const colors = new Float32Array(pos.count * 3);
  const c1 = new Color(cfg.ground[0]), c2 = new Color(cfg.ground[1]), sand = new Color("#c9b27c"), tmp = new Color();
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i), z = pos.getZ(i), h = heightAt(x, z);
    pos.setY(i, h);
    const t = Math.min(1, Math.max(0, 0.5 + h / 8 + Math.sin(x * 0.21) * Math.cos(z * 0.17) * 0.15));
    tmp.copy(c1).lerp(c2, t);
    if (cfg.sea && h < 0.1) tmp.copy(sand);
    colors.set([tmp.r, tmp.g, tmp.b], i * 3);
  }
  geo.setAttribute("color", new BufferAttribute(colors, 3));
  geo.computeVertexNormals();
  return geo;
}
