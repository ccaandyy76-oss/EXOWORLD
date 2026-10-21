import { AnimatePresence, motion } from "framer-motion";
import type { Planet } from "../../types/planet";

const labels = ["INITIATING PLANETARY DESCENT", "ENTERING PLANETARY ENVIRONMENT"];

export default function EntrySequence({ planet, step }: { planet: Planet; step: number }) {
  return (
    <div className="entry" role="status" aria-live="polite">
      <p className="entry__planet">{planet.name.toUpperCase()}</p>
      <AnimatePresence mode="wait">
        <motion.p key={step} className="entry__label" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3 }}>
          {labels[Math.min(step, labels.length - 1)]}
        </motion.p>
      </AnimatePresence>
      <div className="entry__bar"><div className="entry__fill" style={{ width: `${((step + 1) / (labels.length + 1)) * 100}%` }} /></div>
      <p className="entry__note">Simulated interface. Not connected to any real spacecraft system.</p>
    </div>
  );
}
