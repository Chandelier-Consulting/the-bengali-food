import type { Metadata } from "next";
import OrderOnlineButton from "@/components/OrderOnlineButton";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = { title: "Order", description: "Order Bengali Food for pickup or delivery in the San Jose area." };

export default function LocationPage() {
  return <section className="px-5 pb-24 pt-32 sm:px-6"><Reveal className="mx-auto max-w-3xl"><p className="text-xs font-black uppercase tracking-[.2em] text-primary">Pickup and delivery</p><h1 className="mt-5 text-5xl font-black leading-[.94] text-secondary sm:text-7xl">Order The Bengali Food in San Jose.</h1><p className="mt-6 text-lg leading-8 text-muted">Use the restaurant’s live menu to choose pickup or delivery, check current availability, and complete your order.</p><OrderOnlineButton className="mt-8 inline-flex min-h-13 items-center justify-center rounded-lg bg-primary px-7 text-base font-black text-[#142016]" label="Order pickup or delivery" /></Reveal></section>;
}
