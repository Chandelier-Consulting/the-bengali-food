import Link from "next/link";
import { FaArrowRight, FaBowlFood, FaLeaf, FaStar } from "react-icons/fa6";
import ManagedImage from "@/components/ManagedImage";
import OrderOnlineButton from "@/components/OrderOnlineButton";
import Reveal from "@/components/Reveal";
import { menuCategories } from "@/lib/menu-data";
import { bengaliImages, locationLabel } from "@/lib/site-content";

const favorites = menuCategories[0].items.slice(0, 3);

export default function HomeTruckJourney() {
  return (
    <>
      <section className="relative isolate min-h-screen overflow-hidden bg-[var(--kitchen-night)] px-5 pb-16 pt-28 text-white sm:px-6 lg:px-8">
        <ManagedImage imageKey="Hero" fallback={bengaliImages.hero} alt="Bengali dishes with mustard prawn curry, rice, dal, and eggplant" fill priority sizes="100vw" className="absolute inset-0 -z-20 h-full w-full object-cover opacity-55" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(20,23,18,.98)_0%,rgba(20,23,18,.84)_43%,rgba(20,23,18,.18)_100%)]" />
        <div className="mx-auto flex min-h-[calc(100vh-9rem)] max-w-6xl items-center">
          <Reveal className="max-w-3xl">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-accent">Authentic Bengali cuisine · {locationLabel}</p>
            <h1 className="mt-5 text-5xl font-black leading-[0.94] text-white sm:text-7xl">Bengal, cooked close to home.</h1>
            <p className="mt-6 max-w-2xl text-lg font-medium leading-8 text-white/84">Mustard-rich fish curries, comforting lentils, and Bengali classics made for weeknight comfort and special gatherings.</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <OrderOnlineButton className="inline-flex min-h-13 items-center justify-center gap-3 rounded-lg bg-primary px-7 text-base font-black text-[#142016] transition hover:bg-primary-hover" label="Order pickup or delivery" />
              <Link href="/menu" className="inline-flex min-h-13 items-center justify-center gap-3 rounded-lg border border-white/25 px-7 text-base font-black text-white transition hover:bg-white/10">Explore the menu <FaArrowRight aria-hidden /></Link>
            </div>
            <p className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-white/78"><FaStar className="text-accent" aria-hidden /> 4.3 rating from 20+ DoorDash customers</p>
          </Reveal>
        </div>
      </section>

      <section className="border-y border-border bg-surface px-5 py-10 sm:px-6 lg:px-8">
        <Reveal className="mx-auto grid max-w-6xl gap-5 md:grid-cols-3">
          <div className="flex gap-4"><FaBowlFood className="mt-1 text-2xl text-accent" aria-hidden /><div><h2 className="text-xl font-black text-secondary">Bengali classics</h2><p className="mt-1 text-sm leading-6 text-muted">A focused menu built around the dishes Bengal is known for.</p></div></div>
          <div className="flex gap-4"><FaLeaf className="mt-1 text-2xl text-primary" aria-hidden /><div><h2 className="text-xl font-black text-secondary">Mustard & spice</h2><p className="mt-1 text-sm leading-6 text-muted">Bold mustard, green chili, lentils, and layered warming spices.</p></div></div>
          <div className="flex gap-4"><FaStar className="mt-1 text-2xl text-accent" aria-hidden /><div><h2 className="text-xl font-black text-secondary">Easy ordering</h2><p className="mt-1 text-sm leading-6 text-muted">Choose pickup or delivery through the live online menu.</p></div></div>
        </Reveal>
      </section>

      <section className="px-5 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <Reveal className="grid gap-5 lg:grid-cols-[.85fr_1.15fr] lg:items-end"><div><p className="text-xs font-black uppercase tracking-[0.2em] text-primary">Start here</p><h2 className="mt-4 text-4xl font-black leading-none text-secondary sm:text-6xl">From mustard fish to generous prawn curry.</h2></div><p className="max-w-2xl text-lg leading-8 text-muted">Bengali cooking brings freshwater fish, mustard, vegetables, and slow-building spice together in unmistakably comforting ways.</p></Reveal>
          <div className="mt-10 grid gap-5 md:grid-cols-3">{favorites.map((item) => <Reveal key={item.name} className="overflow-hidden rounded-lg border border-border bg-surface" variant="float"><ManagedImage imageKey={item.name} fallback={item.imageSrc} alt={item.name} width={900} height={600} className="h-52 w-full object-cover" /><div className="p-6"><p className="text-xs font-black uppercase tracking-[0.16em] text-primary">Signature dish</p><h3 className="mt-2 text-2xl font-black text-secondary">{item.name}</h3><p className="mt-2 text-sm leading-6 text-muted">{item.description}</p><p className="mt-4 font-black text-accent">{item.price}</p></div></Reveal>)}</div>
        </div>
      </section>

      <section className="bg-[#e7d6a6] px-5 py-20 text-[#142016] sm:px-6 lg:px-8"><Reveal className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[1fr_auto] lg:items-center"><div><p className="text-xs font-black uppercase tracking-[0.2em] text-[#9f302a]">For shared tables</p><h2 className="mt-3 text-4xl font-black leading-none sm:text-5xl">Bring Bengali comfort food to the gathering.</h2><p className="mt-4 max-w-2xl text-lg leading-7 text-[#465245]">Planning dinner for a group or an event? Start with the online menu and choose the dishes that make the table feel complete.</p></div><OrderOnlineButton className="inline-flex min-h-12 items-center justify-center rounded-lg bg-[#9f302a] px-7 text-sm font-black text-white transition hover:bg-[#7c241f]" label="Start an order" /></Reveal></section>
    </>
  );
}
