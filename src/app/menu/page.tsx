import type { Metadata } from "next";
import Link from "next/link";
import { FaPhone } from "react-icons/fa6";
import ManagedImage from "@/components/ManagedImage";
import ManagedCateringMenuPreview from "@/components/ManagedCateringMenuPreview";
import ManagedMenuSections from "@/components/ManagedMenuSections";
import OrderOnlineButton from "@/components/OrderOnlineButton";
import Reveal from "@/components/Reveal";
import { menuCategories } from "@/lib/menu-data";
import { tomysImages } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Menu",
  description: "Explore Tomy's Kitchen breakfast, tacos, mains, seafood cocktails, and drinks in Mountain View.",
};

const images = [
  { key: "Breakfast Burrito", src: tomysImages.breakfastBurrito },
  { key: "Fish Tacos (Tacos de Pescado)", src: tomysImages.fishTacos },
  { key: "Shrimp Tacos", src: tomysImages.shrimpTacos },
  { key: "Torta Oaxaqueña", src: tomysImages.torta },
  { key: "Catering Salmon", src: tomysImages.cateringSalmon },
];

export default function MenuPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-[var(--kitchen-night)] px-5 pb-16 pt-28 text-white sm:px-6 lg:px-8 lg:pb-18">
        <div className="absolute inset-0 -z-20">
          <ManagedImage imageKey="Breakfast Burrito" fallback={tomysImages.breakfastBurrito} alt="Breakfast burrito from Tomy's Kitchen" fill priority sizes="100vw" className="object-cover opacity-38" />
        </div>
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(105deg,#11100f_0%,rgba(17,16,15,.96)_44%,rgba(17,16,15,.52)_100%)]" />
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
          <Reveal>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-accent">Fresh from Tomy&apos;s Kitchen</p>
            <h1 className="mt-5 max-w-3xl text-4xl font-black leading-[0.94] tracking-[-0.04em] sm:text-6xl lg:text-7xl">
              Breakfast burritos, tacos, seafood, and lunch favorites in Mountain View.
            </h1>
            <p className="mt-6 max-w-2xl text-lg font-semibold leading-8 text-white/82">
              Order online for pickup or delivery, or call ahead and swing by the truck on El Camino Real for a fresh meal.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <OrderOnlineButton
                className="inline-flex min-h-13 items-center justify-center rounded-full bg-primary px-7 text-base font-black text-white transition hover:bg-primary-hover"
              />
              <a href="tel:+16502898628" className="inline-flex min-h-13 items-center justify-center gap-3 rounded-full border border-white/24 px-7 text-base font-black text-white transition hover:bg-white/10">
                Call order <FaPhone aria-hidden />
              </a>
            </div>
          </Reveal>
          <div className="grid grid-cols-3 gap-3">
            {images.map((image, index) => (
              <Reveal key={image.key} className={`overflow-hidden rounded-3xl border border-white/12 bg-white/8 p-2 ${index === 1 ? "mt-10" : ""}`} variant="float">
                <ManagedImage imageKey={image.key} fallback={image.src} alt="Tomy's Kitchen menu item" width={520} height={700} sizes="(min-width: 1024px) 16vw, 33vw" className="h-80 w-full rounded-2xl object-cover" />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="sticky top-[72px] z-30 border-y border-border bg-background/92 px-5 py-4 backdrop-blur-xl sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-3">
          <nav aria-label="Menu categories" className="flex gap-2 overflow-x-auto [scrollbar-width:none]">
            {menuCategories.filter((category) => category.name !== "Catering").map((category) => (
              <a key={category.name} href={`#${category.name.toLowerCase().replaceAll(" ", "-")}`} className="shrink-0 rounded-full border border-border bg-surface px-5 py-3 text-sm font-black text-muted transition hover:border-primary hover:text-white">
                {category.name}
              </a>
            ))}
          </nav>
        </div>
      </section>

      <ManagedMenuSections fallback={menuCategories} hiddenCategories={["Catering"]} />

      <ManagedCateringMenuPreview />

      <section className="px-5 pb-20 sm:px-6 lg:px-8 lg:pb-24">
        <Reveal className="mx-auto grid max-w-6xl gap-5 rounded-[2rem] border border-primary/30 bg-primary/12 p-6 md:grid-cols-[1fr_auto] md:items-center md:p-8" variant="float">
          <div>
            <h2 className="text-3xl font-black text-secondary">Ordering for a crew?</h2>
            <p className="mt-2 max-w-2xl text-sm font-semibold leading-6 text-muted">Call ahead so the truck can time larger breakfast, taco, or lunch pickups without slowing the window.</p>
          </div>
          <Link href="/group-orders" className="inline-flex min-h-12 items-center justify-center rounded-full bg-primary px-7 text-sm font-black text-white transition hover:bg-primary-hover">Plan catering</Link>
        </Reveal>
      </section>
    </>
  );
}
