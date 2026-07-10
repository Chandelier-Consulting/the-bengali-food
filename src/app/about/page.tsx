import type { Metadata } from "next";
import Link from "next/link";
import type { IconType } from "react-icons";
import { FaBowlFood, FaHeart, FaLeaf, FaPeopleCarryBox } from "react-icons/fa6";
import ManagedImage from "@/components/ManagedImage";
import Reveal from "@/components/Reveal";
import { tomysImages } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "About",
  description: "Learn about Chef Tomas Tejeda, the family-owned Tomy's Kitchen food truck, and catering across Mexican, Mediterranean, Italian, American, and Continental dishes.",
};

const values: Array<[IconType, string, string]> = [
  [FaLeaf, "Fresh prep", "Produce, seafood, tortillas, salsas, and proteins are handled for the day so plates land bright and generous."],
  [FaHeart, "Regulars matter", "The truck is for people on lunch breaks, work routes, and family pickup runs who want food that feels personal."],
  [FaBowlFood, "Mexican first", "Breakfast burritos, tacos, seafood, mains, and drinks stay at the center of the truck menu."],
  [FaPeopleCarryBox, "Catering range", "For events, Tomas can also cook Mediterranean, Italian, American, and Continental dishes."],
];

const rhythm: Array<[string, string]> = [
  ["Morning", "Breakfast burritos, egg sandwiches, tortillas, salsa, and hot coffee energy."],
  ["Lunch", "Tacos, quesabirria, fajitas, tortas, and seafood plates for the main rush."],
  ["Afternoon", "Final orders, prep notes, sold-out checks, and tomorrow's smarter service."],
];

export default function AboutPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-[var(--kitchen-night)] px-5 pb-18 pt-28 text-white sm:px-6 lg:px-8 lg:pb-20">
        <div className="absolute inset-0 -z-20">
          <ManagedImage imageKey="Truck" fallback={tomysImages.truck} alt="Tomy's Kitchen truck" fill priority sizes="100vw" className="object-cover opacity-38" />
        </div>
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(105deg,#11100f_0%,rgba(17,16,15,.96)_46%,rgba(17,16,15,.56)_100%)]" />
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
          <Reveal>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-accent">About Chef Tomas</p>
            <h1 className="mt-5 max-w-3xl text-4xl font-black leading-[0.94] tracking-[-0.04em] sm:text-6xl lg:text-7xl">Family owned, fresh, and ready for real life.</h1>
            <p className="mt-6 max-w-2xl text-lg font-semibold leading-8 text-white/82">
              Tomy&apos;s Kitchen centers on Chef Tomas Tejeda&apos;s fresh Mexican food, quick lunch breaks, family pickup, and catering that can stretch into more cuisines for private events.
            </p>
          </Reveal>
          <Reveal className="grid gap-4 sm:grid-cols-[.82fr_1.18fr] sm:items-end" variant="float">
            <div className="overflow-hidden rounded-3xl border border-white/12 bg-white/8 p-2">
              <ManagedImage imageKey="Logo" fallback={tomysImages.logo} alt="Tomy's Kitchen logo" width={760} height={980} sizes="(min-width: 1024px) 22vw, 100vw" className="aspect-[4/5] rounded-2xl bg-white object-contain" />
            </div>
            <div className="overflow-hidden rounded-3xl border border-white/12 bg-white/8 p-2">
              <ManagedImage imageKey="Catering Salmon" fallback={tomysImages.cateringSalmon} alt="Catering dish by Chef Tomas" width={980} height={760} sizes="(min-width: 1024px) 34vw, 100vw" className="aspect-[4/3] rounded-2xl object-cover" />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[.72fr_1.28fr]">
          <Reveal>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-accent">The rhythm</p>
            <h2 className="mt-4 text-4xl font-black leading-none tracking-[-0.03em] text-secondary sm:text-6xl">Food truck pace. Small kitchen care.</h2>
          </Reveal>
          <div className="grid gap-4 md:grid-cols-3">
            {rhythm.map(([title, body]) => (
              <Reveal key={title} className="rounded-3xl border border-border bg-surface p-6" variant="float">
                <h3 className="text-2xl font-black text-secondary">{title}</h3>
                <p className="mt-3 text-sm font-semibold leading-6 text-muted">{body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-cream px-5 py-20 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <blockquote className="max-w-5xl text-4xl font-black leading-[1.02] tracking-[-0.04em] text-primary sm:text-6xl">
              Come for the Mexican favorites people already know, then talk with Tomas if your event needs Mediterranean, Italian, American, or Continental dishes too.
            </blockquote>
          </Reveal>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {values.map(([Icon, title, body]) => (
              <Reveal key={title} className="rounded-3xl border border-border bg-surface p-6 shadow-[0_20px_60px_rgba(0,0,0,.18)]" variant="float">
                <div className="grid h-12 w-12 place-items-center rounded-full bg-primary/15 text-xl text-accent"><Icon aria-hidden /></div>
                <h3 className="mt-5 text-2xl font-black text-secondary">{title}</h3>
                <p className="mt-3 text-sm font-semibold leading-6 text-muted">{body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 pb-20 sm:px-6 lg:px-8 lg:pb-24">
        <Reveal className="mx-auto grid max-w-6xl overflow-hidden rounded-[2rem] border border-border bg-surface lg:grid-cols-[1fr_.9fr]" variant="float">
          <ManagedImage imageKey="Truck" fallback={tomysImages.truck} alt="Tomy's Kitchen truck" width={1536} height={1024} sizes="(min-width: 1024px) 50vw, 100vw" className="h-80 w-full object-cover lg:h-full" />
          <div className="p-6 md:p-10">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-accent">Catering and pickup</p>
            <h2 className="mt-4 text-4xl font-black leading-none tracking-[-0.03em] text-secondary">Talk through the food with Tomas.</h2>
            <p className="mt-5 text-base font-semibold leading-7 text-muted">Stop by 239 W El Camino Real for breakfast and lunch, or call ahead for catering shaped around Mexican favorites and the cuisines your event needs.</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/menu" className="inline-flex min-h-12 items-center justify-center rounded-full bg-primary px-7 text-sm font-black text-white transition hover:bg-primary-hover">Explore menu</Link>
              <Link href="/group-orders" className="inline-flex min-h-12 items-center justify-center rounded-full border border-border px-7 text-sm font-black text-secondary transition hover:border-primary hover:text-primary">Catering</Link>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
