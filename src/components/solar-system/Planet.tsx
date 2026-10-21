import { useEffect, useMemo, useRef, useState, type MutableRefObject } from "react";
import { useFrame, type ThreeEvent } from "@react-three/fiber";
import { Billboard } from "@react-three/drei";
import { DoubleSide, RingGeometry, Vector3, type Group, type Mesh } from "three";
import type { Planet as PlanetData, PlanetId } from "../../types/planet";
import { ORBIT_RADIUS, orbitSeconds, visualSize } from "../../data/sceneConfig";
import { makePlanetTexture, makeRingTexture } from "../../utils/textures";
import PlanetLabel from "./PlanetLabels";

interface Props {
  planet: PlanetData;
  index: number;
  speedRef: MutableRefObject<number>;
  positions: MutableRefObject<Record<string, Vector3>>;
  selected: boolean;
  onSelect: (id: PlanetId) => void;
}

export default function Planet({ planet, index, speedRef, positions, selected, onSelect }: Props) {
  const group = useRef<Group>(null);
  const body = useRef<Mesh>(null);
  const angle = useRef(index * 1.3);
  const [hovered, setHovered] = useState(false);

  const radius = ORBIT_RADIUS[planet.id];
  const size = visualSize(planet.radiusKm);
  const omega = (Math.PI * 2) / orbitSeconds(planet.orbitalPeriodDays);
  const spin = planet.rotationDirection === "retrograde" ? -0.4 : 0.4;
  const texture = useMemo(() => makePlanetTexture(planet.id, planet.color), [planet.id, planet.color]);

  // Saturn's ring: remap UVs so the stripe texture runs from the inner to the outer edge.
  const ring = useMemo(() => {
    if (planet.id !== "saturn") return null;
    const inner = size * 1.3, outer = size * 2.3;
    const geo = new RingGeometry(inner, outer, 96);
    const pos = geo.attributes.position;
    const uv = geo.attributes.uv;
    for (let i = 0; i < pos.count; i++) {
      const d = Math.hypot(pos.getX(i), pos.getY(i));
      uv.setXY(i, (d - inner) / (outer - inner), 0.5);
    }
    return { geo, map: makeRingTexture(planet.color) };
  }, [planet.id, planet.color, size]);

  useEffect(() => () => { document.body.style.cursor = ""; }, []);

  useFrame((_, dt) => {
    const s = speedRef.current;
    angle.current += omega * dt * s;
    const x = Math.cos(angle.current) * radius;
    const z = Math.sin(angle.current) * radius;
    group.current?.position.set(x, 0, z);
    (positions.current[planet.id] ??= new Vector3()).set(x, 0, z);
    if (body.current) body.current.rotation.y += spin * dt * s;
  });

  const handleClick = (e: ThreeEvent<MouseEvent>) => {
    if (e.delta > 4) return; // the pointer was dragging the camera, not clicking
    e.stopPropagation();
    onSelect(planet.id);
  };

  return (
    <group ref={group}>
      <mesh ref={body}>
        <sphereGeometry args={[size, 48, 48]} />
        <meshStandardMaterial
          map={texture}
          roughness={1}
          emissive={planet.color}
          emissiveIntensity={hovered || selected ? 0.3 : 0.04}
        />
      </mesh>

      {ring && (
        <mesh geometry={ring.geo} rotation={[Math.PI / 2 - 0.45, 0, 0]}>
          <meshBasicMaterial map={ring.map} side={DoubleSide} transparent depthWrite={false} />
        </mesh>
      )}

      {/* Larger invisible hit area so small planets are easy to click or tap */}
      <mesh
        onPointerOver={(e) => { e.stopPropagation(); setHovered(true); document.body.style.cursor = "pointer"; }}
        onPointerOut={() => { setHovered(false); document.body.style.cursor = ""; }}
        onClick={handleClick}
      >
        <sphereGeometry args={[size * 1.6 + 0.3, 16, 16]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>

      {selected && (
        <Billboard>
          <mesh>
            <ringGeometry args={[size * 1.9 + 0.3, size * 1.9 + 0.36, 64]} />
            <meshBasicMaterial color="#64E7FF" transparent opacity={0.85} />
          </mesh>
        </Billboard>
      )}

      <PlanetLabel planet={planet} height={size * 1.8 + 0.8} hovered={hovered} selected={selected} />
    </group>
  );
}
