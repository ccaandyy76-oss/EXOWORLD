import { Canvas } from "@react-three/fiber";
import { environments, type LookMode } from "../../data/environments";
import type { Planet } from "../../types/planet";
import AtmosphereScene from "./AtmosphereScene";
import MarsSurface from "./MarsSurface";
import SurfaceScene from "./SurfaceScene";

/** The only WebGL canvas while exploring. Switching planets swaps the scene inside it (key = planet id). */
export default function PlanetEnvironmentCanvas({ planet, look }: { planet: Planet; look: LookMode }) {
  const surface = environments[planet.id].surface;
  return (
    <Canvas camera={{ position: [0, 2, 20], fov: 60, near: 0.1, far: 1200 }} dpr={[1, 1.75]}>
      {!surface ? (
        <AtmosphereScene key={planet.id} planet={planet} />
      ) : planet.id === "mars" ? (
        <MarsSurface key={planet.id} cfg={surface} look={look} />
      ) : (
        <SurfaceScene key={planet.id} cfg={surface} look={look} />
      )}
    </Canvas>
  );
}
