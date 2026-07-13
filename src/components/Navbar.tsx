"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useScroll } from "framer-motion";
import { useEffect, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import OrderOnlineButton from "./OrderOnlineButton";
import { useSiteContent } from "./SiteContentProvider";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/group-orders", label: "Catering" },
  { href: "/about", label: "About" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const isHome = pathname === "/";
  const { settings } = useSiteContent();

  useEffect(() => {
    return scrollY.on("change", (latest) => setIsScrolled(latest > 24));
  }, [scrollY]);

  if (pathname.startsWith("/dashboard")) {
    return null;
  }

  const solidNav = !isHome || isScrolled || isOpen;

  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-50 border-b border-border/70 bg-background/92 backdrop-blur-md"
    >
      <nav className="mx-auto flex h-18 max-w-[92rem] items-center justify-between gap-6 px-5 sm:px-6 xl:px-8">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-3 text-lg font-extrabold text-secondary transition-colors sm:text-xl"
          aria-label={`${settings?.businessName ?? "The Bengali Food"} home`}
        >
          <span>{settings?.businessName ?? "The Bengali Food"}</span>
        </Link>

        <div className="hidden min-w-0 flex-1 items-center justify-center lg:flex">
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2">
            {navLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative whitespace-nowrap text-sm font-semibold text-muted-foreground transition-colors hover:text-secondary"
                >
                  {link.label}
                  {active ? (
                    <motion.span
                      layoutId="active-nav"
                      className="absolute -bottom-2 left-0 h-0.5 w-full rounded-full bg-primary"
                    />
                  ) : null}
                </Link>
              );
            })}
          </div>
        </div>

        <div className="hidden shrink-0 items-center gap-3 lg:flex">
          <OrderOnlineButton
            className="inline-flex min-h-11 items-center justify-center whitespace-nowrap rounded-lg bg-primary px-5 text-sm font-extrabold text-primary-foreground transition hover:bg-primary-hover"
          />
        </div>

        <button
          type="button"
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((value) => !value)}
          className={`grid h-11 w-11 shrink-0 place-items-center rounded-full border lg:hidden ${
            solidNav
              ? "border-border text-secondary hover:bg-surface"
              : "border-border text-secondary hover:bg-surface"
          }`}
        >
          {isOpen ? <FaTimes aria-hidden /> : <FaBars aria-hidden />}
        </button>

      </nav>

      <AnimatePresence>
        {isOpen ? (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.2 }}
            className="max-h-[calc(100svh-5rem)] overflow-y-auto border-t border-border bg-background px-5 pb-6 shadow-xl lg:hidden"
          >
            <div className="mx-auto flex max-w-6xl flex-col gap-2 pt-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`rounded-lg px-3 py-3 text-base font-bold ${
                    pathname === link.href
                      ? "bg-surface text-primary"
                      : "text-muted-foreground hover:bg-surface hover:text-secondary"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <OrderOnlineButton
                className="mt-2 rounded-lg bg-primary px-3 py-3 text-base font-black text-primary-foreground"
                label="Order online"
                onOpen={() => setIsOpen(false)}
              />
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.header>
  );
}
