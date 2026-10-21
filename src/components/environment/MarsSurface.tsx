import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { BufferAttribute, Points } from "three";
import type { LookMode, SurfaceConfig } from "../../data/environments";
import SurfaceScene from "./SurfaceScene";

const COUNT = 260;

/** Slow drifting dust near the ground: the Mars-specific layer on top of the shared terrain scene. */
function DriftingDust() {
  const ref = useRef<Points>(null);
  const positions = useMemo(() => {
    const a = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      a[i * 3] = (Math.random() - 0.5) * 70;
      a[i * 3 + 1] = 1 + Math.random() * 10;
      a[i * 3 + 2] = (Math.random() - 0.5) * 70;
    }
    return a;
  }, []);

  useFrame((_, dt) => {
    const attr = ref.current?.geometry.getAttribute("position") as BufferAttribute | undefined;
    if (!attr) return;
    for (let i = 0; i < COUNT; i++) {
      let x = attr.getX(i) + dt * 1.6;
      if (x > 35) x -= 70;
      attr.setX(i, x);
    }
    attr.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#d8a780" size={2.2} sizeAttenuation={false} transparent opacity={0.35} depthWrite={false} />
    </points>
  );
}

export default function MarsSurface({ cfg, look }: { cfg: SurfaceConfig; look: LookMode }) {
  return (
    <SurfaceScene cfg={cfg} look={look}>
      <DriftingDust />
    </SurfaceScene>
  );
}
