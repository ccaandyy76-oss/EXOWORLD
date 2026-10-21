import { useEffect, useLayoutEffect, useMemo, useRef, type ReactNode } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { AdditiveBlending, BackSide, InstancedMesh, Object3D, Vector3 } from "three";
import type { LookMode, SurfaceConfig } from "../../data/environments";
import { buildTerrain, makeHeightFn, seededRandom } from "../../utils/terrain";
import { makeGlowTexture, makeSkyTexture, makeSoftTexture } from "../../utils/textures";
import StarField from "../solar-system/StarField";

type GroundFn = (x: number, z: number) => number;
const EYE = 1.7;

/** Two camera modes: stand and look around, or orbit the landscape. Both stay above the ground. */
function SurfaceControls({ look, groundAt }: { look: LookMode; groundAt: GroundFn }) {
  const camera = useThree((s) => s.camera);
  const base = groundAt(0, 0);

  useEffect(() => {
    if (look === "surface") camera.position.set(0, base + EYE, 0.1);
    else camera.position.set(0, base + 14, 30);
  }, [look, camera, base]);

  useFrame(() => {
    const min = groundAt(camera.position.x, camera.position.z) + (look === "surface" ? 1.2 : 2);
    if (camera.position.y < min) camera.position.y = min;
  });

  // Surface mode orbits a tiny 0.1 radius around the eye point, which behaves like turning your head.
  return look === "surface" ? (
    <OrbitControls key="surface" makeDefault target={[0, base + EYE, 0]} enableZoom={false} enablePan={false} rotateSpeed={-0.35} minDistance={0.1} maxDistance={0.1} minPolarAngle={Math.PI * 0.4} maxPolarAngle={Math.PI * 0.72} />
  ) : (
    <OrbitControls key="overview" makeDefault target={[0, base + 1, 0]} enablePan={false} enableDamping minDistance={8} maxDistance={70} maxPolarAngle={Math.PI * 0.48} />
  );
}

export default function SurfaceScene({ cfg, look, children }: { cfg: SurfaceConfig; look: LookMode; children?: ReactNode }) {
  const groundAt = useMemo(() => makeHeightFn(cfg), [cfg]);
  const terrain = useMemo(() => buildTerrain(cfg, groundAt), [cfg, groundAt]);
  const skyMap = useMemo(() => makeSkyTexture(cfg.skyTop, cfg.skyHorizon), [cfg]);
  const glow = useMemo(makeGlowTexture, []);
  const soft = useMemo(makeSoftTexture, []);
  const sunDir = useMemo(() => new Vector3(...cfg.sunDir).normalize(), [cfg]);
  const rocks = useRef<InstancedMesh>(null);

  const clouds = useMemo(() => {
    const rand = seededRandom(cfg.seed + 5);
    return Array.from({ length: cfg.clouds?.count ?? 0 }, () => {
      const a = rand() * Math.PI * 2, d = 60 + rand() * 180;
      return { pos: [Math.cos(a) * d, (cfg.clouds?.height ?? 40) + (rand() - 0.5) * 10, Math.sin(a) * d] as [number, number, number], scale: [40 + rand() * 50, 12 + rand() * 14, 1] as [number, number, number] };
    });
  }, [cfg]);

  useLayoutEffect(() => {
    const mesh = rocks.current;
    if (!mesh) return;
    const rand = seededRandom(cfg.seed + 99);
    const o = new Object3D();
    for (let i = 0; i < cfg.rocks; i++) {
      const a = rand() * Math.PI * 2, d = 4 + rand() ** 1.5 * 90, s = 0.25 + rand() * 1.1;
      const x = Math.cos(a) * d, z = Math.sin(a) * d;
      o.position.set(x, groundAt(x, z) + s * 0.15, z);
      o.scale.set(s * (1 + rand() * 0.6), s * 0.6, s);
      o.rotation.set(rand() * 3, rand() * 3, rand() * 3);
      o.updateMatrix();
      mesh.setMatrixAt(i, o.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
  }, [cfg, groundAt]);

  return (
    <>
      <color attach="background" args={[cfg.skyHorizon]} />
      <fogExp2 attach="fog" args={[cfg.fog, cfg.fogDensity]} />
      <ambientLight intensity={cfg.ambient} />
      <directionalLight position={sunDir.clone().multiplyScalar(100)} intensity={cfg.sunIntensity} color={cfg.sunColor} />

      <mesh>
        <sphereGeometry args={[380, 24, 16]} />
        <meshBasicMaterial map={skyMap} side={BackSide} fog={false} depthWrite={false} />
      </mesh>
      {cfg.stars && <StarField count={900} />}

      {cfg.sunSize > 0 && (
        <group position={sunDir.clone().multiplyScalar(250)}>
          <sprite scale={[cfg.sunSize, cfg.sunSize, 1]}>
            <spriteMaterial map={glow} color={cfg.sunColor} blending={AdditiveBlending} depthWrite={false} transparent fog={false} />
          </sprite>
          <sprite scale={[cfg.sunSize * 0.25, cfg.sunSize * 0.25, 1]}>
            <spriteMaterial map={glow} color="#ffffff" blending={AdditiveBlending} depthWrite={false} transparent fog={false} />
          </sprite>
        </group>
      )}

      {clouds.map((c, i) => (
        <sprite key={i} position={c.pos} scale={c.scale}>
          <spriteMaterial map={soft} color={cfg.clouds?.color} opacity={cfg.clouds?.opacity} transparent depthWrite={false} />
        </sprite>
      ))}

      <mesh geometry={terrain}>
        <meshStandardMaterial vertexColors roughness={1} />
      </mesh>
      {cfg.sea && (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.3, 0]}>
          <planeGeometry args={[600, 600]} />
          <meshStandardMaterial color="#1f5fa8" roughness={0.25} metalness={0.1} transparent opacity={0.92} />
        </mesh>
      )}

      <instancedMesh ref={rocks} args={[undefined, undefined, cfg.rocks]}>
        <dodecahedronGeometry args={[1, 0]} />
        <meshStandardMaterial color={cfg.rock} roughness={1} flatShading />
      </instancedMesh>

      {children}
      <SurfaceControls look={look} groundAt={groundAt} />
    </>
  );
}
