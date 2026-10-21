import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import LoadingScreen from "./components/layout/LoadingScreen";
import MainLayout from "./components/layout/MainLayout";

export default function App() {
  const [ready, setReady] = useState(false);

  // Phase 2 will replace this timer with real asset loading progress.
  useEffect(() => {
    const id = window.setTimeout(() => setReady(true), 1200);
    return () => window.clearTimeout(id);
  }, []);

  return (
    <>
      <MainLayout />
      <AnimatePresence>{!ready && <LoadingScreen />}</AnimatePresence>
    </>
  );
}
