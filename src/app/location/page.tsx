import type { Metadata } from "next";
import type { IconType } from "react-icons";
import { FaClock, FaLocationDot, FaMapLocationDot, FaPhone, FaRoute } from "react-icons/fa6";
import ManagedImage from "@/components/ManagedImage";
import OrderOnlineButton from "@/components/OrderOnlineButton";
import Reveal from "@/components/Reveal";
import { tomysImages } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Location & Hours",
  description: "Find Tomy's Kitchen at 239 W El Camino Real in Mountain View. Open Monday through Saturday, 8:30 AM to 3:00 PM.",
};

const facts: Array<[IconType, string, string, string]> = [
  [FaLocationDot, "Address", "239 W El Camino Real", "Mountain View, CA 94040"],
  [FaClock, "Hours", "Monday-Saturday", "8:30 AM-3:00 PM"],
  [FaPhone, "Phone", "(650) 289-8628", "Call ahead for pickup"],
];

const tips = [
  "Lunch rush is usually easiest if you call before driving over.",
  "Ask what is moving fastest today if you are ordering for a group.",
  "Parking changes around El Camino, so give yourself a few extra minutes at peak time.",
];

export default function LocationPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-[var(--kitchen-night)] px-5 pb-16 pt-28 text-white sm:px-6 lg:px-8 lg:pb-18">
        <div className="absolute inset-0 -z-20">
          <ManagedImage imageKey="Truck" fallback={tomysImages.truck} alt="Tomy's Kitchen truck in Mountain View" fill priority sizes="100vw" className="object-cover opacity-40" />
        </div>
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(105deg,#11100f_0%,rgba(17,16,15,.96)_45%,rgba(17,16,15,.54)_100%)]" />
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[.9fr_1.1fr] lg:items-end">
          <Reveal>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-accent">Location & hours</p>
            <h1 className="mt-5 max-w-3xl text-4xl font-black leading-[0.94] tracking-[-0.04em] sm:text-6xl lg:text-7xl">Find the red Tomy&apos;s truck on El Camino Real.</h1>
            <p className="mt-6 max-w-2xl text-lg font-semibold leading-8 text-white/82">
              Find Tomy&apos;s Kitchen in Mountain View for breakfast, tacos, seafood, and quick call-ahead pickup Monday through Saturday.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="tel:+16502898628" className="inline-flex min-h-13 items-center justify-center rounded-full bg-primary px-7 text-base font-black text-white transition hover:bg-primary-hover">Call pickup</a>
              <a href="https://www.google.com/maps/search/?api=1&query=239+W+El+Camino+Real+Mountain+View+CA+94040" target="_blank" rel="noreferrer" className="inline-flex min-h-13 items-center justify-center rounded-full border border-white/24 px-7 text-base font-black text-white transition hover:bg-white/10">Open Google Maps</a>
            </div>
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-3">
            {facts.map(([Icon, label, value, detail]) => (
              <Reveal key={label} className="rounded-3xl border border-white/12 bg-white/8 p-5 backdrop-blur" variant="float">
                <div className="grid h-11 w-11 place-items-center rounded-full bg-accent/15 text-accent"><Icon aria-hidden /></div>
                <p className="mt-5 text-xs font-black uppercase tracking-[0.16em] text-white/64">{label}</p>
                <h2 className="mt-2 text-xl font-black text-white">{value}</h2>
                <p className="mt-1 text-sm font-semibold leading-6 text-white/78">{detail}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1.2fr_.8fr] lg:items-stretch">
          <Reveal className="overflow-hidden rounded-[2rem] border border-border bg-surface shadow-[0_24px_80px_rgba(0,0,0,.24)]" variant="float">
            <div className="h-[520px] w-full lg:h-full lg:min-h-[620px]">
              <iframe title="Map to Tomy's Kitchen" src="https://www.google.com/maps?q=239%20W%20El%20Camino%20Real%2C%20Mountain%20View%2C%20CA%2094040&output=embed" className="block h-full w-full border-0" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
            </div>
          </Reveal>
          <div className="grid gap-5">
            <Reveal className="rounded-3xl border border-border bg-surface p-6" variant="float">
              <div className="grid h-12 w-12 place-items-center rounded-full bg-primary/15 text-xl text-accent"><FaRoute aria-hidden /></div>
              <h2 className="mt-5 text-3xl font-black text-secondary">Quick visit plan</h2>
              <div className="mt-5 grid gap-4">
                {tips.map((tip, index) => (
                  <p key={tip} className="border-t border-border pt-4 text-sm font-semibold leading-6 text-muted">
                    <span className="mr-3 font-black text-primary">0{index + 1}</span>{tip}
                  </p>
                ))}
              </div>
            </Reveal>
            <Reveal className="rounded-3xl border border-primary/30 bg-primary/12 p-6" variant="float">
              <div className="grid h-12 w-12 place-items-center rounded-full bg-primary text-xl text-white"><FaMapLocationDot aria-hidden /></div>
              <h2 className="mt-5 text-3xl font-black text-secondary">Need a larger pickup?</h2>
              <p className="mt-3 text-sm font-semibold leading-6 text-muted">Call first so the truck can time food, avoid avoidable waits, and tell you what is best for the group size.</p>
              <a href="tel:+16502898628" className="mt-6 inline-flex min-h-12 items-center justify-center rounded-full bg-primary px-7 text-sm font-black text-white transition hover:bg-primary-hover">Call now</a>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="px-5 pb-20 sm:px-6 lg:px-8 lg:pb-24">
        <div className="mx-auto grid max-w-6xl gap-5 lg:grid-cols-[.85fr_1.15fr] lg:items-center">
          <Reveal>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-accent">Before you go</p>
            <h2 className="mt-4 text-4xl font-black leading-none tracking-[-0.03em] text-secondary sm:text-6xl">Look for the red truck and call if you are feeding more than a few people.</h2>
            <p className="mt-5 text-base font-semibold leading-7 text-muted">
              Order pickup or delivery before you head over, then use the map if you want to stop by the truck in person.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <OrderOnlineButton
                className="inline-flex min-h-12 items-center justify-center rounded-full bg-primary px-6 text-sm font-black text-white transition hover:bg-primary-hover"
                label="See all ordering apps"
              />
            </div>
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2">
            <Reveal variant="float">
              <ManagedImage imageKey="Truck" fallback={tomysImages.truck} alt="Tomy's Kitchen truck side" width={720} height={520} className="h-72 w-full rounded-3xl border border-border object-cover" />
            </Reveal>
            <Reveal variant="float">
              <ManagedImage imageKey="Breakfast Burrito" fallback={tomysImages.breakfastBurrito} alt="Tomy's Kitchen breakfast burrito" width={720} height={520} className="h-72 w-full rounded-3xl border border-border object-cover" />
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
