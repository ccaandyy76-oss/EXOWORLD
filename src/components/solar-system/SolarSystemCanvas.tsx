import { useEffect, useMemo, useRef, type MutableRefObject } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Vector3 } from "three";
import { planets } from "../../data/planets";
import { DEFAULT_CAMERA, MAX_CAMERA_DISTANCE, SUN_RADIUS, visualSize } from "../../data/sceneConfig";
import type { PlanetId } from "../../types/planet";
import Planet from "./Planet";
import PlanetaryOrbits from "./PlanetaryOrbits";
import StarField from "./StarField";
import Sun from "./Sun";

interface Props {
  approach: boolean;
  selectedId: PlanetId | null;
  onSelect: (id: PlanetId) => void;
  speed: number;
  resetNonce: number;
}

// Only the parts of OrbitControls that CameraRig uses.
interface Controls {
  target: Vector3;
  minDistance: number;
  update: () => void;
}

/** Smooth, spacecraft-style camera moves to a planet or back to the default view. */
function CameraRig({ selectedId, resetNonce, approach, positions }: { selectedId: PlanetId | null; resetNonce: number; approach: boolean; positions: MutableRefObject<Record<string, Vector3>> }) {
  const camera = useThree((s) => s.camera);
  const controls = useThree((s) => s.controls) as unknown as Controls | null;
  const anim = useRef<{ t: number; dur: number; fromCam: Vector3; fromTarget: Vector3 } | null>(null);
  const tmp = useMemo(() => ({ cam: new Vector3(), target: new Vector3(), delta: new Vector3() }), []);

  useEffect(() => {
    if (!controls) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    anim.current = { t: 0, dur: reduced ? 0.001 : approach ? 3 : 1.8, fromCam: camera.position.clone(), fromTarget: controls.target.clone() };
  }, [selectedId, resetNonce, approach, camera, controls]);

  useFrame((_, dt) => {
    if (!controls) return;
    const planet = selectedId ? planets.find((p) => p.id === selectedId) : undefined;
    const pos = selectedId ? positions.current[selectedId] : undefined;
    let size = 1;

    if (planet && pos) {
      size = visualSize(planet.radiusKm);
      const dist = approach ? size * 2.4 + 0.8 : size * 5 + 2;
      const len = Math.hypot(pos.x, pos.z) || 1;
      // Camera sits on the sunlit side of the planet, looking outward.
      tmp.target.copy(pos);
      tmp.cam.set(pos.x - (pos.x / len) * dist, size * 2 + 1.5, pos.z - (pos.z / len) * dist);
    } else {
      tmp.target.set(0, 0, 0);
      tmp.cam.set(...DEFAULT_CAMERA);
    }
    controls.minDistance = planet ? size * 2 : anim.current ? 2 : 8;

    const a = anim.current;
    if (a) {
      a.t = Math.min(1, a.t + dt / a.dur);
      const e = a.t < 0.5 ? 4 * a.t ** 3 : 1 - (-2 * a.t + 2) ** 3 / 2;
      controls.target.lerpVectors(a.fromTarget, tmp.target, e);
      camera.position.lerpVectors(a.fromCam, tmp.cam, e);
      if (a.t >= 1) anim.current = null;
    } else if (planet && pos) {
      // Follow the orbiting planet while keeping the user's chosen viewing angle.
      tmp.delta.copy(tmp.target).sub(controls.target);
      controls.target.add(tmp.delta);
      camera.position.add(tmp.delta);
    }

    // Never let the camera end up inside the Sun.
    if (camera.position.length() < SUN_RADIUS + 1.5) camera.position.setLength(SUN_RADIUS + 1.5);
    controls.update();
  });

  return null;
}

export default function SolarSystemCanvas({ approach, selectedId, onSelect, speed, resetNonce }: Props) {
  const speedRef = useRef(speed);
  speedRef.current = speed;
  const positions = useRef<Record<string, Vector3>>({});

  return (
    <Canvas camera={{ position: DEFAULT_CAMERA, fov: 50, near: 0.1, far: 1200 }} dpr={[1, 2]}>
      <color attach="background" args={["#03050B"]} />
      <ambientLight intensity={0.5} />
      <StarField />
      <Sun />
      <PlanetaryOrbits selectedId={selectedId} />
      {planets.map((p, i) => (
        <Planet key={p.id} planet={p} index={i} speedRef={speedRef} positions={positions} selected={p.id === selectedId} onSelect={onSelect} />
      ))}
      <OrbitControls makeDefault enableDamping dampingFactor={0.08} enablePan={!selectedId} maxDistance={MAX_CAMERA_DISTANCE} maxPolarAngle={Math.PI * 0.95} />
      <CameraRig selectedId={selectedId} resetNonce={resetNonce} approach={approach} positions={positions} />
    </Canvas>
  );
}
