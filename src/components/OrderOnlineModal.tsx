"use client";

import { AnimatePresence, motion } from "framer-motion";
import { FaArrowUpRightFromSquare, FaXmark } from "react-icons/fa6";
import { orderLinks } from "@/lib/site-content";

export default function OrderOnlineModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[70] bg-black/70 px-5 py-8 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.985 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="mx-auto mt-16 max-w-xl overflow-hidden rounded-[2rem] border border-white/12 bg-[linear-gradient(180deg,#1e1b18_0%,#151311_100%)] text-white shadow-[0_32px_100px_rgba(0,0,0,.45)]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 border-b border-white/10 px-6 py-6 sm:px-8">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.2em] text-accent">Order Tomy&apos;s online</p>
                <h2 className="mt-3 text-3xl font-black leading-none sm:text-4xl">Choose your favorite app and place the order.</h2>
                <p className="mt-3 max-w-lg text-sm font-semibold leading-6 text-white/76">
                  Pickup and delivery are available through the services below. Tap one and finish your order there.
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close ordering options"
                className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-white/12 text-white/74 transition hover:bg-white/10 hover:text-white"
              >
                <FaXmark aria-hidden />
              </button>
            </div>

            <div className="grid gap-3 px-6 py-6 sm:px-8 sm:py-8">
              {orderLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex min-h-16 items-center justify-between rounded-3xl border border-white/14 bg-[#11100f] px-5 py-4 text-base font-black text-white transition hover:border-white/28 hover:bg-white/10"
                >
                  <span>{link.label}</span>
                  <FaArrowUpRightFromSquare aria-hidden className="text-sm" />
                </a>
              ))}
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
