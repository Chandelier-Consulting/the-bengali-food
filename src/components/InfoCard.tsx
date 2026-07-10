"use client";

import type { ReactNode } from "react";
import Reveal from "./Reveal";

type InfoCardProps = {
  icon?: ReactNode;
  title: string;
  children: ReactNode;
  className?: string;
  delay?: number;
};

export default function InfoCard({ icon, title, children, className = "", delay = 0 }: InfoCardProps) {
  return (
    <Reveal className={`overflow-hidden rounded-lg border border-border bg-[linear-gradient(145deg,rgba(33,31,29,0.96),rgba(24,23,21,0.96))] p-6 shadow-[0_18px_48px_rgba(0,0,0,0.18)] ${className}`} delay={delay}>
      {icon ? (
        <div className="mb-5 grid h-12 w-12 place-items-center rounded-md bg-primary/15 text-xl text-accent ring-1 ring-primary/20">
          {icon}
        </div>
      ) : null}
      <h2 className="text-xl font-extrabold text-secondary">{title}</h2>
      <div className="mt-3 text-sm leading-6 text-muted">{children}</div>
    </Reveal>
  );
}
