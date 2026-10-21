import { CanvasTexture, Color, RingGeometry, SRGBColorSpace } from "three";
import type { PlanetId } from "../types/planet";

// Procedural textures: drawn on a canvas, so no external files can fail to load.

function makeCanvas(w: number, h: number) {
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  return { canvas, g: canvas.getContext("2d")! };
}

function toTexture(canvas: HTMLCanvasElement) {
  const t = new CanvasTexture(canvas);
  t.colorSpace = SRGBColorSpace;
  return t;
}

const tint = (hex: string, lightness: number) => new Color(hex).offsetHSL(0, 0, lightness).getStyle();

function seeded(seed: number) {
  let s = seed;
  return () => (s = (s * 16807) % 2147483647) / 2147483647;
}

export function makePlanetTexture(id: PlanetId, color: string) {
  const W = 512, H = 256;
  const { canvas, g } = makeCanvas(W, H);
  const rand = seeded(id.length * 97 + id.charCodeAt(0));
  g.fillStyle = color;
  g.fillRect(0, 0, W, H);

  const blobs = (n: number, col: string, rmin: number, rmax: number, alpha: number) => {
    g.globalAlpha = alpha;
    g.fillStyle = col;
    for (let i = 0; i < n; i++) {
      const r = rmin + rand() * (rmax - rmin);
      g.beginPath();
      g.ellipse(rand() * W, rand() * H, r * (1 + rand()), r, 0, 0, Math.PI * 2);
      g.fill();
    }
    g.globalAlpha = 1;
  };
  const bands = (n: number, amount: number) => {
    for (let i = 0; i < n; i++) {
      g.fillStyle = tint(color, (rand() - 0.5) * amount);
      g.fillRect(0, (i * H) / n, W, H / n + 1);
    }
  };

  switch (id) {
    case "mercury":
      blobs(50, tint(color, -0.15), 3, 14, 0.45);
      g.strokeStyle = tint(color, 0.12);
      g.lineWidth = 1.5;
      for (let i = 0; i < 45; i++) {
        g.beginPath();
        g.arc(rand() * W, rand() * H, 3 + rand() * 12, 0, Math.PI * 2);
        g.stroke();
      }
      break;
    case "venus":
      bands(10, 0.08);
      blobs(40, tint(color, 0.1), 10, 34, 0.3);
      break;
    case "earth":
      blobs(26, "#4F9A5B", 12, 40, 0.95);
      blobs(18, "#8B7B4E", 6, 16, 0.6);
      blobs(30, "#FFFFFF", 8, 26, 0.22);
      g.fillStyle = "#EAF4FF";
      g.fillRect(0, 0, W, 12);
      g.fillRect(0, H - 12, W, 12);
      break;
    case "mars":
      blobs(45, tint(color, -0.12), 8, 28, 0.5);
      blobs(25, tint(color, 0.08), 6, 20, 0.4);
      g.fillStyle = "#F2E8E4";
      g.fillRect(0, 0, W, 6);
      g.fillRect(0, H - 6, W, 6);
      break;
    case "jupiter":
      bands(24, 0.3);
      g.fillStyle = "#C0603A";
      g.beginPath();
      g.ellipse(W * 0.65, H * 0.64, 26, 12, 0, 0, Math.PI * 2);
      g.fill();
      break;
    case "saturn":
      bands(16, 0.14);
      break;
    case "uranus":
      bands(8, 0.05);
      break;
    case "neptune":
      bands(10, 0.12);
      g.fillStyle = tint(color, -0.18);
      g.beginPath();
      g.ellipse(W * 0.4, H * 0.55, 22, 11, 0, 0, Math.PI * 2);
      g.fill();
      break;
  }
  return toTexture(canvas);
}

export function makeSunTexture() {
  const { canvas, g } = makeCanvas(256, 128);
  const rand = seeded(42);
  g.fillStyle = "#FFB454";
  g.fillRect(0, 0, 256, 128);
  for (let i = 0; i < 90; i++) {
    g.globalAlpha = 0.35;
    g.fillStyle = rand() > 0.5 ? "#FF7A2D" : "#FFE08A";
    g.beginPath();
    g.ellipse(rand() * 256, rand() * 128, 4 + rand() * 18, 3 + rand() * 8, 0, 0, Math.PI * 2);
    g.fill();
  }
  return toTexture(canvas);
}

export function makeGlowTexture() {
  const { canvas, g } = makeCanvas(128, 128);
  const grad = g.createRadialGradient(64, 64, 0, 64, 64, 64);
  grad.addColorStop(0, "rgba(255,200,110,0.95)");
  grad.addColorStop(0.35, "rgba(255,150,60,0.35)");
  grad.addColorStop(1, "rgba(255,120,40,0)");
  g.fillStyle = grad;
  g.fillRect(0, 0, 128, 128);
  return toTexture(canvas);
}

export function makeRingTexture(color: string) {
  const { canvas, g } = makeCanvas(256, 4);
  const rand = seeded(7);
  for (let x = 0; x < 256; x++) {
    const gap = x > 150 && x < 162;
    g.fillStyle = tint(color, (rand() - 0.5) * 0.15);
    g.globalAlpha = gap ? 0.05 : 0.45 + rand() * 0.4;
    g.fillRect(x, 0, 1, 4);
  }
  return toTexture(canvas);
}

export function makeSkyTexture(top: string, horizon: string) {
  const { canvas, g } = makeCanvas(4, 256);
  const grad = g.createLinearGradient(0, 0, 0, 256);
  grad.addColorStop(0, top);
  grad.addColorStop(0.5, horizon);
  grad.addColorStop(1, horizon);
  g.fillStyle = grad;
  g.fillRect(0, 0, 4, 256);
  return toTexture(canvas);
}

/** Soft white blob, tinted through the sprite color (clouds). */
export function makeSoftTexture() {
  const { canvas, g } = makeCanvas(128, 64);
  const grad = g.createRadialGradient(64, 32, 0, 64, 32, 62);
  grad.addColorStop(0, "rgba(255,255,255,0.9)");
  grad.addColorStop(1, "rgba(255,255,255,0)");
  g.fillStyle = grad;
  g.fillRect(0, 0, 128, 64);
  return toTexture(canvas);
}

/** Planet ring geometry with UVs remapped so the stripe texture runs inner → outer edge. */
export function makeRing(inner: number, outer: number, color: string) {
  const geo = new RingGeometry(inner, outer, 96);
  const pos = geo.attributes.position;
  const uv = geo.attributes.uv;
  for (let i = 0; i < pos.count; i++) uv.setXY(i, (Math.hypot(pos.getX(i), pos.getY(i)) - inner) / (outer - inner), 0.5);
  return { geo, map: makeRingTexture(color) };
}
