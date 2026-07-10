"use client";

import { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase-client";
import { orderLinks } from "@/lib/site-content";

type Variant = "dark" | "light" | "footer";

const styles: Record<Variant, string> = {
  dark: "rounded-full border border-border bg-surface px-5 py-3 text-sm font-black text-secondary transition hover:border-primary hover:bg-primary hover:text-white",
  light: "rounded-full border border-border bg-white px-5 py-3 text-sm font-black text-secondary transition hover:border-primary hover:bg-primary hover:text-white",
  footer: "rounded-full border border-white/10 px-3 py-2 text-xs font-black text-white/78 hover:text-white",
};

export default function ManagedOrderLinks({ variant = "dark" }: { variant?: Variant }) {
  const [links, setLinks] = useState(orderLinks);

  useEffect(() => {
    if (!db) return;
    return onSnapshot(doc(db, "siteContent", "settings"), (snapshot) => {
      const nextLinks = snapshot.data()?.orderLinks as typeof orderLinks | undefined;
      if (nextLinks?.length) setLinks(nextLinks);
    });
  }, []);

  return (
    <>
      {links.map((link) => (
        <a key={link.label} href={link.href} target="_blank" rel="noreferrer" className={styles[variant]}>
          {link.label}
        </a>
      ))}
    </>
  );
}
