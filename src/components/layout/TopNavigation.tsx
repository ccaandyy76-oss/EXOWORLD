import { Settings, Maximize } from "lucide-react";
import IconButton from "../ui/IconButton";

// Only the current view is active. Other sections are disabled until their phase is built.
export default function TopNavigation({ onHabitability }: { onHabitability?: () => void }) {
  const links = [
    { label: "SOLAR SYSTEM", active: true, current: true, onClick: undefined as (() => void) | undefined },
    { label: "MISSIONS", active: false, current: false, onClick: undefined },
    { label: "HABITABILITY", active: !!onHabitability, current: false, onClick: onHabitability },
    { label: "ABOUT", active: false, current: false, onClick: undefined },
  ];

  return (
    <header className="topnav">
      <div className="brand">
        <span className="brand__name">EXOWORLD</span>
        <span className="brand__tag">BEYOND EARTH</span>
      </div>
      <nav aria-label="Main">
        <ul className="topnav__links">
          {links.map((l) => (
            <li key={l.label}>
              <button
                type="button"
                className="navlink"
                aria-current={l.current ? "page" : undefined}
                onClick={l.onClick}
                aria-disabled={!l.active}
                tabIndex={l.active ? 0 : -1}
              >
                {l.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <div className="topnav__actions">
        {/* Both controls stay disabled until they are implemented. */}
        <IconButton label="Fullscreen (not available yet)" disabled><Maximize size={18} /></IconButton>
        <IconButton label="Settings (not available yet)" disabled><Settings size={18} /></IconButton>
      </div>
    </header>
  );
}
