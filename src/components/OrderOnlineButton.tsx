"use client";
import { useSiteContent } from "./SiteContentProvider";
export default function OrderOnlineButton({ className, label = "Order online" }: { className: string; label?: string; onOpen?: () => void }) { const { settings } = useSiteContent(); if (!settings) return null; return <a href={settings.orderUrl} target="_blank" rel="noreferrer" className={className}>{label}</a>; }
