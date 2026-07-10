"use client";

/* eslint-disable @next/next/no-img-element */
import { useEffect, useMemo, useState } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase-client";
import type { MenuCategory, MenuItem } from "@/lib/menu-data";
import { tomysImages } from "@/lib/site-content";
import ManagedImage from "./ManagedImage";
import Reveal from "./Reveal";

type ManagedMenuItem = MenuItem & { category: string; visible?: boolean; sortOrder?: number; imageSrc?: string };

const images = [tomysImages.breakfastBurrito, tomysImages.fishTacos, tomysImages.shrimpTacos, tomysImages.torta, tomysImages.cateringSalmon];

function resolveItemImage(item: MenuItem | ManagedMenuItem, categoryFallback: string) {
  return typeof item.imageSrc === "string" && item.imageSrc ? item.imageSrc : categoryFallback;
}

export default function ManagedMenuSections({
  fallback,
  hiddenCategories = [],
}: {
  fallback: MenuCategory[];
  hiddenCategories?: string[];
}) {
  const [items, setItems] = useState<ManagedMenuItem[]>([]);

  useEffect(() => {
    if (!db) return;
    return onSnapshot(query(collection(db, "menuItems"), where("visible", "==", true)), (snapshot) => {
      setItems(snapshot.docs.map((doc) => doc.data() as ManagedMenuItem));
    });
  }, []);

  const categories = useMemo(() => {
    if (!items.length) return fallback.filter((category) => !hiddenCategories.includes(category.name));
    const fallbackOrder = fallback.map((category) => category.name);
    const names = Array.from(new Set(items.map((item) => item.category))).sort((left, right) => {
      const leftIndex = fallbackOrder.indexOf(left);
      const rightIndex = fallbackOrder.indexOf(right);

      if (leftIndex === -1 && rightIndex === -1) return left.localeCompare(right);
      if (leftIndex === -1) return 1;
      if (rightIndex === -1) return -1;
      return leftIndex - rightIndex;
    });

    return names
      .filter((name) => !hiddenCategories.includes(name))
      .map((name) => ({
        name,
        items: items
          .filter((item) => item.category === name)
          .sort((left, right) => (left.sortOrder ?? 0) - (right.sortOrder ?? 0)),
      }));
  }, [fallback, hiddenCategories, items]);

  return (
    <section className="px-5 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-6xl gap-8">
        {categories.map((category, categoryIndex) => (
          <Reveal key={category.name} variant="float">
            <section id={category.name.toLowerCase().replaceAll(" ", "-")} className="scroll-mt-36 overflow-hidden rounded-[2rem] border border-border bg-surface shadow-[0_24px_80px_rgba(0,0,0,.24)]">
              <div className="grid lg:grid-cols-[360px_1fr]">
                <div className="relative min-h-72">
                  <ManagedImage imageKey={category.name} fallback={images[categoryIndex % images.length]} alt={`${category.name} at Tomy's Kitchen`} className="absolute inset-0 h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/68 to-transparent" />
                  <div className="absolute bottom-5 left-5 right-5">
                    <p className="text-xs font-black uppercase tracking-[0.18em] text-accent">Tomy&apos;s Kitchen</p>
                    <h2 className="mt-2 text-4xl font-black leading-none text-white">{category.name}</h2>
                  </div>
                </div>
                <div className="p-5 sm:p-7">
                  {category.items.map((item) => (
                    <Reveal key={`${category.name}-${item.name}`} className="border-b border-border last:border-b-0" variant="float">
                      <article className="grid gap-3 py-5 sm:grid-cols-[88px_1fr_auto] sm:items-center sm:gap-6">
                        <img
                          src={resolveItemImage(item, images[categoryIndex % images.length])}
                          alt={item.name}
                          className="h-20 w-22 rounded-2xl object-cover"
                          loading="lazy"
                        />
                        <div>
                          <h3 className="text-xl font-black text-secondary">{item.name}</h3>
                          <p className="mt-2 max-w-2xl text-sm font-semibold leading-6 text-muted">{item.description}</p>
                        </div>
                        <p className="text-xl font-black text-primary sm:text-right">{item.price}</p>
                      </article>
                    </Reveal>
                  ))}
                </div>
              </div>
            </section>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
