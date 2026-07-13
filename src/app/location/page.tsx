"use client";
/* eslint-disable @next/next/no-img-element */

import OrderOnlineButton from "@/components/OrderOnlineButton";
import Reveal from "@/components/Reveal";
import { useSiteContent } from "@/components/SiteContentProvider";

const facts = [
  ["Service area", "San Jose, CA", "Pickup and delivery are handled through online ordering."],
  ["Timing", "Check before checkout", "Hours and item availability can change during the day."],
  ["Fulfillment", "Order online first", "Choose pickup or delivery when you place the order."],
] as const;

export default function LocationPage() {
  const { settings } = useSiteContent();

  if (!settings) return null;

  const heroImage = settings.images.Hero;

  return (
    <>
      <section className="section-shell pt-32">
        <div className="section-inner grid gap-10 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
          <Reveal>
            <p className="eyebrow">Pickup and delivery</p>
            <h1 className="mt-4 max-w-3xl text-5xl font-extrabold leading-[0.98] text-secondary sm:text-7xl">Order The Bengali Food in San Jose.</h1>
            <p className="body-copy mt-6 max-w-2xl text-lg">
              Start online to see today&apos;s dishes, pickup timing, and delivery options.
            </p>
            <OrderOnlineButton className="mt-8 inline-flex min-h-12 items-center rounded-lg bg-primary px-7 font-bold text-primary-foreground hover:bg-primary-hover" label="Order pickup or delivery" />
          </Reveal>
          <Reveal className="media-frame rounded-lg" variant="float">
            <img src={heroImage} alt="Bengali food spread" className="aspect-[4/3] w-full object-cover" />
          </Reveal>
        </div>
      </section>

      <section className="border-y border-border bg-surface px-5 py-16">
        <div className="mx-auto max-w-[88rem]">
          <Reveal className="max-w-2xl">
            <p className="eyebrow">Practical details</p>
            <h2 className="mt-4 text-4xl font-extrabold leading-tight text-secondary sm:text-5xl">Everything you need before ordering.</h2>
          </Reveal>
          <div className="mt-10 divide-y divide-border border-y border-border">
            {facts.map(([label, title, detail]) => (
              <article key={label} className="grid gap-3 py-5 sm:grid-cols-[11rem_1fr]">
                <p className="text-sm font-extrabold uppercase tracking-[.12em] text-primary">{label}</p>
                <div>
                  <h3 className="text-xl font-extrabold text-secondary">{title}</h3>
                  <p className="body-copy mt-2">{detail}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell">
        <Reveal className="section-inner border-l-2 border-primary pl-6 sm:pl-8">
          <p className="eyebrow">Before checkout</p>
          <h2 className="mt-4 max-w-3xl text-4xl font-extrabold leading-tight text-secondary sm:text-5xl">Check timing before you plan the meal.</h2>
          <p className="body-copy mt-5 max-w-2xl">
            The ordering page confirms what is available today and which fulfillment options are open.
          </p>
        </Reveal>
      </section>
    </>
  );
}
