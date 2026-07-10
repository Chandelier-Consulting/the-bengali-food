"use client";

import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  variant?: "rise" | "float";
};

export default function Reveal({ children, className = "", delay = 0, variant = "rise" }: RevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const [visible, setVisible] = useState(prefersReducedMotion);

  useEffect(() => {
    if (prefersReducedMotion || !ref.current) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio >= 0.4) {
          setVisible(true);
          return;
        }

        if (entry.intersectionRatio <= 0.1) {
          setVisible(false);
        }
      },
      { threshold: [0, 0.1, 0.4, 1] },
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [prefersReducedMotion]);

  const hidden = variant === "float" ? { opacity: 0, y: 28, scale: 0.985 } : { opacity: 0, y: 22 };
  const shown = variant === "float" ? { opacity: 1, y: 0, scale: 1 } : { opacity: 1, y: 0 };

  return (
    <motion.div
      ref={ref}
      initial={hidden}
      animate={visible ? shown : hidden}
      transition={{ duration: 0.55, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
