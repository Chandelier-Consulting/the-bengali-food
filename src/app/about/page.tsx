"use client";
/* eslint-disable @next/next/no-img-element */

import OrderOnlineButton from "@/components/OrderOnlineButton";
import Reveal from "@/components/Reveal";
import { useSiteContent } from "@/components/SiteContentProvider";

const pantry = [
  ["Mustard oil", "Sharp, warm, and unmistakably Bengali. It gives fish curry its edge."],
  ["River fish", "Hilsa, rohu, and prawns carry the meal before the sides even arrive."],
  ["Rice and dal", "Plain rice and lentils make rich curry easier to eat and easier to share."],
  ["Sweet finish", "Rasgulla and rasmalai close the meal without making dessert feel separate."],
] as const;

const mealSteps = [
  ["01", "Start with fish", "Choose mustard, kalia, shrimp, or rohu as the center of the order."],
  ["02", "Add the quiet things", "Rice, dal, and vegetables are not filler. They make the curry work."],
  ["03", "Finish the table", "A Bengali meal feels incomplete without something sweet at the end."],
] as const;

const travelNotes = [
  ["Built for rice", "The curries are made to hold their flavor after the container opens."],
  ["Easy to share", "Sides and sweets turn one entree into a complete table."],
  ["Clear ordering", "The menu stays focused so pickup and delivery do not feel like guessing."],
] as const;

export default function AboutPage() {
  const { settings, menuItems } = useSiteContent();

  if (!settings) return null;

  const categories = [...new Set(menuItems.map((item) => item.category))];
  const featuredItems = menuItems.slice(0, 3);
  const heroImage = settings.images.Hero;
  const fishImage = settings.images["Fish & Seafood"] || heroImage;
  const riceImage = settings.images["Rice & Sides"] || heroImage;
  const dessertImage = settings.images.Desserts || heroImage;

  return (
    <>
      <section className="relative isolate flex min-h-[84svh] items-end overflow-hidden px-5 pb-20 pt-32 text-white">
        <img src={heroImage} alt="Bengali food" className="absolute inset-0 -z-20 h-full w-full object-cover" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(27,19,15,.88),rgba(27,19,15,.48))]" />
        <Reveal className="mx-auto w-full max-w-[88rem]">
          <div className="max-w-4xl">
            <p className="eyebrow text-[#f4d28a]">Our table</p>
            <h1 className="page-title mt-5">The river, the pantry, the rice.</h1>
            <p className="lead-copy lead-copy-on-dark mt-7 max-w-2xl">
              Bengali food is built from fish, mustard, lentils, rice, and sweets that belong on the same table.
            </p>
          </div>
        </Reveal>
      </section>

      <section className="section-shell">
        <div className="section-inner grid gap-12 lg:grid-cols-[1.05fr_.95fr] lg:items-center">
          <Reveal className="grid gap-4 sm:grid-cols-[.9fr_1.1fr] sm:items-end" variant="float">
            <img src={fishImage} alt="Bengali fish curry" className="aspect-[4/5] h-full w-full object-cover" loading="lazy" />
            <div className="grid gap-4">
              <img src={riceImage} alt="Rice and sides" className="aspect-[4/3] w-full object-cover" loading="lazy" />
              <p className="border-l-2 border-primary pl-4 text-sm font-semibold leading-6 text-muted-foreground">
                Fish curry makes sense because rice, dal, and vegetables are close by.
              </p>
            </div>
          </Reveal>
          <Reveal>
            <p className="eyebrow">What we cook around</p>
            <h2 className="section-title mt-4 max-w-2xl text-secondary">The order starts with fish, then finds its balance.</h2>
            <p className="lead-copy mt-6 max-w-xl">
              The strongest dishes are not meant to stand alone. Mustard, river fish, rice, dal, vegetables, and sweets each do a specific job.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section-shell bg-surface">
        <div className="section-inner">
          <Reveal className="max-w-3xl">
            <p className="eyebrow">The pantry</p>
            <h2 className="section-title mt-4 text-secondary">A short pantry, used with intent.</h2>
            <p className="lead-copy mt-5">
              The flavor does not come from a long list of tricks. It comes from a few anchors used in the right order.
            </p>
          </Reveal>
          <div className="mt-12 grid gap-x-8 gap-y-6 md:grid-cols-2">
            {pantry.map(([title, body], index) => (
              <Reveal key={title} variant="float" delay={index * 0.04}>
                <article className="border-t border-border pt-5">
                  <h3 className="font-heading text-2xl font-extrabold text-secondary">{title}</h3>
                  <p className="body-copy mt-3">{body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="section-inner grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:items-start">
          <Reveal>
            <p className="eyebrow">How the meal comes together</p>
            <h2 className="section-title mt-4 text-secondary">Bengali food is ordered as a table, not a single dish.</h2>
          </Reveal>
          <ol className="grid gap-6">
            {mealSteps.map(([number, title, body]) => (
              <li key={number} className="grid gap-4 border-t border-border pt-5 sm:grid-cols-[7rem_1fr]">
                <p className="eyebrow">{number}</p>
                <div>
                  <h3 className="font-heading text-2xl font-extrabold text-secondary">{title}</h3>
                  <p className="body-copy mt-2">{body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="relative isolate overflow-hidden px-5 py-28 text-white">
        <img src={dessertImage} alt="Bengali sweets and curry" className="absolute inset-0 -z-20 h-full w-full object-cover" loading="lazy" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(27,19,15,.9),rgba(27,19,15,.52))]" />
        <Reveal className="mx-auto max-w-[88rem]">
          <p className="eyebrow text-[#f4d28a]">What travels well</p>
          <h2 className="section-title mt-4 max-w-3xl text-white">Food that still feels complete after the trip home.</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {travelNotes.map(([title, body]) => (
              <article key={title} className="border-t border-white/28 pt-5">
                <h3 className="font-heading text-2xl font-extrabold">{title}</h3>
                <p className="mt-3 text-sm font-medium leading-6 text-white/78">{body}</p>
              </article>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="section-shell">
        <div className="section-inner grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:items-start">
          <Reveal>
            <p className="eyebrow">On the menu</p>
            <h2 className="section-title mt-4 text-secondary">Pick across the menu, not just one curry.</h2>
            <p className="lead-copy mt-5 max-w-xl">
              A better order has a center, a side, and a sweet finish.
            </p>
          </Reveal>
          <Reveal className="grid gap-4 lg:pt-2">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <span key={category} className="rounded-lg border border-border bg-surface px-4 py-2 text-sm font-bold text-secondary">
                  {category}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-shell bg-surface">
        <div className="section-inner">
          <Reveal className="grid gap-6 border-b border-border pb-8 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
            <div>
              <p className="eyebrow">Current menu anchors</p>
              <h2 className="section-title mt-4 text-secondary">A few dishes that explain the kitchen quickly.</h2>
            </div>
            <p className="lead-copy max-w-2xl">
              Start here when you want the order to feel Bengali from the first bite to the last.
            </p>
          </Reveal>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {featuredItems.map((item, index) => (
              <Reveal key={item.id} variant="float" delay={index * 0.05}>
                <article className="menu-card overflow-hidden">
                  <img src={item.imageSrc || heroImage} alt={item.name} className="h-52 w-full object-cover" loading="lazy" />
                  <div className="p-5">
                    <h3 className="font-heading text-2xl font-extrabold text-secondary">{item.name}</h3>
                    <p className="body-copy mt-2 text-sm">{item.description}</p>
                    <p className="mt-4 font-extrabold text-primary">{item.price}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-primary px-5 py-16 text-primary-foreground">
        <Reveal className="mx-auto grid max-w-[88rem] gap-6 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[.14em] text-primary-foreground/72">Ready to eat</p>
            <h2 className="section-title mt-4 text-primary-foreground">Order fish curry, rice, dal, and sweets today.</h2>
          </div>
          <OrderOnlineButton className="inline-flex min-h-12 items-center rounded-lg bg-foreground px-7 font-bold text-background hover:bg-foreground/90" label="Order online" />
        </Reveal>
      </section>
    </>
  );
}
