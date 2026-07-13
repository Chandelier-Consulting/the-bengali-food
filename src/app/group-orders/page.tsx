"use client";
/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { FaBriefcase, FaCalendarDay, FaListCheck, FaPeopleGroup, FaUsers } from "react-icons/fa6";
import OrderOnlineButton from "@/components/OrderOnlineButton";
import Reveal from "@/components/Reveal";
import { useSiteContent } from "@/components/SiteContentProvider";

const occasions = [
  [FaBriefcase, "Office lunches", "A generous Bengali spread makes team meals feel considered without making ordering complicated."],
  [FaUsers, "Family tables", "Choose dishes that let everyone share fish, rice, lentils, vegetables, and sweets."],
  [FaCalendarDay, "Special gatherings", "Build the meal around current menu items and add enough sides for a complete table."],
] as const;

const questions = [
  "How many people are eating?",
  "Which curry should anchor the table?",
  "How much rice and sides do you need?",
  "Should dessert be part of the order?",
];

const planningNotes = [
  ["Start with headcount", "A group order is easier when you know how many full plates you need before choosing dishes."],
  ["Anchor the meal", "Pick fish, shrimp, or another main curry first, then add rice, lentils, vegetables, and sweets."],
  ["Use live availability", "The ordering menu shows what is currently available for pickup or delivery."],
  ["Keep it shareable", "Curries and sides work best when the table can mix and match."],
];

export default function GroupOrdersPage() {
  const { settings, menuItems } = useSiteContent();

  if (!settings) return null;

  const heroImage = settings.images.Hero;
  const fishImage = settings.images["Fish & Seafood"] || heroImage;
  const featuredItems = menuItems.slice(0, 3);

  return (
    <>
      <section className="relative isolate overflow-hidden bg-[var(--kitchen-night)] px-5 pb-20 pt-32 text-white">
        <img src={heroImage} alt="Bengali dishes for a group" className="absolute inset-0 -z-20 h-full w-full object-cover opacity-35" />
        <div className="absolute inset-0 -z-10 bg-black/68" />
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[.94fr_1.06fr] lg:items-center">
          <Reveal>
            <p className="text-xs font-black uppercase tracking-[.2em] text-accent">Group orders and gatherings</p>
            <h1 className="mt-5 max-w-4xl text-5xl font-black sm:text-7xl">Bengali food for a table worth gathering around.</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/80">
              Plan around curries, rice, lentils, vegetables, and sweets so the group gets a full meal, not a pile of disconnected items.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <OrderOnlineButton className="inline-flex min-h-12 items-center rounded-lg bg-primary px-7 font-black text-primary-foreground hover:bg-primary/90" label="Start an order" />
              <Link href="/menu" className="inline-flex min-h-12 items-center rounded-lg border border-white/25 px-7 font-black text-white hover:bg-white/10">Check the menu</Link>
            </div>
          </Reveal>
          <Reveal className="overflow-hidden rounded-3xl border border-white/12 bg-white/8 p-3 backdrop-blur" variant="float">
            <img src={fishImage} alt="Bengali fish curry" className="aspect-[4/3] w-full rounded-2xl object-cover" />
          </Reveal>
        </div>
      </section>

      <section className="px-5 py-24">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <p className="text-xs font-black uppercase tracking-[.2em] text-accent">Good for</p>
            <h2 className="mt-4 text-4xl font-black text-secondary sm:text-6xl">Made for the whole table.</h2>
          </Reveal>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {occasions.map(([Icon, title, body]) => (
              <Reveal key={title} className="rounded-lg border border-border bg-surface p-6" variant="float">
                <Icon className="text-2xl text-accent" aria-hidden />
                <h3 className="mt-4 text-2xl font-black text-secondary">{title}</h3>
                <p className="mt-2 text-sm font-semibold leading-6 text-muted">{body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-primary px-5 py-20 text-primary-foreground">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-2">
          <Reveal>
            <p className="font-black uppercase tracking-[.18em] text-primary-foreground/70">Plan the order</p>
            <h2 className="mt-4 text-4xl font-black">A few details make group ordering easy.</h2>
          </Reveal>
          <div className="grid gap-3">
            {questions.map((question, index) => (
              <Reveal key={question} className="border-t border-primary-foreground/25 pt-3 font-bold" variant="float">
                <span className="mr-3 text-primary-foreground/70">0{index + 1}</span>{question}
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-20">
        <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-2 lg:grid-cols-4">
          {planningNotes.map(([title, body]) => (
            <Reveal key={title} className="rounded-lg border border-border bg-surface p-6" variant="float">
              <FaListCheck className="text-2xl text-accent" aria-hidden />
              <h3 className="mt-4 text-2xl font-black text-secondary">{title}</h3>
              <p className="mt-2 text-sm font-semibold leading-6 text-muted">{body}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-surface px-5 py-20">
        <div className="mx-auto max-w-6xl">
          <Reveal className="grid gap-6 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
            <div>
              <p className="text-xs font-black uppercase tracking-[.2em] text-accent">Current menu anchors</p>
              <h2 className="mt-4 text-4xl font-black text-secondary sm:text-6xl">Use the live menu to shape the spread.</h2>
            </div>
            <p className="text-base font-semibold leading-7 text-muted">
              These items come from the managed menu. Update them in the dashboard when availability or pricing changes.
            </p>
          </Reveal>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {featuredItems.map((item) => (
              <Reveal key={item.id} className="overflow-hidden rounded-lg border border-border bg-background" variant="float">
                <img src={item.imageSrc} alt={item.name} className="h-52 w-full object-cover" />
                <div className="p-6">
                  <h3 className="text-2xl font-black text-secondary">{item.name}</h3>
                  <p className="mt-2 text-sm font-semibold leading-6 text-muted">{item.description}</p>
                  <p className="mt-4 font-black text-primary">{item.price}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap gap-3">
            <OrderOnlineButton className="inline-flex min-h-12 items-center rounded-lg bg-primary px-7 font-black text-primary-foreground hover:bg-primary/90" label="Open live menu" />
            <Link href="/menu" className="inline-flex min-h-12 items-center rounded-lg border border-border px-7 font-black text-secondary">View full menu</Link>
          </div>
        </div>
      </section>

      <section className="px-5 py-20">
        <Reveal className="mx-auto grid max-w-6xl gap-6 rounded-3xl border border-border bg-surface p-6 md:grid-cols-[1fr_auto] md:items-center md:p-8" variant="float">
          <div>
            <FaPeopleGroup className="text-2xl text-accent" aria-hidden />
            <h2 className="mt-4 text-3xl font-black text-secondary">Ready to plan the table?</h2>
            <p className="mt-2 max-w-2xl text-sm font-semibold leading-6 text-muted">
              Start with the live menu, then build a meal with enough curry, rice, sides, and sweets for everyone.
            </p>
          </div>
          <OrderOnlineButton className="inline-flex min-h-12 items-center rounded-lg bg-primary px-7 font-black text-primary-foreground hover:bg-primary/90" label="Start an order" />
        </Reveal>
      </section>
    </>
  );
}
