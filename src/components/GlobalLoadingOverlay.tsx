"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

export default function GlobalLoadingOverlay({ visible }: { visible: boolean }) {
  const prefersReducedMotion = useReducedMotion();
  const transition = prefersReducedMotion ? { duration: 0.12 } : { duration: 0.72, ease: [0.22, 1, 0.36, 1] as const };

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          className="fixed inset-0 z-[100] grid place-items-center overflow-hidden bg-[var(--kitchen-night)] px-6 text-white"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -28, clipPath: "inset(0 0 100% 0)" }}
          transition={transition}
          role="status"
          aria-live="polite"
          aria-label="Loading The Bengali Food"
        >
          <motion.div
            className="absolute inset-x-0 top-0 h-px bg-primary"
            initial={{ scaleX: 0, transformOrigin: "left" }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.9, ease: "easeInOut" }}
          />
          <motion.div
            className="grid gap-5 text-center"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
            animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -14 }}
            transition={transition}
          >
            <p className="font-heading text-4xl font-extrabold tracking-normal sm:text-6xl">The Bengali Food</p>
            <div className="mx-auto h-px w-24 bg-primary" />
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
