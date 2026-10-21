import { useMemo } from "react";
import { BufferGeometry, Vector3 } from "three";
import { planets } from "../../data/planets";
import { ORBIT_RADIUS } from "../../data/sceneConfig";
import type { PlanetId } from "../../types/planet";

export default function PlanetaryOrbits({ selectedId }: { selectedId: PlanetId | null }) {
  const geometries = useMemo(
    () =>
      planets.map((p) => {
        const r = ORBIT_RADIUS[p.id];
        const points: Vector3[] = [];
        for (let i = 0; i < 160; i++) {
          const a = (i / 160) * Math.PI * 2;
          points.push(new Vector3(Math.cos(a) * r, 0, Math.sin(a) * r));
        }
        return new BufferGeometry().setFromPoints(points);
      }),
    []
  );

  return (
    <>
      {planets.map((p, i) => {
        const selected = p.id === selectedId;
        return (
          <lineLoop key={p.id} geometry={geometries[i]}>
            <lineBasicMaterial color={selected ? "#64E7FF" : "#9BA9C2"} transparent opacity={selected ? 0.9 : 0.22} />
          </lineLoop>
        );
      })}
    </>
  );
}
