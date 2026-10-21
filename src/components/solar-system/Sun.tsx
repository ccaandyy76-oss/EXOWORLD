import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { Mesh, Sprite } from "three";
import { AdditiveBlending } from "three";
import { SUN_RADIUS } from "../../data/sceneConfig";
import { makeGlowTexture, makeSunTexture } from "../../utils/textures";

export default function Sun() {
  const body = useRef<Mesh>(null);
  const halo = useRef<Sprite>(null);
  const sunMap = useMemo(makeSunTexture, []);
  const glowMap = useMemo(makeGlowTexture, []);

  useFrame(({ clock }) => {
    if (body.current) body.current.rotation.y = clock.elapsedTime * 0.03;
    if (halo.current) {
      const s = SUN_RADIUS * 7 * (1 + Math.sin(clock.elapsedTime * 0.8) * 0.03);
      halo.current.scale.set(s, s, 1);
    }
  });

  return (
    <group>
      <mesh ref={body}>
        <sphereGeometry args={[SUN_RADIUS, 48, 48]} />
        <meshBasicMaterial map={sunMap} color="#ffd9a0" />
      </mesh>
      <sprite ref={halo}>
        <spriteMaterial map={glowMap} blending={AdditiveBlending} depthWrite={false} transparent />
      </sprite>
      <pointLight intensity={5} decay={0} color="#fff1da" />
    </group>
  );
}
