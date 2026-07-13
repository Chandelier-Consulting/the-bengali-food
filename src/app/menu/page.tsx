"use client";

import Link from "next/link";
import ManagedMenuSections from "@/components/ManagedMenuSections";
import OrderOnlineButton from "@/components/OrderOnlineButton";
import Reveal from "@/components/Reveal";
import { useSiteContent } from "@/components/SiteContentProvider";

export default function MenuPage() {
  const { menuItems, ready } = useSiteContent();

  if (!ready) return null;

  const categories = [...new Set(menuItems.map((item) => item.category))];

  return (
    <>
      <section className="section-shell pb-12 pt-32">
        <div className="section-inner">
          <p className="eyebrow">Live menu</p>
          <h1 className="mt-4 max-w-4xl text-5xl font-extrabold tracking-tight text-secondary sm:text-7xl">
            Bengali dishes, ready when you are.
          </h1>
          <p className="body-copy mt-5 max-w-2xl">
            Explore Bengali favorites, check today&apos;s availability, then choose pickup or delivery on the live ordering menu.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <OrderOnlineButton className="inline-flex min-h-12 items-center rounded-lg bg-primary px-7 font-black text-primary-foreground hover:bg-primary/90" label="Open live ordering menu" />
            <Link href="/group-orders" className="inline-flex min-h-12 items-center rounded-lg border border-border px-7 font-black text-secondary">Plan a group order</Link>
          </div>
        </div>
      </section>

      <section className="sticky top-[72px] z-30 border-y border-border bg-background/95 px-5 py-3 backdrop-blur-xl">
        <nav aria-label="Menu categories" className="mx-auto flex max-w-6xl gap-2 overflow-x-auto">
          {categories.map((name) => (
            <a key={name} href={`#${name.toLowerCase().replaceAll(" ", "-").replaceAll("&", "and")}`} className="shrink-0 rounded-lg border border-border px-5 py-3 text-sm font-black">
              {name}
            </a>
          ))}
        </nav>
      </section>

      <ManagedMenuSections />

      <section className="bg-primary px-5 py-16 text-primary-foreground">
        <Reveal className="mx-auto grid max-w-6xl gap-6 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <p className="text-xs font-black uppercase tracking-[.2em] text-primary-foreground/72">Checkout</p>
            <h2 className="mt-3 text-4xl font-black">Use the live menu before placing the order.</h2>
            <p className="mt-3 max-w-2xl text-sm font-semibold leading-6 text-primary-foreground/80">
              Review dishes and current availability before choosing pickup or delivery.
            </p>
          </div>
          <OrderOnlineButton className="inline-flex min-h-12 items-center rounded-lg bg-foreground px-7 font-black text-background hover:bg-foreground/90" label="Order now" />
        </Reveal>
      </section>
    </>
  );
}
