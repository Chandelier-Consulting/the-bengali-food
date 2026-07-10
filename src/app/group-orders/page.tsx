import type { Metadata } from "next";
import Link from "next/link";
import type { IconType } from "react-icons";
import { FaBriefcase, FaCalendarDay, FaPhone, FaUsers } from "react-icons/fa6";
import ManagedCateringMenuPreview from "@/components/ManagedCateringMenuPreview";
import ManagedImage from "@/components/ManagedImage";
import Reveal from "@/components/Reveal";
import GroupOrderPlanner from "./GroupOrderPlanner";
import { displayPhone, tomysImages, tomysVideos } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Catering",
  description: "Plan catering and call-ahead breakfast, taco, seafood, and lunch pickups from Chef Tomas at Tomy's Kitchen in Mountain View.",
};

const occasions: Array<[IconType, string, string]> = [
  [FaBriefcase, "Office catering", "Breakfast burritos, tacos, seafood, and mixed trays timed for teams."],
  [FaUsers, "Crew lunch", "Mexican favorites first, with practical portions packed for people who need food fast."],
  [FaCalendarDay, "Private events", "Mediterranean, Italian, American, and Continental dishes available when the event needs more range."],
];

const callScript = [
  "How many people are eating?",
  "What pickup time are you aiming for?",
  "Do you want tacos, breakfast, seafood, or a mixed order?",
  "Any spice, salsa, or drink preferences?",
];

const faqs = [
  ["How much notice should I give?", "Call as early as you can. Same-day can work for simple orders, but larger pickup orders are easier when the truck knows the headcount and timing before the rush."],
  ["Can you help me choose?", "Yes. Start with headcount, pickup time, and whether the group wants breakfast, tacos, seafood, or a mixed order. The truck can steer you toward food that travels well."],
  ["Is this catering?", "Yes. It works well for office lunches, crews, and family events, and Chef Tomas can help keep the order simple and easy to pick up."],
  ["What if I need it fast?", "Call instead of texting. Keep the order anchored around proven items like tacos, quesabirria, burritos, and drinks."],
];

const faqStructuredData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map(([question, answer]) => ({
    "@type": "Question",
    name: question,
    acceptedAnswer: {
      "@type": "Answer",
      text: answer,
    },
  })),
};

export default function GroupOrdersPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }} />
      <section className="relative isolate overflow-hidden bg-[var(--kitchen-night)] px-5 pb-18 pt-28 text-white sm:px-6 lg:px-8 lg:pb-20">
        <div className="absolute inset-0 -z-20">
          <video className="h-full w-full object-cover opacity-38" src={tomysVideos.catering} autoPlay muted loop playsInline poster={tomysImages.cateringSalmon} />
        </div>
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(105deg,#11100f_0%,rgba(17,16,15,.96)_45%,rgba(17,16,15,.54)_100%)]" />
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[.94fr_1.06fr] lg:items-center">
          <Reveal>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-accent">Catering and group pickup</p>
            <h1 className="mt-5 max-w-3xl text-4xl font-black leading-[0.94] tracking-[-0.04em] sm:text-6xl lg:text-7xl">Fresh food for teams, crews, and events.</h1>
            <p className="mt-6 max-w-2xl text-lg font-semibold leading-8 text-white/82">
              Call Chef Tomas to build around Mexican favorites, then add Mediterranean, Italian, American, or Continental dishes when the event calls for it.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="tel:+16502898628" className="inline-flex min-h-13 items-center justify-center gap-3 rounded-full bg-primary px-7 text-base font-black text-white transition hover:bg-primary-hover">
                Call for catering <FaPhone aria-hidden />
              </a>
              <Link href="/menu" className="inline-flex min-h-13 items-center justify-center rounded-full border border-white/24 px-7 text-base font-black text-white transition hover:bg-white/10">
                Check menu first
              </Link>
            </div>
          </Reveal>
          <Reveal className="grid gap-4 sm:grid-cols-[.82fr_1.18fr] sm:items-end" variant="float">
            <div className="overflow-hidden rounded-3xl border border-white/12 bg-white/8 p-2">
              <ManagedImage imageKey="Truck" fallback={tomysImages.truck} alt="Tomy's Kitchen truck" width={760} height={980} sizes="(min-width: 1024px) 22vw, 100vw" className="aspect-[4/5] rounded-2xl object-cover" />
            </div>
            <div className="overflow-hidden rounded-3xl border border-white/12 bg-white/8 p-2">
              <ManagedImage imageKey="Catering Pasta" fallback={tomysImages.cateringPasta} alt="Catering pasta by Chef Tomas" width={980} height={760} sizes="(min-width: 1024px) 34vw, 100vw" className="aspect-[4/3] rounded-2xl object-cover" />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-6xl">
          <Reveal className="grid gap-6 lg:grid-cols-[.82fr_1.18fr] lg:items-end">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-accent">Bigger orders, clear phone path</p>
              <h2 className="mt-4 text-4xl font-black leading-none tracking-[-0.03em] text-secondary sm:text-6xl">Make catering easy to start.</h2>
            </div>
            <p className="max-w-2xl text-lg font-semibold leading-8 text-muted">
              Tell Tomas your headcount, pickup time, and favorite dishes, and he can help shape the right order for your group.
            </p>
          </Reveal>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {occasions.map(([Icon, title, body]) => (
              <Reveal key={title} className="rounded-3xl border border-border bg-surface p-6 shadow-[0_20px_60px_rgba(0,0,0,.18)]" variant="float">
                <div className="grid h-12 w-12 place-items-center rounded-full bg-primary/15 text-xl text-accent"><Icon aria-hidden /></div>
                <h3 className="mt-5 text-2xl font-black text-secondary">{title}</h3>
                <p className="mt-3 text-sm font-semibold leading-6 text-muted">{body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-cream px-5 py-20 text-[#171615] sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[.8fr_1.2fr]">
          <Reveal>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-primary">Easy catering call</p>
            <h2 className="mt-4 text-4xl font-black leading-none tracking-[-0.03em] sm:text-6xl">Know what to ask before calling.</h2>
            <p className="mt-5 text-base font-semibold leading-7 text-[#6e5f4d]">
              The fastest group orders start with a few simple details. Call with these ready and the truck can guide the rest.
            </p>
          </Reveal>
          <div className="grid gap-3">
            {callScript.map((question, index) => (
              <Reveal key={question} className="grid gap-3 rounded-3xl border border-[#eadcc9] bg-white p-5 sm:grid-cols-[auto_1fr] sm:items-center" variant="float">
                <span className="grid h-11 w-11 place-items-center rounded-full bg-primary text-sm font-black text-white">0{index + 1}</span>
                <p className="text-xl font-black">{question}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <GroupOrderPlanner />

      <ManagedCateringMenuPreview />

      <section className="bg-[var(--kitchen-night)] px-5 py-20 text-white sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[.78fr_1.22fr]">
          <Reveal>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-accent">Group order FAQ</p>
            <h2 className="mt-4 text-4xl font-black leading-none tracking-[-0.03em] sm:text-6xl">Make the call easy.</h2>
            <p className="mt-5 text-base font-semibold leading-7 text-white/78">
              A few clear answers can help you decide faster and place the order with confidence.
            </p>
          </Reveal>
          <div className="grid gap-3">
            {faqs.map(([question, answer]) => (
              <Reveal key={question} className="rounded-3xl border border-white/10 bg-white/[0.06] p-5" variant="float">
                <h3 className="text-xl font-black">{question}</h3>
                <p className="mt-3 text-sm font-semibold leading-6 text-white/78">{answer}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 pb-20 sm:px-6 lg:px-8 lg:pb-24">
        <Reveal className="mx-auto grid max-w-6xl gap-5 rounded-[2rem] border border-primary/30 bg-primary/12 p-6 md:grid-cols-[1fr_auto] md:items-center md:p-8" variant="float">
          <div>
            <h2 className="text-3xl font-black text-secondary">Ready to plan catering?</h2>
            <p className="mt-2 max-w-2xl text-sm font-semibold leading-6 text-muted">Call with your headcount, pickup time, cuisine direction, and budget. Tomas will steer you toward what travels best.</p>
          </div>
          <a href="tel:+16502898628" className="inline-flex min-h-12 items-center justify-center rounded-full bg-primary px-7 text-sm font-black text-white transition hover:bg-primary-hover">Call {displayPhone}</a>
        </Reveal>
      </section>
    </>
  );
}
