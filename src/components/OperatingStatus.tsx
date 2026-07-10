"use client";

import { useEffect, useState } from "react";

const pacificTimeFormatter = new Intl.DateTimeFormat("en-US", {
  timeZone: "America/Los_Angeles",
  weekday: "short",
  hour: "numeric",
  minute: "numeric",
  hour12: false,
});

const weekdayIndex: Record<string, number> = {
  Sun: 0,
  Mon: 1,
  Tue: 2,
  Wed: 3,
  Thu: 4,
  Fri: 5,
  Sat: 6,
};

function getPacificParts(now: Date) {
  const parts = pacificTimeFormatter.formatToParts(now);
  const weekday = parts.find((part) => part.type === "weekday")?.value ?? "Sun";
  const hour = Number(parts.find((part) => part.type === "hour")?.value ?? "0");
  const minute = Number(parts.find((part) => part.type === "minute")?.value ?? "0");

  return {
    day: weekdayIndex[weekday] ?? 0,
    minutes: hour * 60 + minute,
  };
}

function getStatus(now: Date) {
  const { day, minutes } = getPacificParts(now);
  const opens = 8 * 60 + 30;
  const closes = 15 * 60;
  const isServiceDay = day >= 1 && day <= 6;
  const isOpen = isServiceDay && minutes >= opens && minutes < closes;

  if (isOpen) {
    return { label: "Open now", detail: "until 3 PM", tone: "open" as const };
  }

  if (isServiceDay && minutes < opens) {
    return { label: "Opens today", detail: "8:30 AM", tone: "soon" as const };
  }

  if (day === 0) {
    return { label: "Closed today", detail: "opens Mon", tone: "closed" as const };
  }

  return { label: "Closed now", detail: "opens 8:30 AM", tone: "closed" as const };
}

export default function OperatingStatus() {
  const [status, setStatus] = useState(() => getStatus(new Date()));

  useEffect(() => {
    const interval = window.setInterval(() => setStatus(getStatus(new Date())), 60_000);
    return () => window.clearInterval(interval);
  }, []);

  const dotClass = status.tone === "open" ? "bg-[#6D8B5F]" : status.tone === "soon" ? "bg-accent" : "bg-primary";

  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/8 px-3 py-2 text-left text-xs font-black uppercase tracking-[0.1em] text-white/76">
      <span className={`h-2.5 w-2.5 rounded-full ${dotClass}`} aria-hidden />
      <span>{status.label}</span>
      <span className="hidden text-white/42 sm:inline">{status.detail}</span>
    </div>
  );
}
