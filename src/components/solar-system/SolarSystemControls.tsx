import { Pause, Play, RotateCcw } from "lucide-react";
import { planets } from "../../data/planets";
import type { SpeedMode } from "../../data/sceneConfig";
import type { PlanetId } from "../../types/planet";

interface Props {
  paused: boolean;
  speedMode: SpeedMode;
  selectedId: PlanetId | null;
  onTogglePause: () => void;
  onSpeed: (m: SpeedMode) => void;
  onReset: () => void;
  onSelect: (id: PlanetId) => void;
}

const modes: { id: SpeedMode; label: string }[] = [
  { id: "slow", label: "SLOW" },
  { id: "normal", label: "NORMAL" },
  { id: "fast", label: "FAST" },
];

export default function SolarSystemControls({ paused, speedMode, selectedId, onTogglePause, onSpeed, onReset, onSelect }: Props) {
  return (
    <div className="controls glass" role="toolbar" aria-label="Solar system controls">
      <div className="controls__row">
        <button type="button" className="chip" onClick={onTogglePause} aria-label={paused ? "Resume simulation" : "Pause simulation"}>
          {paused ? <Play size={14} /> : <Pause size={14} />}
          {paused ? "RESUME" : "PAUSE"}
        </button>
        {modes.map((m) => (
          <button key={m.id} type="button" className="chip" aria-pressed={speedMode === m.id && !paused} onClick={() => onSpeed(m.id)}>
            {m.label}
          </button>
        ))}
        <button type="button" className="chip chip--accent" onClick={onReset}>
          <RotateCcw size={14} /> RESET VIEW
        </button>
      </div>
      <div className="controls__row controls__planets" aria-label="Select a planet">
        {planets.map((p) => (
          <button key={p.id} type="button" className="chip" aria-pressed={selectedId === p.id} onClick={() => onSelect(p.id)}>
            <span className="chip__dot" style={{ background: p.color }} />
            {p.name}
          </button>
        ))}
      </div>
      <p className="controls__note">Visualization not to scale: sizes, distances and speeds are compressed.</p>
    </div>
  );
}
