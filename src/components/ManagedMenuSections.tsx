/* eslint-disable @next/next/no-img-element */
import type { MenuCategory, MenuItem } from "@/lib/menu-data";
import { bengaliImages } from "@/lib/site-content";
import ManagedImage from "./ManagedImage";
import Reveal from "./Reveal";

const images = [bengaliImages.prawns, bengaliImages.fish, bengaliImages.vegetables];

export default function ManagedMenuSections({
  fallback,
  hiddenCategories = [],
}: {
  fallback: MenuCategory[];
  hiddenCategories?: string[];
}) {
  const categories = fallback.filter((category) => !hiddenCategories.includes(category.name));

  return (
    <section className="px-5 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-6xl gap-8">
        {categories.map((category, categoryIndex) => (
          <Reveal key={category.name} variant="float">
            <section id={category.name.toLowerCase().replaceAll(" ", "-").replaceAll("&", "and")} className="scroll-mt-36 overflow-hidden rounded-lg border border-border bg-surface shadow-[0_24px_80px_rgba(0,0,0,.24)]">
              <div className="grid lg:grid-cols-[360px_1fr]">
                <div className="relative min-h-72">
                  <ManagedImage imageKey={category.name} fallback={images[categoryIndex % images.length]} alt={`${category.name} at The Bengali Food`} className="absolute inset-0 h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/68 to-transparent" />
                  <div className="absolute bottom-5 left-5 right-5"><p className="text-xs font-black uppercase tracking-[0.18em] text-accent">The Bengali Food</p><h2 className="mt-2 text-4xl font-black leading-none text-white">{category.name}</h2></div>
                </div>
                <div className="p-5 sm:p-7">
                  {category.items.map((item: MenuItem) => (
                    <article key={`${category.name}-${item.name}`} className="grid gap-3 border-b border-border py-5 last:border-b-0 sm:grid-cols-[88px_1fr_auto] sm:items-center sm:gap-6">
                      <img src={item.imageSrc || images[categoryIndex % images.length]} alt={item.name} className="h-20 w-22 rounded-lg object-cover" loading="lazy" />
                      <div><h3 className="text-xl font-black text-secondary">{item.name}</h3><p className="mt-2 max-w-2xl text-sm font-semibold leading-6 text-muted">{item.description}</p></div>
                      <p className="text-xl font-black text-primary sm:text-right">{item.price}</p>
                    </article>
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
