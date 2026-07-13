"use client";
/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import OrderOnlineButton from "@/components/OrderOnlineButton";
import Reveal from "@/components/Reveal";
import { useSiteContent } from "@/components/SiteContentProvider";

const occasions = [
  ["Office lunches", "Curries, rice, and sweets make a team meal feel planned without needing a custom order."],
  ["Family tables", "Choose enough fish, rice, dal, and vegetables for everyone to take a little of each."],
  ["Small gatherings", "Add sweets and sides so the order feels finished when it arrives."],
] as const;

const checklist = [
  ["01", "Start with headcount", "Know how many full plates you need before choosing dishes."],
  ["02", "Choose the curry", "Pick fish, shrimp, or another main dish before adding sides."],
  ["03", "Count the rice", "Rice, dal, and vegetables are what make the order stretch cleanly."],
  ["04", "Add dessert", "Rasgulla or rasmalai is the easiest way to finish a shared meal."],
] as const;

export default function GroupOrdersPage() {
  const { settings, menuItems } = useSiteContent();

  if (!settings) return null;

  const heroImage = settings.images.Hero;
  const featuredItems = menuItems.slice(0, 3);

  return (
    <>
      <section className="section-shell pt-32">
        <div className="section-inner grid gap-10 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
          <Reveal>
            <p className="eyebrow">Group orders and gatherings</p>
            <h1 className="mt-4 max-w-3xl text-5xl font-extrabold leading-[0.98] text-secondary sm:text-7xl">Bengali curries and sides for group orders.</h1>
            <p className="body-copy mt-6 max-w-2xl text-lg">
              Build around fish curry, rice, dal, vegetables, and sweets so everyone can share the same meal.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <OrderOnlineButton className="min-h-12 rounded-lg bg-primary px-7 font-bold text-primary-foreground hover:bg-primary-hover" label="Start an order" />
              <Link href="/menu" className="inline-flex min-h-12 items-center justify-center rounded-lg border border-border px-7 font-bold text-secondary transition-colors hover:bg-surface">
                Check the menu
              </Link>
            </div>
          </Reveal>
          <Reveal className="media-frame rounded-lg" variant="float">
            <img src={heroImage} alt="Bengali dishes for a group" className="aspect-[4/3] w-full object-cover" />
          </Reveal>
        </div>
      </section>

      <section className="section-shell bg-surface">
        <div className="section-inner">
          <Reveal className="max-w-2xl">
            <p className="eyebrow">Good for</p>
            <h2 className="mt-4 text-4xl font-extrabold leading-tight text-secondary sm:text-5xl">Good for orders that need to share well.</h2>
          </Reveal>
          <div className="mt-10 grid gap-x-10 divide-y divide-border border-y border-border md:grid-cols-3 md:divide-y-0">
            {occasions.map(([title, body]) => (
              <article key={title} className="py-5 md:border-r md:border-border md:py-7 md:pr-7 md:pl-7 md:first:pl-0 md:last:border-r-0">
                <h3 className="text-xl font-extrabold text-secondary">{title}</h3>
                <p className="body-copy mt-2 text-sm">{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-secondary px-5 py-20 text-secondary-foreground">
        <div className="mx-auto max-w-[88rem]">
          <Reveal className="max-w-2xl">
            <p className="text-xs font-extrabold uppercase tracking-[.14em] text-[#f4d28a]">Plan the order</p>
            <h2 className="mt-4 text-4xl font-extrabold leading-tight sm:text-5xl">A few details make group ordering easy.</h2>
          </Reveal>
          <ol className="mt-10 grid gap-x-8 gap-y-6 md:grid-cols-2">
            {checklist.map(([number, title, body]) => (
              <li key={number} className="border-t border-secondary-foreground/25 pt-4">
                <p className="text-sm font-extrabold tracking-[.12em] text-[#f4d28a]">{number}</p>
                <h3 className="mt-2 text-xl font-extrabold">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-secondary-foreground/75">{body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section-shell">
        <div className="section-inner">
          <Reveal className="grid gap-6 border-b border-border pb-8 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
            <div>
              <p className="eyebrow">Current menu anchors</p>
              <h2 className="mt-4 text-4xl font-extrabold leading-tight text-secondary sm:text-5xl">Start with a few current menu anchors.</h2>
            </div>
            <p className="body-copy max-w-2xl">These dishes are useful starting points when you are ordering for more than one household.</p>
          </Reveal>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {featuredItems.map((item, index) => (
              <Reveal key={item.id} className="h-full" variant="float" delay={index * 0.05}>
                <article key={item.id} className="menu-card flex h-full flex-col overflow-hidden">
                  <img src={item.imageSrc || heroImage} alt={item.name} className="h-48 w-full object-cover" loading="lazy" />
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="text-xl font-extrabold text-secondary">{item.name}</h3>
                    <p className="body-copy mt-2 text-sm">{item.description}</p>
                    <p className="mt-auto pt-4 font-extrabold text-primary">{item.price}</p>
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
            <p className="text-xs font-extrabold uppercase tracking-[.14em] text-primary-foreground/72">Ready to plan the table?</p>
            <h2 className="mt-4 text-4xl font-extrabold leading-tight">Choose the curries, then add rice, dal, and sweets.</h2>
          </div>
          <OrderOnlineButton className="inline-flex min-h-12 items-center rounded-lg bg-foreground px-7 font-bold text-background hover:bg-foreground/90" label="Start an order" />
        </Reveal>
      </section>
    </>
  );
}
