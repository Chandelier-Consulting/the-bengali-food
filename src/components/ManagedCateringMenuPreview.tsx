"use client";

/* eslint-disable @next/next/no-img-element */
import { useEffect, useMemo, useState } from "react";
import { collection, doc, onSnapshot, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase-client";
import { menuCategories, type MenuItem } from "@/lib/menu-data";
import { resolveCateringMenuHeading } from "@/lib/section-content";
import Reveal from "./Reveal";

type ManagedMenuItem = MenuItem & { category: string; visible?: boolean; sortOrder?: number; imageSrc?: string };

const fallbackItems = menuCategories.find((category) => category.name === "Catering")?.items ?? [];

function resolveCateringImage(item: MenuItem | ManagedMenuItem) {
  return typeof item.imageSrc === "string" && item.imageSrc ? item.imageSrc : fallbackItems[0]?.imageSrc ?? "";
}

export default function ManagedCateringMenuPreview() {
  const [heading, setHeading] = useState(resolveCateringMenuHeading());
  const [items, setItems] = useState<ManagedMenuItem[]>([]);

  useEffect(() => {
    const settingsUnsub = !db
      ? undefined
      : onSnapshot(doc(db, "siteContent", "settings"), (snapshot) => {
      setHeading(resolveCateringMenuHeading(snapshot.data()?.cateringMenuHeading as string | undefined));
    });

    const itemsUnsub = !db
      ? undefined
      : onSnapshot(query(collection(db, "menuItems"), where("visible", "==", true)), (snapshot) => {
          setItems(snapshot.docs.map((item) => item.data() as ManagedMenuItem));
        });

    return () => {
      settingsUnsub?.();
      itemsUnsub?.();
    };
  }, []);

  const cateringItems = useMemo(() => {
    const liveItems = items
      .filter((item) => item.category === "Catering")
      .sort((left, right) => (left.sortOrder ?? 0) - (right.sortOrder ?? 0));

    return liveItems.length ? liveItems : fallbackItems;
  }, [items]);

  return (
    <section className="px-5 py-20 sm:px-6 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="text-xs font-black uppercase tracking-[0.2em] text-accent">Catering menu</p>
          <h2 className="mt-4 text-4xl font-black leading-none tracking-[-0.03em] text-secondary sm:text-6xl">{heading}</h2>
          <p className="mt-5 max-w-2xl text-base font-semibold leading-7 text-muted">
            These favorites travel well, feed groups cleanly, and make it easy to start the order before you add anything else.
          </p>
        </Reveal>
        <div className="mt-10 grid gap-4">
          {cateringItems.map((item) => (
            <Reveal key={item.name} className="rounded-3xl border border-border bg-surface p-5" variant="float">
              <article className="grid gap-4 sm:grid-cols-[160px_1fr_auto] sm:items-center sm:gap-6">
                <img
                  src={resolveCateringImage(item)}
                  alt={item.name}
                  className="h-32 w-full rounded-2xl object-cover"
                  loading="lazy"
                />
                <div>
                  <h3 className="text-2xl font-black text-secondary">{item.name}</h3>
                  <p className="mt-2 text-sm font-semibold leading-6 text-muted">{item.description}</p>
                </div>
                <p className="text-xl font-black text-primary sm:text-right">{item.price}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
