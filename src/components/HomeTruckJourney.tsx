"use client";
/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { motion } from "framer-motion";
import { FaArrowRight, FaStar } from "react-icons/fa6";
import { Card, CardContent } from "@/components/ui/card";
import OrderOnlineButton from "./OrderOnlineButton";
import Reveal from "./Reveal";
import { useSiteContent } from "./SiteContentProvider";

export default function HomeTruckJourney() {
  const { settings, menuItems, ready } = useSiteContent();

  if (!ready || !settings) {
    return <section className="min-h-screen bg-background px-5 pt-32 text-foreground">Loading The Bengali Food...</section>;
  }

  const picks = menuItems.slice(0, 3);

  return (
    <>
      <section className="relative isolate min-h-dvh overflow-hidden bg-background px-5 pb-24 pt-28 text-white">
        <img src={settings.images.Hero} alt="Bengali food" className="absolute inset-0 -z-20 h-full w-full object-cover opacity-55" />
        <div className="absolute inset-0 -z-10 bg-black/65" />
        <Reveal className="mx-auto flex min-h-[calc(100dvh-9rem)] max-w-6xl items-center">
          <div className="max-w-3xl">
            <p className="text-xs font-black uppercase tracking-[.2em] text-accent">{settings.home.eyebrow}</p>
            <h1 className="mt-5 text-5xl font-black leading-[.94] sm:text-7xl">{settings.home.title}</h1>
            <p className="mt-7 text-lg leading-8 text-white/82">{settings.home.description}</p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <OrderOnlineButton className="min-h-12 bg-primary px-7 text-base font-bold text-primary-foreground hover:bg-primary/90" label="Order pickup or delivery" />
              <Link href="/menu" className="inline-flex min-h-12 items-center justify-center gap-3 rounded-lg border border-white/25 px-7 text-base font-bold transition-colors hover:bg-white/10">Explore the menu <FaArrowRight /></Link>
            </div>
            <p className="mt-10 flex items-center gap-2 text-sm"><FaStar className="text-accent" />{settings.ratingText}</p>
          </div>
        </Reveal>
      </section>

      <section className="px-5 py-32 lg:py-40">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <p className="text-xs font-black uppercase tracking-[.2em] text-accent">{settings.home.featuredEyebrow}</p>
            <h2 className="mt-5 text-4xl font-black text-secondary sm:text-6xl">{settings.home.featuredTitle}</h2>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">{settings.home.featuredDescription}</p>
          </Reveal>
          <div className="mt-14 grid gap-7 md:grid-cols-3">
            {picks.map((item) => (
              <motion.div key={item.id} whileHover={{ y: -6 }} transition={{ duration: 0.2 }}>
                <Card className="h-full border border-border bg-card py-0 shadow-[0_18px_42px_rgba(0,0,0,.16)]">
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

      <section className="bg-primary px-5 py-28 text-primary-foreground lg:py-36">
        <Reveal className="mx-auto max-w-6xl">
          <p className="text-xs font-black uppercase tracking-[.2em] text-primary-foreground/70">{settings.home.gatheringEyebrow}</p>
          <h2 className="mt-4 text-4xl font-black sm:text-5xl">{settings.home.gatheringTitle}</h2>
          <p className="mt-6 max-w-2xl text-lg leading-8">{settings.home.gatheringDescription}</p>
          <OrderOnlineButton className="mt-8 min-h-12 bg-foreground px-7 font-bold text-background hover:bg-foreground/90" label="Start an order" />
        </Reveal>
      </section>
    </>
  );
}
