"use client";
/* eslint-disable @next/next/no-img-element */

import OrderOnlineButton from "@/components/OrderOnlineButton";
import Reveal from "@/components/Reveal";
import { useSiteContent } from "@/components/SiteContentProvider";

const facts = [
  ["Service area", "San Jose, CA", "Pickup and delivery options are available through the live ordering menu."],
  ["Live availability", "Check before checkout", "Hours, timing, and current dishes can change, so the ordering menu is the source of truth."],
  ["Order online first", "Start with the live menu", "Choose the fulfillment option there and complete your order directly with the ordering provider."],
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
              Use the live ordering menu to choose pickup or delivery, check current availability, and complete checkout.
            </p>
            <OrderOnlineButton className="mt-8 inline-flex min-h-12 items-center rounded-lg bg-primary px-7 font-bold text-primary-foreground hover:bg-primary-hover" label="Order pickup or delivery" />
          </Reveal>
          <Reveal className="media-frame rounded-lg" variant="float">
            <img src={heroImage} alt="Bengali food spread" className="aspect-[4/3] w-full object-cover" />
          </Reveal>
        </div>
      </section>

      <section className="border-y border-border bg-surface px-5 py-16">
        <div className="mx-auto max-w-6xl">
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
          <h2 className="mt-4 max-w-3xl text-4xl font-extrabold leading-tight text-secondary sm:text-5xl">Use the ordering page for current availability.</h2>
          <p className="body-copy mt-5 max-w-2xl">
            The live menu is the accurate place to confirm dishes, pickup timing, delivery options, and fulfillment before you order.
          </p>
        </Reveal>
      </section>
    </>
  );
}
