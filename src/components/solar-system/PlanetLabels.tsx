import { Html } from "@react-three/drei";
import type { Planet } from "../../types/planet";

interface Props {
  planet: Planet;
  height: number;
  hovered: boolean;
  selected: boolean;
}

/** Name label (selected) or compact preview (hovered), anchored above a planet. */
export default function PlanetLabel({ planet, height, hovered, selected }: Props) {
  if (!hovered && !selected) return null;
  return (
    <Html position={[0, height, 0]} center pointerEvents="none" zIndexRange={[5, 0]}>
      <div className="planet-label">
        <strong>{planet.name}</strong>
        {hovered && (
          <span>
            {planet.type} · {planet.averageTempC} °C · click to explore
          </span>
        )}
      </div>
    </Html>
  );
}
