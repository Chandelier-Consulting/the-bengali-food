"use client";
/* eslint-disable @next/next/no-img-element */

import { FaBowlFood, FaHeart, FaLeaf, FaPeopleGroup } from "react-icons/fa6";
import OrderOnlineButton from "@/components/OrderOnlineButton";
import Reveal from "@/components/Reveal";
import { useSiteContent } from "@/components/SiteContentProvider";

const values = [
  [FaBowlFood, "Fish at the center", "Mustard, rohu, hilsa, prawns, and rice are the anchors of the Bengali table."],
  [FaLeaf, "Vegetable balance", "Lentils and vegetables keep the meal grounded and make the curries easier to share."],
  [FaHeart, "Home-style comfort", "The goal is food that feels generous, familiar, and easy to bring home."],
  [FaPeopleGroup, "Shared plates", "Bengali meals make sense as a spread, especially for families and groups."],
] as const;

export default function AboutPage() {
  const { settings, menuItems } = useSiteContent();

  if (!settings) return null;

  const categories = [...new Set(menuItems.map((item) => item.category))];
  const heroImage = settings.images.Hero;
  const fishImage = settings.images["Fish & Seafood"] || heroImage;

  return (
    <>
      <section className="relative isolate overflow-hidden bg-[var(--kitchen-night)] px-5 pb-20 pt-32 text-white">
        <img src={heroImage} alt="Bengali food" className="absolute inset-0 -z-20 h-full w-full object-cover opacity-30" />
        <div className="absolute inset-0 -z-10 bg-black/68" />
        <div className="relative mx-auto max-w-6xl">
          <p className="text-xs font-black uppercase tracking-[.2em] text-accent">Our table</p>
          <h1 className="mt-5 max-w-4xl text-5xl font-black sm:text-7xl">Bengali food has a language of its own.</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/80">
            Mustard, fish, lentils, seasonal vegetables, rice, and carefully built spice are at the center of the cooking.
          </p>
        </div>
      </section>

      <section className="px-5 py-24">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[.95fr_1.05fr] lg:items-center">
          <Reveal className="overflow-hidden rounded-3xl border border-border bg-surface" variant="float">
            <img src={fishImage} alt="Bengali fish curry" className="h-[430px] w-full object-cover" />
          </Reveal>
          <Reveal>
            <p className="text-xs font-black uppercase tracking-[.2em] text-accent">What we cook around</p>
            <h2 className="mt-4 text-4xl font-black text-secondary sm:text-6xl">A full meal, not a single dish.</h2>
            <p className="mt-5 text-base font-semibold leading-7 text-muted">
              Bengali food is strongest when the table has contrast: a rich fish curry, plain rice, dal, vegetables, and sweets at the end.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-surface px-5 py-20">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <p className="text-xs font-black uppercase tracking-[.2em] text-accent">Comfort in every course</p>
            <h2 className="mt-4 text-4xl font-black text-secondary">The menu is built around familiar Bengali anchors.</h2>
          </Reveal>
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {values.map(([Icon, title, body]) => (
              <Reveal key={title} className="rounded-lg border border-border bg-background p-6" variant="float">
                <Icon className="text-2xl text-accent" aria-hidden />
                <h3 className="mt-4 text-2xl font-black text-secondary">{title}</h3>
                <p className="mt-2 text-sm font-semibold leading-6 text-muted">{body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-20">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[.8fr_1.2fr] lg:items-start">
          <Reveal>
            <p className="text-xs font-black uppercase tracking-[.2em] text-accent">On the menu</p>
            <h2 className="mt-4 text-4xl font-black text-secondary sm:text-6xl">Choose a few sections and build a complete table.</h2>
          </Reveal>
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <span key={category} className="rounded-full border border-border bg-surface px-4 py-2 font-bold text-secondary">
                {category}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-primary px-5 py-20 text-primary-foreground">
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <p className="font-black uppercase tracking-[.18em] text-primary-foreground/70">Ready to eat</p>
            <h2 className="mt-4 text-4xl font-black">Open the live menu and order the current dishes.</h2>
          </div>
          <OrderOnlineButton className="inline-flex min-h-12 items-center rounded-lg bg-foreground px-7 font-black text-background hover:bg-foreground/90" label="Explore the live menu" />
        </div>
      </section>
    </>
  );
}
