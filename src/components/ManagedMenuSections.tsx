"use client";
/* eslint-disable @next/next/no-img-element */

import { useSiteContent } from "./SiteContentProvider";
import Reveal from "./Reveal";
import type { MenuItem } from "@/lib/menu-data";

function sectionId(name: string) {
  return name.toLowerCase().replaceAll(" ", "-").replaceAll("&", "and");
}

function MenuItemPhoto({ item, fallback }: { item: MenuItem; fallback: string }) {
  const src = item.imageSrc || fallback;

  return (
    <div className="relative h-full min-h-48 overflow-hidden rounded-lg border border-border bg-background">
      {src ? (
        <img src={src} alt={item.name} className="h-full w-full object-cover" loading="lazy" />
      ) : (
        <div className="grid h-full place-items-center px-4 text-center text-xs font-black uppercase tracking-[0.14em] text-muted-foreground">
          Photo coming soon
        </div>
      )}
    </div>
  );
}

export default function ManagedMenuSections() {
  const { settings, menuItems, ready } = useSiteContent();

  if (!ready || !settings) {
    return null;
  }

  const groups = Array.from(new Set(menuItems.map((item) => item.category))).map((name) => [
    name,
    menuItems.filter((item) => item.category === name),
  ] as const);

  return (
    <section className="section-shell">
      <div className="section-inner grid gap-16">
        {groups.map(([name, items]) => {
          const fallback = settings.images[name] || settings.images.Hero;

          return (
            <Reveal key={name}>
              <section id={sectionId(name)} className="scroll-mt-32">
                <div className="mb-8 grid gap-4 border-b border-border pb-5 md:grid-cols-[1fr_auto] md:items-end">
                  <div>
                    <p className="eyebrow">Menu section</p>
                    <h2 className="mt-2 text-4xl font-extrabold tracking-tight text-secondary">{name}</h2>
                  </div>
                  <p className="text-sm font-semibold text-muted-foreground">{items.length} items</p>
                </div>
                <div className="grid gap-5 md:grid-cols-2">
                  {items.map((item, index) => (
                    <Reveal key={item.id} className="h-full" variant="float" delay={index * 0.04}>
                      <article key={item.id} className="menu-card grid h-full gap-4 p-3 sm:grid-cols-[150px_1fr]">
                        <MenuItemPhoto item={item} fallback={fallback} />
                        <div className="flex min-w-0 flex-col justify-between p-1">
                          <div>
                            <div className="flex items-start justify-between gap-4">
                              <h3 className="text-lg font-extrabold leading-tight text-secondary">{item.name}</h3>
                              <p className="shrink-0 font-extrabold tabular-nums text-primary">{item.price}</p>
                            </div>
                            <p className="mt-2 text-sm font-medium leading-6 text-muted-foreground">{item.description}</p>
                          </div>
                        </div>
                      </article>
                    </Reveal>
                  ))}
                </div>
              </section>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
