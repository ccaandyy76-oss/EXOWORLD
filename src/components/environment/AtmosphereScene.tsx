import { useEffect, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { AdditiveBlending, BackSide, DoubleSide, type Mesh } from "three";
import type { Planet } from "../../types/planet";
import { makePlanetTexture, makeRing } from "../../utils/textures";
import StarField from "../solar-system/StarField";

const R = 6;

/** Orbital view of a gas or ice giant. There is deliberately no ground to stand on. */
export default function AtmosphereScene({ planet }: { planet: Planet }) {
  const camera = useThree((s) => s.camera);
  const body = useRef<Mesh>(null);
  const texture = useMemo(() => makePlanetTexture(planet.id, planet.color), [planet.id, planet.color]);
  const ring = useMemo(() => (planet.id === "saturn" ? makeRing(R * 1.3, R * 2.3, planet.color) : null), [planet.id, planet.color]);
  const tilt = planet.id === "uranus" ? 1.7 : planet.id === "saturn" ? 0.45 : 0.1;

  useEffect(() => { camera.position.set(0, 3, 20); }, [camera]);
  useFrame((_, dt) => { if (body.current) body.current.rotation.y += dt * 0.03; });

  return (
    <>
      <color attach="background" args={["#03050B"]} />
      <ambientLight intensity={0.35} />
      <directionalLight position={[-20, 8, 14]} intensity={3.2} />
      <StarField count={1000} />
      <group rotation={[0, 0, tilt]}>
        <mesh ref={body}>
          <sphereGeometry args={[R, 64, 64]} />
          <meshStandardMaterial map={texture} roughness={1} />
        </mesh>
        <mesh scale={1.06}>
          <sphereGeometry args={[R, 48, 48]} />
          <meshBasicMaterial color={planet.color} side={BackSide} transparent opacity={0.22} blending={AdditiveBlending} depthWrite={false} />
        </mesh>
        {ring && (
          <mesh geometry={ring.geo} rotation={[Math.PI / 2, 0, 0]}>
            <meshBasicMaterial map={ring.map} side={DoubleSide} transparent depthWrite={false} />
          </mesh>
        )}
      </group>
      <OrbitControls makeDefault enableDamping enablePan={false} minDistance={R * 1.35} maxDistance={60} />
    </>
  );
}
