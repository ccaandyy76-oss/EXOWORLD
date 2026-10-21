import { motion } from "framer-motion";

export default function LoadingScreen() {
  return (
    <motion.div className="loading" role="status" exit={{ opacity: 0 }} transition={{ duration: 0.6 }}>
      <div>
        <div className="loading__name">EXOWORLD</div>
        <div className="loading__bar" />
        <div className="loading__text">INITIALIZING</div>
      </div>
    </motion.div>
  );
}
