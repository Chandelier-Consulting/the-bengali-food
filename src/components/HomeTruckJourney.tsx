"use client";
/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { motion } from "framer-motion";
import { FaArrowRight, FaBowlFood, FaLeaf, FaPeopleGroup, FaStar } from "react-icons/fa6";
import { Card, CardContent } from "@/components/ui/card";
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
  {
    title: "Mustard and fish",
    body: "A proper Bengali table often starts with fish, mustard, and rice. The menu keeps those familiar anchors easy to order.",
    icon: FaBowlFood,
  },
  {
    title: "Vegetables and dal",
    body: "Lentils, vegetables, and sides round out the meal so a pickup order feels complete, not like a single entree.",
    icon: FaLeaf,
  },
  {
    title: "Built for sharing",
    body: "Curries, rice, and sweets work well for a family dinner, office lunch, or a larger table where everyone wants a little of everything.",
    icon: FaPeopleGroup,
  },
];

const orderSteps = [
  ["01", "Choose the anchors", "Start with fish curry, rice, vegetables, and dessert so the order has balance."],
  ["02", "Check the live menu", "Use the ordering link for current availability, pickup timing, and delivery options."],
  ["03", "Set the table", "Add sides and sweets for a fuller Bengali meal that travels well."],
];

const reviews = [
  ["Mustard-rich", "Fish curries with the kind of flavor that makes rice necessary."],
  ["Comforting", "Simple sides, lentils, and vegetables make the meal feel like home food."],
  ["Shareable", "Easy to build a table from a few curries, rice, and dessert."],
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
      <section className="relative isolate min-h-dvh overflow-hidden bg-background px-5 pb-24 pt-28 text-white">
        <img src={heroImage} alt="Bengali food" className="absolute inset-0 -z-20 h-full w-full object-cover opacity-55" />
        <div className="absolute inset-0 -z-10 bg-black/65" />
        <Reveal className="mx-auto grid min-h-[calc(100dvh-9rem)] max-w-6xl gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div className="max-w-3xl">
            <p className="text-xs font-black uppercase tracking-[.2em] text-accent">Authentic Bengali cuisine · San Jose</p>
            <h1 className="mt-5 text-5xl font-black leading-[.94] sm:text-7xl">Bengal, cooked close to home.</h1>
            <p className="mt-7 text-lg leading-8 text-white/82">
              Mustard-rich fish curries, comforting lentils, fragrant rice, vegetables, and Bengali sweets for pickup, delivery, and shared tables.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <OrderOnlineButton className="min-h-12 bg-primary px-7 text-base font-bold text-primary-foreground hover:bg-primary/90" label="Order pickup or delivery" />
              <Link href="/menu" className="inline-flex min-h-12 items-center justify-center gap-3 rounded-lg border border-white/25 px-7 text-base font-bold transition-colors hover:bg-white/10">Explore the menu <FaArrowRight /></Link>
            </div>
            <p className="mt-10 flex items-center gap-2 text-sm"><FaStar className="text-accent" /> Bengali comfort food from a live ordering menu</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-[0.85fr_1.15fr] sm:items-end">
            <img src={fishImage} alt="Bengali fish curry" className="aspect-[4/5] rounded-3xl border border-white/12 object-cover shadow-[0_24px_80px_rgba(0,0,0,.28)]" />
            <div className="rounded-3xl border border-white/12 bg-white/8 p-3 backdrop-blur">
              <img src={classicImage} alt="Bengali feast" className="aspect-[4/3] w-full rounded-2xl object-cover" />
              <div className="grid gap-3 p-4 sm:grid-cols-2">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.16em] text-accent">Start here</p>
                  <p className="mt-1 text-xl font-black">Fish, rice, dal, sweets</p>
                </div>
                <p className="text-sm font-bold text-white/82 sm:text-right">A complete table, not just a plate.</p>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="border-y border-border bg-surface px-5 py-8">
        <div className="mx-auto grid max-w-6xl gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {proof.map(([value, label]) => (
            <Reveal key={label} className="rounded-lg border border-border bg-background px-5 py-4" variant="float">
              <p className="text-2xl font-black text-accent">{value}</p>
              <p className="mt-1 text-xs font-black uppercase tracking-[0.14em] text-muted">{label}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="px-5 py-24 lg:py-28">
        <div className="mx-auto max-w-6xl">
          <Reveal className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <p className="text-xs font-black uppercase tracking-[.2em] text-accent">Popular picks</p>
              <h2 className="mt-5 text-4xl font-black text-secondary sm:text-6xl">Start with the dishes that carry the meal.</h2>
            </div>
            <p className="text-lg leading-8 text-muted">
              The fastest order is a balanced one: fish curry or prawns, rice, a vegetable or dal, and something sweet.
            </p>
          </Reveal>
          <div className="mt-14 grid gap-7 md:grid-cols-2 lg:grid-cols-4">
            {picks.map((item) => (
              <motion.div key={item.id} whileHover={{ y: -6 }} transition={{ duration: 0.2 }}>
                <Card className="h-full overflow-hidden border border-border bg-card py-0 shadow-[0_18px_42px_rgba(0,0,0,.16)]">
                  <img src={item.imageSrc} alt={item.name} className="h-56 w-full object-cover" loading="lazy" />
                  <CardContent className="p-7">
                    <h3 className="text-2xl font-black text-card-foreground">{item.name}</h3>
                    <p className="mt-3 text-sm leading-6 text-muted-foreground">{item.description}</p>
                    <p className="mt-6 font-black text-accent">{item.price}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-primary px-5 py-24 text-primary-foreground lg:py-28">
        <Reveal className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <p className="text-xs font-black uppercase tracking-[.2em] text-primary-foreground/70">How to order</p>
            <h2 className="mt-4 text-4xl font-black sm:text-5xl">Build the table around a few reliable anchors.</h2>
          </div>
          <div className="grid gap-4">
            {orderSteps.map(([number, title, body]) => (
              <article key={number} className="border-t border-primary-foreground/25 pt-4">
                <p className="text-xs font-black uppercase tracking-[0.16em] text-primary-foreground/70">{number}</p>
                <h3 className="mt-2 text-2xl font-black">{title}</h3>
                <p className="mt-2 text-sm font-semibold leading-6">{body}</p>
              </article>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="px-5 py-24 lg:py-28">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <p className="text-xs font-black uppercase tracking-[.2em] text-accent">What makes it Bengali</p>
            <h2 className="mt-5 max-w-3xl text-4xl font-black text-secondary sm:text-6xl">Flavor that leans on mustard, fish, rice, and comfort.</h2>
          </Reveal>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {tableValues.map(({ title, body, icon: Icon }) => (
              <Reveal key={title} className="rounded-lg border border-border bg-surface p-6" variant="float">
                <Icon className="text-2xl text-accent" aria-hidden />
                <h3 className="mt-4 text-2xl font-black text-secondary">{title}</h3>
                <p className="mt-2 text-sm font-semibold leading-6 text-muted">{body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative isolate overflow-hidden px-5 py-24 text-white lg:py-28">
        <img src={dessertImage} alt="Bengali desserts and dishes" className="absolute inset-0 -z-20 h-full w-full object-cover opacity-45" />
        <div className="absolute inset-0 -z-10 bg-black/70" />
        <Reveal className="mx-auto max-w-6xl">
          <p className="text-xs font-black uppercase tracking-[.2em] text-accent">For shared meals</p>
          <h2 className="mt-4 max-w-3xl text-4xl font-black sm:text-6xl">Bring Bengali comfort food to the gathering.</h2>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/82">
            For a family dinner, office lunch, or small event, order a few curries, rice, and desserts so the table feels complete.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <OrderOnlineButton className="min-h-12 bg-primary px-7 font-bold text-primary-foreground hover:bg-primary/90" label="Start an order" />
            <Link href="/group-orders" className="inline-flex min-h-12 items-center justify-center rounded-lg border border-white/25 px-7 font-bold text-white hover:bg-white/10">Group orders</Link>
          </div>
        </Reveal>
      </section>

      <section className="px-5 py-24 lg:py-28">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1.05fr_.95fr] lg:items-center">
          <Reveal className="overflow-hidden rounded-3xl border border-border bg-surface" variant="float">
            <img src={classicImage} alt="Bengali meal spread" className="h-[430px] w-full object-cover" />
          </Reveal>
          <Reveal>
            <p className="text-xs font-black uppercase tracking-[.2em] text-accent">Before you order</p>
            <h2 className="mt-4 text-4xl font-black text-secondary sm:text-6xl">Think in courses, not single dishes.</h2>
            <p className="mt-5 text-base font-semibold leading-7 text-muted">
              Bengali food works best as a spread. Pair richer fish or prawn dishes with rice, dal, vegetables, and sweets.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="border-y border-border bg-surface px-5 py-20">
        <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-3">
          {reviews.map(([title, body]) => (
            <Reveal key={title} className="rounded-lg border border-border bg-background p-6" variant="float">
              <p className="text-4xl font-black text-primary">&ldquo;</p>
              <h3 className="mt-2 text-2xl font-black text-secondary">{title}</h3>
              <p className="mt-3 text-sm font-semibold leading-6 text-muted">{body}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-[var(--kitchen-night)] px-5 py-20 text-white">
        <Reveal className="mx-auto grid max-w-6xl gap-6 rounded-3xl border border-white/10 bg-white/6 p-6 md:grid-cols-[1fr_auto] md:items-center md:p-8" variant="float">
          <div>
            <p className="text-xs font-black uppercase tracking-[.2em] text-accent">Order today</p>
            <h2 className="mt-3 text-4xl font-black">Bengali food for pickup, delivery, and shared tables.</h2>
          </div>
          <OrderOnlineButton className="min-h-12 bg-primary px-7 text-sm font-black text-primary-foreground hover:bg-primary/90" label="Open live menu" />
        </Reveal>
      </section>
    </>
  );
}
