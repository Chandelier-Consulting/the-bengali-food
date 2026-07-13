"use client";
/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import OrderOnlineButton from "./OrderOnlineButton";
import Reveal from "./Reveal";
import { useSiteContent } from "./SiteContentProvider";

const proof = [
  ["San Jose", "pickup and delivery"],
  ["Bengali staples", "fish, dal, rice, sweets"],
  ["Group ready", "comfort food for gatherings"],
  ["DoorDash", "live ordering menu"],
];

const tableValues = [
  ["Mustard and fish", "A proper Bengali table often starts with fish, mustard, and rice. The menu keeps those familiar anchors easy to order."],
  ["Vegetables and dal", "Lentils, vegetables, and sides round out the meal so a pickup order feels complete, not like a single entree."],
  ["Built for sharing", "Curries, rice, and sweets work well for a family dinner, office lunch, or a larger table where everyone wants a little of everything."],
];

const orderSteps = [
  ["01", "Choose the anchors", "Start with fish curry, rice, vegetables, and dessert so the order has balance."],
  ["02", "Check the live menu", "Use the ordering link for current availability, pickup timing, and delivery options."],
  ["03", "Set the table", "Add sides and sweets for a fuller Bengali meal that travels well."],
];

export default function HomeTruckJourney() {
  const { settings, menuItems, ready } = useSiteContent();

  if (!ready || !settings) {
    return <section className="min-h-screen bg-background px-5 pt-32 text-foreground">Loading The Bengali Food...</section>;
  }

  const picks = menuItems.slice(0, 4);
  const heroImage = settings.images.Hero;
  const fishImage = settings.images["Fish & Seafood"] || heroImage;
  const classicImage = settings.images["Bengali Classics"] || heroImage;
  const dessertImage = settings.images.Desserts || heroImage;

  return (
    <>
      <section className="relative isolate min-h-dvh overflow-hidden bg-kitchen-night bg-[var(--kitchen-night)] px-5 pb-20 pt-28 text-white">
        <img src={heroImage} alt="Bengali food" className="absolute inset-0 -z-20 h-full w-full object-cover" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(27,19,15,.88),rgba(27,19,15,.44))]" />
        <Reveal className="mx-auto flex min-h-[calc(100dvh-9rem)] max-w-6xl items-end pb-6 lg:items-center lg:pb-0">
          <div className="max-w-4xl">
            <p className="eyebrow text-[#f4d28a]">Authentic Bengali cuisine · San Jose</p>
            <h1 className="mt-5 max-w-4xl text-5xl font-extrabold leading-[0.96] tracking-tight sm:text-7xl">
              Bengali comfort food, built for the whole table.
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-white/85">
              Mustard-rich fish curries, comforting lentils, fragrant rice, vegetables, and Bengali sweets for pickup, delivery, and shared tables.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <OrderOnlineButton className="min-h-12 bg-primary px-7 text-base font-bold text-primary-foreground hover:bg-primary-hover" label="Order pickup or delivery" />
              <Link href="/menu" className="inline-flex min-h-12 items-center justify-center gap-3 rounded-lg border border-white/30 px-7 text-base font-bold transition-colors hover:bg-white/10">
                Explore the menu <ArrowRight aria-hidden className="size-4" />
              </Link>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="border-y border-border bg-surface px-5 py-5">
        <div className="mx-auto grid max-w-6xl divide-y divide-border sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4">
          {proof.map(([value, label]) => (
            <div key={label} className="py-4 sm:px-5 sm:first:pl-0 sm:odd:border-r sm:odd:border-border lg:border-r lg:last:border-r-0">
              <p className="text-lg font-extrabold text-secondary">{value}</p>
              <p className="mt-1 text-sm font-medium text-muted-foreground">{label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section-shell">
        <div className="section-inner">
          <Reveal className="grid gap-6 border-b border-border pb-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <div>
              <p className="eyebrow">Current favorites</p>
              <h2 className="mt-4 max-w-xl text-4xl font-extrabold leading-tight tracking-tight text-secondary sm:text-5xl">Start with the dishes that carry the meal.</h2>
            </div>
            <p className="max-w-2xl text-lg leading-8 text-muted-foreground">
              The fastest order is a balanced one: fish curry or prawns, rice, a vegetable or dal, and something sweet.
            </p>
          </Reveal>
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {picks.map((item) => (
              <article key={item.id} className="menu-card overflow-hidden">
                <img src={item.imageSrc || heroImage} alt={item.name} className="h-56 w-full object-cover" loading="lazy" />
                <div className="p-5">
                  <h3 className="text-xl font-extrabold text-secondary">{item.name}</h3>
                  <p className="mt-2 text-sm font-medium leading-6 text-muted-foreground">{item.description}</p>
                  <p className="mt-4 font-extrabold text-primary">{item.price}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell bg-surface">
        <div className="section-inner grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <Reveal className="grid gap-4 sm:grid-cols-[1.05fr_.95fr] sm:items-end">
            <img src={fishImage} alt="Bengali fish curry" className="aspect-[4/5] h-full w-full object-cover" loading="lazy" />
            <div className="grid gap-4">
              <img src={classicImage} alt="Bengali meal spread" className="aspect-[4/3] w-full object-cover" loading="lazy" />
              <p className="border-l-2 border-primary pl-4 text-sm font-medium leading-6 text-muted-foreground">Fish, rice, dal, vegetables, and sweets belong on the same table.</p>
            </div>
          </Reveal>
          <Reveal>
            <p className="eyebrow">The Bengali table</p>
            <h2 className="mt-4 text-4xl font-extrabold leading-tight tracking-tight text-secondary sm:text-5xl">Think in courses, not single dishes.</h2>
            <p className="mt-5 max-w-xl text-base font-medium leading-7 text-muted-foreground">
              Bengali food works best as a spread. Pair richer fish or prawn dishes with rice, dal, vegetables, and sweets.
            </p>
            <div className="mt-8 divide-y divide-border border-y border-border">
              {tableValues.map(([title, body]) => (
                <article key={title} className="py-5">
                  <h3 className="text-xl font-extrabold text-secondary">{title}</h3>
                  <p className="mt-2 text-sm font-medium leading-6 text-muted-foreground">{body}</p>
                </article>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="relative isolate overflow-hidden px-5 py-28 text-white">
        <img src={dessertImage} alt="Bengali desserts and dishes" className="absolute inset-0 -z-20 h-full w-full object-cover" loading="lazy" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(27,19,15,.9),rgba(27,19,15,.5))]" />
        <Reveal className="mx-auto max-w-6xl">
          <p className="eyebrow text-[#f4d28a]">For shared meals</p>
          <h2 className="mt-4 max-w-3xl text-4xl font-extrabold leading-tight tracking-tight sm:text-6xl">Bring Bengali comfort food to the gathering.</h2>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/85">
            For a family dinner, office lunch, or small event, order a few curries, rice, and desserts so the table feels complete.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <OrderOnlineButton className="min-h-12 bg-primary px-7 font-bold text-primary-foreground hover:bg-primary-hover" label="Start an order" />
            <Link href="/group-orders" className="inline-flex min-h-12 items-center justify-center gap-3 rounded-lg border border-white/30 px-7 font-bold text-white transition-colors hover:bg-white/10">
              Plan a group order <ArrowRight aria-hidden className="size-4" />
            </Link>
          </div>
        </Reveal>
      </section>

      <section className="section-shell">
        <div className="section-inner">
          <Reveal className="max-w-2xl">
            <p className="eyebrow">How to order</p>
            <h2 className="mt-4 text-4xl font-extrabold leading-tight tracking-tight text-secondary sm:text-5xl">Build the table around a few reliable anchors.</h2>
          </Reveal>
          <ol className="mt-10 grid gap-8 md:grid-cols-3">
            {orderSteps.map(([number, title, body]) => (
              <li key={number} className="border-t-2 border-primary pt-5">
                <p className="eyebrow">{number}</p>
                <h3 className="mt-3 text-2xl font-extrabold text-secondary">{title}</h3>
                <p className="mt-3 text-sm font-medium leading-6 text-muted-foreground">{body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
