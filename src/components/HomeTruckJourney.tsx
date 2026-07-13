"use client";
/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import OrderOnlineButton from "./OrderOnlineButton";
import Reveal from "./Reveal";
import { useSiteContent } from "./SiteContentProvider";

const proof = [
  ["San Jose", "pickup and delivery"],
  ["Fish-first menu", "mustard, rohu, hilsa, prawns"],
  ["Add the sides", "rice, dal, vegetables, sweets"],
  ["Order online", "current pickup and delivery"],
];

const tableValues = [
  ["Mustard and fish", "Start with the dishes that define the kitchen: shorshe, kalia, rohu, hilsa, and prawns."],
  ["Rice and dal", "The plain things matter here. Rice and lentils carry the heat, mustard, and oil."],
  ["Sweets at the end", "Rasgulla or rasmalai keeps the meal Bengali all the way through dessert."],
];

const orderSteps = [
  ["01", "Pick the fish", "Choose the curry first: mustard, kalia, shrimp, or rohu."],
  ["02", "Add rice and dal", "Let the sides do their job. They make the curries easier to eat and easier to share."],
  ["03", "Finish with sweets", "Add rasgulla or rasmalai before checkout if the meal needs a proper ending."],
];

export default function HomeTruckJourney() {
  const { settings, menuItems, ready } = useSiteContent();

  if (!ready || !settings) {
    return null;
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
        <Reveal className="mx-auto flex min-h-[calc(100dvh-9rem)] max-w-[88rem] items-end pb-6 lg:items-center lg:pb-0">
          <div className="max-w-4xl">
            <p className="eyebrow text-[#f4d28a]">Authentic Bengali cuisine · San Jose</p>
            <h1 className="mt-5 max-w-4xl text-5xl font-extrabold leading-[0.96] tracking-tight sm:text-7xl">
              Bengali fish curries, rice, dal, and sweets in San Jose.
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-white/85">
              Order mustard hilsa, rohu kalia, shrimp curry, rice, dal, and Bengali sweets for pickup or delivery.
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
        <div className="mx-auto grid max-w-[88rem] divide-y divide-border sm:grid-cols-3 sm:divide-y-0">
          {proof.map(([value, label]) => (
            <div key={label} className="py-4 sm:border-r sm:border-border sm:px-5 sm:first:pl-0 sm:last:border-r-0">
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
              Start with a fish curry, add rice or dal, then finish with something sweet.
            </p>
          </Reveal>
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {picks.map((item, index) => (
              <Reveal key={item.id} variant="float" delay={index * 0.05}>
                <article key={item.id} className="menu-card overflow-hidden">
                  <img src={item.imageSrc || heroImage} alt={item.name} className="h-56 w-full object-cover" loading="lazy" />
                  <div className="p-5">
                    <h3 className="text-xl font-extrabold text-secondary">{item.name}</h3>
                    <p className="mt-2 text-sm font-medium leading-6 text-muted-foreground">{item.description}</p>
                    <p className="mt-4 font-extrabold text-primary">{item.price}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-10">
            <Link href="/menu" className="inline-flex min-h-12 items-center justify-center gap-3 rounded-lg border border-border px-7 font-bold text-secondary transition-colors hover:bg-surface">
              See the full menu <ArrowRight aria-hidden className="size-4" />
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="section-shell bg-surface">
        <div className="section-inner grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <Reveal className="grid gap-4 sm:grid-cols-[1.05fr_.95fr] sm:items-end">
            <img src={fishImage} alt="Bengali fish curry" className="aspect-[4/5] h-full w-full object-cover" loading="lazy" />
            <div className="grid gap-4">
              <img src={classicImage} alt="Bengali meal spread" className="aspect-[4/3] w-full object-cover" loading="lazy" />
              <p className="border-l-2 border-primary pl-4 text-sm font-medium leading-6 text-muted-foreground">Mustard fish needs rice. Dal and sweets make it feel finished.</p>
            </div>
          </Reveal>
          <Reveal>
            <p className="eyebrow">The Bengali table</p>
            <h2 className="mt-4 text-4xl font-extrabold leading-tight tracking-tight text-secondary sm:text-5xl">Build the order the way Bengali food is eaten.</h2>
            <p className="mt-5 max-w-xl text-base font-medium leading-7 text-muted-foreground">
              Rich fish curries make more sense with rice, dal, vegetables, and a sweet finish.
            </p>
            <div className="mt-8 divide-y divide-border border-y border-border">
              {tableValues.map(([title, body]) => (
                <article key={title} className="py-5">
                  <h3 className="text-xl font-extrabold text-secondary">{title}</h3>
                  <p className="mt-2 text-sm font-medium leading-6 text-muted-foreground">{body}</p>
                </article>
              ))}
            </div>
            <Link href="/menu" className="mt-8 inline-flex min-h-12 items-center justify-center gap-3 rounded-lg bg-primary px-7 font-bold text-primary-foreground transition-colors hover:bg-primary-hover">
              Build your meal from the menu <ArrowRight aria-hidden className="size-4" />
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="relative isolate overflow-hidden px-5 py-28 text-white">
        <img src={dessertImage} alt="Bengali desserts and dishes" className="absolute inset-0 -z-20 h-full w-full object-cover" loading="lazy" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(27,19,15,.9),rgba(27,19,15,.5))]" />
        <Reveal className="mx-auto max-w-[88rem]">
          <p className="eyebrow text-[#f4d28a]">For shared meals</p>
          <h2 className="mt-4 max-w-3xl text-4xl font-extrabold leading-tight tracking-tight sm:text-6xl">Order enough curry, rice, and sweets for everyone.</h2>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/85">
            For a family dinner or office lunch, choose a few curries and fill in the meal with rice, dal, and dessert.
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
            <h2 className="mt-4 text-4xl font-extrabold leading-tight tracking-tight text-secondary sm:text-5xl">A simple way to order Bengali food.</h2>
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
          <Reveal className="mt-10 flex flex-col gap-3 sm:flex-row">
            <OrderOnlineButton className="min-h-12 bg-primary px-7 font-bold text-primary-foreground hover:bg-primary-hover" label="Order online" />
            <Link href="/menu" className="inline-flex min-h-12 items-center justify-center gap-3 rounded-lg border border-border px-7 font-bold text-secondary transition-colors hover:bg-surface">
              Review the menu first <ArrowRight aria-hidden className="size-4" />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
