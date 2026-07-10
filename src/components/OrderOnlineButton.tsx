"use client";

import { useEffect, useState } from "react";
import OrderOnlineModal from "./OrderOnlineModal";

export default function OrderOnlineButton({
  className,
  label = "Order online",
  onOpen,
}: {
  className: string;
  label?: string;
  onOpen?: () => void;
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => {
          onOpen?.();
          setOpen(true);
        }}
        className={className}
      >
        {label}
      </button>
      <OrderOnlineModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
