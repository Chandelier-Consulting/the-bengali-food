"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaBookOpen, FaLocationDot, FaTruckFast } from "react-icons/fa6";
import { useSiteContent } from "./SiteContentProvider";

export default function MobileActionBar() {
  const pathname = usePathname();
  const { settings } = useSiteContent();
  const actions = settings ? [{ href: settings.orderUrl, label: "Order", icon: FaTruckFast, external: true }, { href: "/menu", label: "Menu", icon: FaBookOpen }, { href: "/location", label: "Info", icon: FaLocationDot }] : [];

  if (pathname.startsWith("/dashboard")) {
    return null;
  }

  return (
    <nav aria-label="Quick actions" className="fixed inset-x-3 bottom-3 z-50 rounded-lg border border-border bg-surface/96 p-2 shadow-[0_14px_36px_rgba(37,23,17,.18)] backdrop-blur-xl md:hidden">
      <div className="grid grid-cols-3 gap-1">
        {actions.map((action) => {
          const Icon = action.icon;
          const className = "grid min-h-14 place-items-center gap-1 rounded-lg px-2 py-2 text-[0.72rem] font-black uppercase tracking-[0.08em] text-muted-foreground transition hover:bg-background hover:text-secondary";

          if (action.external) {
            return (
              <a key={action.label} href={action.href} target="_blank" rel="noreferrer" className={className}>
                <Icon className="text-base text-accent" aria-hidden />
                {action.label}
              </a>
            );
          }

          return (
            <Link key={action.label} href={action.href} className={className}>
              <Icon className="text-base text-accent" aria-hidden />
              {action.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
