"use client";
/* eslint-disable @next/next/no-img-element */

import OrderOnlineButton from "@/components/OrderOnlineButton";
import Reveal from "@/components/Reveal";
import { useSiteContent } from "@/components/SiteContentProvider";

const values = [
  ["Fish at the center", "Mustard, rohu, hilsa, prawns, and rice are the anchors of the Bengali table."],
  ["Vegetable balance", "Lentils and vegetables bring contrast to the curries and make the meal easier to share."],
  ["Home-style comfort", "The cooking is generous, familiar, and made for bringing a complete meal home."],
  ["Shared plates", "Bengali food comes together as a spread, especially for families and groups."],
] as const;

export default function AboutPage() {
  const { settings, menuItems } = useSiteContent();

  if (!settings) return null;

  const categories = [...new Set(menuItems.map((item) => item.category))];
  const heroImage = settings.images.Hero;
  const fishImage = settings.images["Fish & Seafood"] || heroImage;

  return (
    <>
      <section className="relative isolate min-h-[34rem] overflow-hidden px-5 py-28 text-white sm:py-36">
        <img src={heroImage} alt="Bengali food" className="absolute inset-0 -z-20 h-full w-full object-cover" />
        <div className="absolute inset-0 -z-10 bg-[rgba(27,19,15,.74)]" />
        <Reveal className="mx-auto flex min-h-[20rem] max-w-6xl items-end">
          <div className="max-w-3xl">
            <p className="eyebrow text-[#f4d28a]">Our table</p>
            <h1 className="mt-5 text-5xl font-extrabold leading-[0.98] sm:text-7xl">Bengali food has a language of its own.</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/85">
              Mustard, fish, lentils, seasonal vegetables, rice, and carefully built spice are at the center of the cooking.
            </p>
          </div>
        </Reveal>
      </section>

      <section className="section-shell">
        <div className="section-inner grid gap-10 lg:grid-cols-[1fr_.9fr] lg:items-center">
          <Reveal className="media-frame rounded-lg">
            <img src={fishImage} alt="Bengali fish curry" className="aspect-[4/5] h-full w-full object-cover" loading="lazy" />
          </Reveal>
          <Reveal>
            <p className="eyebrow">What we cook around</p>
            <h2 className="mt-4 text-4xl font-extrabold leading-tight text-secondary sm:text-5xl">A full meal, not a single dish.</h2>
            <p className="body-copy mt-5 max-w-xl">
              Bengali food is strongest when the table has contrast: a rich fish curry, plain rice, dal, vegetables, and sweets at the end.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section-shell bg-surface">
        <div className="section-inner">
          <Reveal className="max-w-2xl">
            <p className="eyebrow">Comfort in every course</p>
            <h2 className="mt-4 text-4xl font-extrabold leading-tight text-secondary sm:text-5xl">The menu is built around familiar Bengali anchors.</h2>
          </Reveal>
          <div className="mt-10 border-b border-border">
            {values.map(([title, body]) => (
              <article key={title} className="grid gap-3 border-t border-border py-5 sm:grid-cols-[11rem_1fr]">
                <h3 className="text-xl font-extrabold text-secondary">{title}</h3>
                <p className="body-copy">{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="section-inner grid gap-8 lg:grid-cols-[.8fr_1.2fr] lg:items-start">
          <Reveal>
            <p className="eyebrow">On the menu</p>
            <h2 className="mt-4 text-4xl font-extrabold leading-tight text-secondary sm:text-5xl">Choose a few sections and build a complete table.</h2>
          </Reveal>
          <Reveal className="flex flex-wrap gap-2 lg:pt-2">
            {categories.map((category) => (
              <span key={category} className="rounded-lg border border-border bg-surface px-4 py-2 text-sm font-bold text-secondary">
                {category}
              </span>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="bg-primary px-5 py-16 text-primary-foreground">
        <Reveal className="mx-auto grid max-w-6xl gap-6 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[.14em] text-primary-foreground/72">Ready to eat</p>
            <h2 className="mt-4 text-4xl font-extrabold leading-tight">Open the live menu and order the current dishes.</h2>
          </div>
          <OrderOnlineButton className="inline-flex min-h-12 items-center rounded-lg bg-foreground px-7 font-bold text-background hover:bg-foreground/90" label="Explore the live menu" />
        </Reveal>
      </section>
    </>
  );
}
