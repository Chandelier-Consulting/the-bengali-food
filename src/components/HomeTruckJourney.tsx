import Link from "next/link";
import { FaArrowRight, FaClock, FaLocationDot, FaPhone, FaStar } from "react-icons/fa6";
import ManagedImage from "@/components/ManagedImage";
import OrderOnlineButton from "@/components/OrderOnlineButton";
import Reveal from "@/components/Reveal";
import { menuCategories } from "@/lib/menu-data";
import { displayPhone, tomysImages, tomysVideos } from "@/lib/site-content";

const images = [
  tomysImages.truck,
  tomysImages.breakfastBurrito,
  tomysImages.fishTacos,
];

const cateringFeatureImages = [
  { key: "Catering feature 1", src: tomysImages.cateringSalmon },
  { key: "Catering feature 2", src: tomysImages.cateringPasta },
  { key: "Catering feature 3", src: tomysImages.cateringSteak },
];

const proof = [
  ["Family owned", "local truck"],
  ["Fresh daily", "breakfast and lunch"],
  ["Best seller", "breakfast burrito"],
  [displayPhone, "call catering"],
];

const serviceCards = [
  {
    title: "Family-owned service",
    body: "Tomy's is the kind of stop where regulars come back for generous plates, warm service, and food that still tastes homemade.",
    image: tomysImages.truck,
  },
  {
    title: "Fresh favorites all day",
    body: "Come hungry for breakfast burritos, fish tacos, shrimp tacos, tortas, seafood plates, aguas frescas, and daily specials.",
    image: tomysImages.fishTacos,
  },
  {
    title: "Catering for the whole group",
    body: "Feeding an office, party, or family event? Chef Tomas can set up Mexican favorites and build out a bigger spread for the occasion.",
    image: tomysImages.cateringSalmon,
  },
];

const steps = [
  ["01", "Choose your meal", "Start with breakfast burritos, tacos, tortas, seafood plates, drinks, and daily favorites."],
  ["02", "Call it in", "Call ahead if you want pickup ready when you get there, especially during the lunch rush."],
  ["03", "Swing by Tomy's", "Find the truck at 239 W El Camino Real in Mountain View and grab your food fresh off the grill."],
];

const reviewCards = [
  {
    quote: "Exactly the kind of spot you want near work: fast service, warm food, and people who treat you right.",
    name: "Lunch regular",
    context: "Mountain View pickup",
  },
  {
    quote: "The breakfast burrito and fish tacos are worth the stop, and calling ahead makes pickup easy.",
    name: "El Camino customer",
    context: "Call-ahead order",
  },
  {
    quote: "Easy to bring back for a crew because everybody finds something they want.",
    name: "Team lunch buyer",
    context: "Group pickup",
  },
];

const breakfastItems = menuCategories.find((category) => category.name === "Breakfast")?.items ?? [];
const tacoItems = menuCategories.find((category) => category.name === "Tacos")?.items ?? [];
const mainsItems = menuCategories.find((category) => category.name === "Mains")?.items ?? [];

const quickPicks = [
  {
    title: "Best seller",
    item: breakfastItems[2],
    note: "A filling breakfast burrito with eggs, potatoes, cheese, salsa, and your choice of meat.",
    image: tomysImages.breakfastBurrito,
  },
  {
    title: "Seafood favorite",
    item: tacoItems[0],
    note: "Crispy Fish tacos with cabbage slaw and creamy sauce for an easy lunch order.",
    image: tomysImages.fishTacos,
  },
  {
    title: "From the grill",
    item: tacoItems[1],
    note: "Shrimp tacos bring fresh flavor, a little char, and a lighter option for taco fans.",
    image: tomysImages.shrimpTacos,
  },
  {
    title: "Hearty pick",
    item: mainsItems[2],
    note: "The torta oaxaquena is a big, satisfying sandwich when you're ready for something heavier.",
    image: tomysImages.torta,
  },
];

export default function HomeTruckJourney() {
  return (
    <>
      <section className="relative isolate min-h-screen overflow-hidden bg-[var(--kitchen-night)] px-5 pb-20 pt-28 text-white sm:px-6 lg:px-8 lg:pb-24">
        <div className="absolute inset-0 -z-20">
          <video className="h-full w-full object-cover opacity-44" src={tomysVideos.promo} autoPlay muted loop playsInline poster={tomysImages.truck} />
        </div>
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(100deg,#11100f_0%,rgba(17,16,15,.96)_42%,rgba(17,16,15,.54)_100%)]" />
        <div className="absolute inset-0 -z-10 opacity-[0.14] [background-image:linear-gradient(rgba(255,247,236,.22)_1px,transparent_1px),linear-gradient(90deg,rgba(255,247,236,.16)_1px,transparent_1px)] [background-size:54px_54px]" />

        <div className="mx-auto grid min-h-[calc(100vh-9rem)] max-w-6xl gap-10 lg:grid-cols-[0.98fr_1.02fr] lg:items-center">
          <Reveal className="lg:max-w-3xl">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-accent">Family owned · fresh Mexican food truck</p>
            <h1 className="mt-5 max-w-3xl text-4xl font-black leading-[0.94] tracking-[-0.04em] text-white sm:text-6xl lg:text-7xl">
              Fresh breakfast burritos, tacos, and catering from Tomy&apos;s.
            </h1>
            <p className="mt-6 max-w-2xl text-lg font-semibold leading-8 text-white/82">
              Stop by for a fast breakfast, an easy lunch, or catering for the whole group. Tomy&apos;s serves fresh Mexican favorites on El Camino with family-owned hospitality.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a href="tel:+16502898628" className="inline-flex min-h-13 items-center justify-center gap-3 rounded-full bg-primary px-7 text-base font-black text-white shadow-[0_18px_50px_rgba(228,95,60,.28)] transition hover:bg-primary-hover">
                Call pickup <FaPhone aria-hidden />
              </a>
              <Link href="/menu" className="inline-flex min-h-13 items-center justify-center gap-3 rounded-full border border-white/22 px-7 text-base font-black text-white transition hover:bg-white/10">
                View menu <FaArrowRight aria-hidden />
              </Link>
              <Link href="/group-orders" className="inline-flex min-h-13 items-center justify-center rounded-full border border-white/22 px-7 text-base font-black text-white transition hover:bg-white/10">
                Catering
              </Link>
            </div>
          </Reveal>

          <Reveal className="grid gap-4 sm:grid-cols-[0.82fr_1.18fr] sm:items-end" variant="float">
            <div className="rounded-3xl border border-white/12 bg-white/8 p-3 backdrop-blur">
              <ManagedImage imageKey="Fish Tacos (Tacos de Pescado)" fallback={images[2]} alt="Tomy's Kitchen fish tacos" className="aspect-[4/5] w-full rounded-2xl object-cover" />
            </div>
            <div className="rounded-3xl border border-white/12 bg-white/8 p-3 backdrop-blur">
              <ManagedImage imageKey="Breakfast Burrito" fallback={images[1]} alt="Tomy's Kitchen breakfast burrito" className="aspect-[4/3] w-full rounded-2xl object-cover" />
              <div className="grid gap-3 p-4 sm:grid-cols-2">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.16em] text-accent">Best seller</p>
                  <p className="mt-1 text-xl font-black">Breakfast burrito</p>
                </div>
                <div className="flex items-center gap-2 text-sm font-bold text-white/82 sm:justify-end">
                  <FaStar className="text-accent" aria-hidden /> Made Fresh Daily
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-y border-border bg-background px-5 py-10 sm:px-6 lg:px-8">
        <Reveal className="mx-auto flex max-w-6xl flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-accent">Order online</p>
            <h2 className="mt-2 text-3xl font-black leading-none tracking-[-0.03em] text-secondary sm:text-4xl">
              Skip the line and order Tomy&apos;s from your phone.
            </h2>
            <p className="mt-3 max-w-2xl text-sm font-semibold leading-6 text-muted">
              Pickup and delivery links are right here, so customers can order breakfast burritos, tacos, and lunch favorites without hunting for them.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <OrderOnlineButton
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-primary px-6 text-sm font-black text-white transition hover:bg-primary-hover"
              label="See all ordering apps"
            />
          </div>
        </Reveal>
      </section>

      <section className="border-y border-border bg-surface px-5 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {proof.map(([value, label]) => (
            <Reveal key={label} className="rounded-2xl border border-border bg-background px-5 py-4" variant="float">
              <p className="text-2xl font-black text-accent">{value}</p>
              <p className="mt-1 text-xs font-black uppercase tracking-[0.14em] text-muted">{label}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="px-5 py-24 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-6xl">
          <Reveal className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-accent">Popular at Tomy&apos;s</p>
              <h2 className="mt-4 text-4xl font-black leading-none tracking-[-0.03em] text-secondary sm:text-6xl">
                Start with the dishes people come back for.
              </h2>
            </div>
            <p className="max-w-2xl text-lg font-semibold leading-8 text-muted">
              If it&apos;s your first time at Tomy&apos;s, these are the breakfast and lunch picks that make an easy first order.
            </p>
          </Reveal>
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {quickPicks.map((pick) => (
              <Reveal key={pick.title} className="overflow-hidden rounded-3xl border border-border bg-surface shadow-[0_24px_70px_rgba(0,0,0,.22)]" variant="float">
                <ManagedImage imageKey={pick.item.name} fallback={pick.image} alt={pick.item.name} className="h-52 w-full object-cover" />
                <div className="p-6">
                  <p className="text-xs font-black uppercase tracking-[0.16em] text-accent">{pick.title}</p>
                  <h3 className="mt-2 text-2xl font-black text-secondary">{pick.item.name}</h3>
                  <p className="mt-2 text-sm font-semibold leading-6 text-muted">{pick.note}</p>
                  <p className="mt-4 text-lg font-black text-primary">{pick.item.price}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-24 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-6xl">
          <Reveal className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-accent">Why people stop here</p>
              <h2 className="mt-4 text-4xl font-black leading-none tracking-[-0.03em] text-secondary sm:text-6xl">
                Fresh food, friendly service, and catering when you need more.
              </h2>
            </div>
            <p className="max-w-2xl text-lg font-semibold leading-8 text-muted">
              Tomy&apos;s is a simple stop for breakfast and lunch in Mountain View, and a reliable call when you need trays for the office, the crew, or a family event.
            </p>
          </Reveal>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {serviceCards.map((card) => (
              <Reveal key={card.title} className="overflow-hidden rounded-3xl border border-border bg-surface shadow-[0_24px_70px_rgba(0,0,0,.22)]" variant="float">
                <ManagedImage imageKey={card.title} fallback={card.image} alt="Tomy's Kitchen food and truck" className="h-56 w-full object-cover" />
                <div className="p-6">
                  <h3 className="text-2xl font-black text-secondary">{card.title}</h3>
                  <p className="mt-3 text-sm font-semibold leading-6 text-muted">{card.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative isolate overflow-hidden px-5 py-24 text-white sm:px-6 lg:px-8 lg:py-28">
        <div className="absolute inset-0 -z-20">
          <video className="h-full w-full object-cover opacity-42" src={tomysVideos.catering} autoPlay muted loop playsInline poster={tomysImages.cateringSalmon} />
        </div>
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(100deg,#11100f_0%,rgba(17,16,15,.94)_48%,rgba(17,16,15,.64)_100%)]" />
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[.8fr_1.2fr] lg:items-center">
          <Reveal>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-accent">Catering by Chef Tomas</p>
            <h2 className="mt-4 text-4xl font-black leading-none tracking-[-0.03em] sm:text-6xl">Bring Tomy&apos;s to the office, the job site, or the party.</h2>
            <p className="mt-5 text-base font-semibold leading-7 text-white/80">
              From taco trays to full event spreads, Chef Tomas can help you feed a crowd with fresh food and generous portions.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link href="/group-orders" className="inline-flex min-h-12 items-center justify-center rounded-full bg-primary px-7 text-sm font-black text-white transition hover:bg-primary-hover">Plan catering</Link>
              <a href="tel:+16502898628" className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/22 px-7 text-sm font-black text-white transition hover:bg-white/10">Call {displayPhone}</a>
            </div>
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-3">
            {cateringFeatureImages.map((image) => (
              <Reveal key={image.key} variant="float">
                <ManagedImage imageKey={image.key} fallback={image.src} alt="Tomy's Kitchen catering dish" className="h-72 w-full rounded-3xl border border-white/12 object-cover shadow-[0_24px_80px_rgba(0,0,0,.32)]" />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-24 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-6xl">
          <Reveal className="grid gap-6 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-accent">Why people come back</p>
              <h2 className="mt-4 text-4xl font-black leading-none tracking-[-0.03em] text-secondary sm:text-6xl">
                Fast enough for lunch. Personal enough to remember.
              </h2>
            </div>
            <p className="max-w-2xl text-lg font-semibold leading-8 text-muted">
              People come back for fresh food, quick pickup, and the kind of neighborhood service that feels easy from the first visit.
            </p>
          </Reveal>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {reviewCards.map((review) => (
              <Reveal key={review.name} className="rounded-3xl border border-border bg-surface p-6 shadow-[0_20px_60px_rgba(0,0,0,.18)]" variant="float">
                <p className="text-5xl font-black leading-none text-primary">&ldquo;</p>
                <p className="mt-3 text-lg font-black leading-7 text-secondary">{review.quote}</p>
                <div className="mt-6 border-t border-border pt-4">
                  <p className="text-sm font-black text-secondary">{review.name}</p>
                  <p className="mt-1 text-xs font-black uppercase tracking-[0.14em] text-muted">{review.context}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-24 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1.05fr_.95fr] lg:items-center">
          <Reveal className="overflow-hidden rounded-3xl border border-border bg-surface" variant="float">
            <ManagedImage imageKey="Truck" fallback={tomysImages.truck} alt="Tomy's Kitchen truck" width={1536} height={1024} sizes="(min-width: 1024px) 50vw, 100vw" className="h-[430px] w-full object-cover" />
          </Reveal>
          <Reveal>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-accent">Plan your stop</p>
            <h2 className="mt-4 text-4xl font-black leading-none tracking-[-0.03em] text-secondary sm:text-6xl">Know what to order before you pull up.</h2>
            <div className="mt-8 grid gap-4">
              {steps.map(([number, title, body]) => (
                <article key={number} className="border-t border-border pt-5">
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-primary">{number}</p>
                  <h3 className="mt-2 text-2xl font-black text-secondary">{title}</h3>
                  <p className="mt-2 text-sm font-semibold leading-6 text-muted">{body}</p>
                </article>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-[var(--kitchen-night)] px-5 py-20 text-white sm:px-6 lg:px-8">
        <Reveal className="mx-auto grid max-w-6xl gap-6 rounded-[2rem] border border-white/10 bg-white/6 p-6 backdrop-blur md:grid-cols-[1fr_auto] md:items-center md:p-8" variant="float">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-accent">Visit today</p>
            <h2 className="mt-3 text-4xl font-black leading-none tracking-[-0.03em]">239 W El Camino Real, Mountain View</h2>
            <div className="mt-5 flex flex-wrap gap-4 text-sm font-bold text-white/82">
              <span className="inline-flex items-center gap-2"><FaClock className="text-accent" aria-hidden /> Mon-Sat, 8:30 AM-3:00 PM</span>
              <span className="inline-flex items-center gap-2"><FaLocationDot className="text-accent" aria-hidden /> Quick El Camino access</span>
            </div>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row md:flex-col">
            <a href="tel:+16502898628" className="inline-flex min-h-12 items-center justify-center rounded-full bg-primary px-7 text-sm font-black text-white transition hover:bg-primary-hover">Call (650) 289-8628</a>
            <Link href="/location" className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/20 px-7 text-sm font-black text-white transition hover:bg-white/10">Get directions</Link>
          </div>
        </Reveal>
      </section>

    </>
  );
}
