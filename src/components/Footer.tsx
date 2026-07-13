"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaLocationDot } from "react-icons/fa6";
import OrderOnlineButton from "@/components/OrderOnlineButton";
import { useSiteContent } from "@/components/SiteContentProvider";
import Reveal from "@/components/Reveal";

const links = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/group-orders", label: "Catering" },
  { href: "/about", label: "About" },
];

export default function Footer() {
  const pathname = usePathname();
  const { settings } = useSiteContent();

  if (pathname.startsWith("/dashboard")) {
    return null;
  }

  return (
    <footer className="border-t border-border bg-surface text-secondary">
      <div className="mx-auto grid max-w-[88rem] gap-8 px-5 py-12 sm:px-6 md:grid-cols-[1.4fr_1fr_1.2fr] lg:px-8">
        <Reveal>
          <Link href="/" className="text-2xl font-extrabold text-primary">
            {settings?.businessName ?? "The Bengali Food"}
          </Link>
          <p className="mt-4 max-w-sm text-sm leading-6 text-muted-foreground">
            Bengali fish curries, rice, lentils, vegetables, and sweets for pickup, delivery, and shared tables.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <OrderOnlineButton
              className="inline-flex min-h-11 items-center justify-center rounded-lg bg-primary px-4 text-xs font-black text-primary-foreground transition hover:bg-primary-hover"
              label="Order pickup or delivery"
            />
          </div>
        </Reveal>

        <Reveal variant="float">
          <h2 className="text-sm font-bold uppercase tracking-[0.16em] text-primary">Quick Links</h2>
          <nav className="mt-4 grid gap-3" aria-label="Footer navigation">
            {links.map((link) => (
              <Link key={link.href} href={link.href} className="text-sm text-muted-foreground hover:text-secondary">
                {link.label}
              </Link>
            ))}
          </nav>
        </Reveal>

        <Reveal variant="float">
          <h2 className="text-sm font-bold uppercase tracking-[0.16em] text-primary">Contact</h2>
          <div className="mt-4 grid gap-3 text-sm text-muted-foreground">
            <p className="flex gap-3">
              <FaLocationDot className="mt-1 shrink-0 text-primary" aria-hidden />
              <span>Serving {settings?.locationLabel ?? "San Jose, CA"}</span>
            </p>
          </div>
        </Reveal>
      </div>
      <Reveal className="border-t border-border px-5 py-5 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} {settings?.businessName ?? "The Bengali Food"}. All rights reserved.
      </Reveal>
    </footer>
  );
}
