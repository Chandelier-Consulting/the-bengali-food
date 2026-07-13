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
      <section className="px-5 pb-16 pt-32">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-black uppercase tracking-[.2em] text-accent">Live menu</p>
          <h1 className="mt-5 max-w-4xl text-5xl font-black text-secondary sm:text-7xl">Bengali dishes, ready when you are.</h1>
          <p className="mt-5 max-w-2xl text-lg font-semibold leading-8 text-muted">
            Explore the current menu, then open the live ordering page for availability, pickup, delivery, and checkout.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <OrderOnlineButton className="inline-flex min-h-12 items-center rounded-lg bg-primary px-7 font-black text-primary-foreground hover:bg-primary/90" label="Open live ordering menu" />
            <Link href="/group-orders" className="inline-flex min-h-12 items-center rounded-lg border border-border px-7 font-black text-secondary">Plan a group order</Link>
          </div>
        </div>
      </section>

      <section className="sticky top-[72px] z-30 border-y border-border bg-background/92 px-5 py-4 backdrop-blur-xl">
        <nav aria-label="Menu categories" className="mx-auto flex max-w-6xl gap-2 overflow-x-auto">
          {categories.map((name) => (
            <a key={name} href={`#${name.toLowerCase().replaceAll(" ", "-").replaceAll("&", "and")}`} className="shrink-0 rounded-lg border border-border px-5 py-3 text-sm font-black">
              {name}
            </a>
          ))}
        </nav>
      </section>

      <ManagedMenuSections />

      <section className="px-5 pb-20">
        <Reveal className="mx-auto grid max-w-6xl gap-6 rounded-3xl border border-border bg-surface p-6 md:grid-cols-[1fr_auto] md:items-center md:p-8" variant="float">
          <div>
            <p className="text-xs font-black uppercase tracking-[.2em] text-accent">Checkout</p>
            <h2 className="mt-3 text-4xl font-black text-secondary">Use the live menu before placing the order.</h2>
            <p className="mt-3 max-w-2xl text-sm font-semibold leading-6 text-muted">
              Dashboard menu items power this page. The ordering provider remains the source for final availability and checkout.
            </p>
          </div>
          <OrderOnlineButton className="inline-flex min-h-12 items-center rounded-lg bg-primary px-7 font-black text-primary-foreground hover:bg-primary/90" label="Order now" />
        </Reveal>
      </section>
    </>
  );
}
