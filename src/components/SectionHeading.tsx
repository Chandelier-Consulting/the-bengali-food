"use client";

import Reveal from "./Reveal";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
};

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  className = "",
}: SectionHeadingProps) {
  return (
    <Reveal className={`${align === "center" ? "mx-auto text-center" : ""} max-w-3xl ${className}`}>
      {eyebrow ? (
        <p className="mb-3 text-sm font-extrabold uppercase tracking-[0.14em] text-accent">{eyebrow}</p>
      ) : null}
      <h1 className="text-2xl font-extrabold leading-tight tracking-normal text-secondary sm:text-3xl">
        {title}
      </h1>
      {subtitle ? <p className="mt-4 text-base leading-7 text-muted">{subtitle}</p> : null}
    </Reveal>
  );
}
