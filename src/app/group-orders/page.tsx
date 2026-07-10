import type { Metadata } from "next";
import OrderOnlineButton from "@/components/OrderOnlineButton";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = { title: "Catering", description: "Plan Bengali food for gatherings and events with The Bengali Food." };

export default function GroupOrdersPage() {
  return <section className="bg-surface px-5 pb-24 pt-32 sm:px-6"><Reveal className="mx-auto max-w-4xl"><p className="text-xs font-black uppercase tracking-[.2em] text-accent">Events and gatherings</p><h1 className="mt-5 text-5xl font-black leading-[.94] text-secondary sm:text-7xl">Bengali food for a table worth gathering around.</h1><p className="mt-6 max-w-2xl text-lg leading-8 text-muted">Whether it is a family meal or a larger event, begin with the online menu to see current dishes and place an order.</p><OrderOnlineButton className="mt-8 inline-flex min-h-13 items-center justify-center rounded-lg bg-primary px-7 text-base font-black text-[#142016]" label="Start an order" /></Reveal></section>;
}
