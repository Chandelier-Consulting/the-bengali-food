"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaInstagram, FaLocationDot, FaPhone } from "react-icons/fa6";
import OrderOnlineButton from "@/components/OrderOnlineButton";
import Reveal from "@/components/Reveal";
import { displayPhone } from "@/lib/site-content";

const links = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/group-orders", label: "Catering" },
  { href: "/about", label: "About" },
  { href: "/location", label: "Location" },
];

export default function Footer() {
  const pathname = usePathname();

  if (pathname.startsWith("/dashboard")) {
    return null;
  }

  return (
    <footer className="border-t border-border bg-[var(--kitchen-night)] text-white">
      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-12 sm:px-6 md:grid-cols-[1.4fr_1fr_1.2fr] lg:px-8">
        <Reveal>
          <Link href="/" className="text-2xl font-extrabold text-primary">
            Tomy&apos;s Kitchen
          </Link>
          <p className="mt-4 max-w-sm text-sm leading-6 text-white/80">
            Family owned, fresh Mexican breakfast, tacos, seafood, catering, and daily plates on El Camino Real.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <OrderOnlineButton
              className="inline-flex min-h-11 items-center justify-center rounded-full border border-white/14 bg-[#11100f] px-4 text-xs font-black text-white transition hover:bg-white/10"
              label="See all ordering apps"
            />
          </div>
        </Reveal>

        <Reveal variant="float">
          <h2 className="text-sm font-bold uppercase tracking-[0.16em] text-accent">Quick Links</h2>
          <nav className="mt-4 grid gap-3" aria-label="Footer navigation">
            {links.map((link) => (
              <Link key={link.href} href={link.href} className="text-sm text-white/78 hover:text-white">
                {link.label}
              </Link>
            ))}
          </nav>
        </Reveal>

        <Reveal variant="float">
          <h2 className="text-sm font-bold uppercase tracking-[0.16em] text-accent">Contact</h2>
          <div className="mt-4 grid gap-3 text-sm text-white/82">
            <p className="flex gap-3">
              <FaLocationDot className="mt-1 shrink-0 text-primary" aria-hidden />
              <span>239 W El Camino Real, Mountain View, CA 94040</span>
            </p>
            <a className="flex gap-3 hover:text-white" href="tel:+16502898628">
              <FaPhone className="mt-1 shrink-0 text-primary" aria-hidden />
              <span>{displayPhone}</span>
            </a>
            <a
              className="flex gap-3 hover:text-white"
              href="https://www.instagram.com/tomys_kitchen"
              target="_blank"
              rel="noreferrer"
            >
              <FaInstagram className="mt-1 shrink-0 text-primary" aria-hidden />
              <span>@tomys_kitchen</span>
            </a>
          </div>
        </Reveal>
      </div>
      <Reveal className="border-t border-white/10 px-5 py-5 text-center text-xs text-white/72">
        © {new Date().getFullYear()} Tomy&apos;s Kitchen. All rights reserved.
      </Reveal>
    </footer>
  );
}
