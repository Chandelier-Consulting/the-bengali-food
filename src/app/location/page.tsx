"use client";
/* eslint-disable @next/next/no-img-element */

import { FaBagShopping, FaClock, FaListCheck, FaLocationDot, FaRoute, FaUtensils } from "react-icons/fa6";
import OrderOnlineButton from "@/components/OrderOnlineButton";
import Reveal from "@/components/Reveal";
import { useSiteContent } from "@/components/SiteContentProvider";

const steps = [
  [FaListCheck, "Choose your dishes", "Browse the current Bengali menu and pick the curries, rice, sides, and sweets for your table."],
  [FaBagShopping, "Pick a service", "Choose pickup or delivery directly on the live ordering menu."],
  [FaUtensils, "Enjoy at home", "Bring a complete Bengali meal to your weeknight dinner or gathering."],
] as const;

const facts = [
  [FaLocationDot, "Service area", "San Jose, CA", "Pickup and delivery through the live ordering menu."],
  [FaClock, "Ordering", "Live availability", "Use the ordering link for current hours, timing, and item availability."],
  [FaRoute, "Best path", "Order online first", "The live menu is the source of truth for checkout and fulfillment."],
] as const;

export default function LocationPage() {
  const { settings } = useSiteContent();

  if (!settings) return null;

  const heroImage = settings.images.Hero;

  return (
    <>
      <section className="relative isolate overflow-hidden bg-[var(--kitchen-night)] px-5 pb-20 pt-32 text-white">
        <img src={heroImage} alt="Bengali food spread" className="absolute inset-0 -z-20 h-full w-full object-cover opacity-35" />
        <div className="absolute inset-0 -z-10 bg-black/68" />
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[.9fr_1.1fr] lg:items-end">
          <Reveal>
            <p className="text-xs font-black uppercase tracking-[.2em] text-accent">Pickup and delivery</p>
            <h1 className="mt-5 max-w-4xl text-5xl font-black sm:text-7xl">Order The Bengali Food in San Jose.</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/80">
              Use the live ordering menu to choose pickup or delivery, check current availability, and complete checkout.
            </p>
            <OrderOnlineButton className="mt-8 inline-flex min-h-12 items-center rounded-lg bg-primary px-7 font-black text-primary-foreground hover:bg-primary/90" label="Order pickup or delivery" />
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-3">
            {facts.map(([Icon, label, value, detail]) => (
              <Reveal key={label} className="rounded-3xl border border-white/12 bg-white/8 p-5 backdrop-blur" variant="float">
                <Icon className="text-2xl text-accent" aria-hidden />
                <p className="mt-5 text-xs font-black uppercase tracking-[0.16em] text-white/64">{label}</p>
                <h2 className="mt-2 text-xl font-black text-white">{value}</h2>
                <p className="mt-1 text-sm font-semibold leading-6 text-white/78">{detail}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-surface px-5 py-20">
        <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-3">
          {steps.map(([Icon, title, body]) => (
            <Reveal key={title} className="border-t border-border pt-5" variant="float">
              <Icon className="text-2xl text-accent" aria-hidden />
              <h2 className="mt-4 text-2xl font-black text-secondary">{title}</h2>
              <p className="mt-2 text-sm font-semibold leading-6 text-muted">{body}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="px-5 py-20">
        <Reveal className="mx-auto grid max-w-6xl gap-6 rounded-3xl border border-border bg-surface p-6 md:grid-cols-[1fr_auto] md:items-center md:p-8" variant="float">
          <div>
            <p className="text-xs font-black uppercase tracking-[.2em] text-accent">Before checkout</p>
            <h2 className="mt-3 text-4xl font-black text-secondary">Use the ordering page for current availability.</h2>
            <p className="mt-3 max-w-2xl text-sm font-semibold leading-6 text-muted">
              Menu items can sell out or change. The live menu is the accurate place to confirm what is available today.
            </p>
          </div>
          <OrderOnlineButton className="inline-flex min-h-12 items-center rounded-lg bg-primary px-7 font-black text-primary-foreground hover:bg-primary/90" label="Open live menu" />
        </Reveal>
      </section>
    </>
  );
}
