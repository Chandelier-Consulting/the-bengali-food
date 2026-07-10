"use client";
import { useSiteContent } from "./SiteContentProvider";
import { Button } from "@/components/ui/button";
export default function OrderOnlineButton({ className, label = "Order online" }: { className: string; label?: string; onOpen?: () => void }) { const { settings } = useSiteContent(); if (!settings) return null; return <Button asChild className={className}><a href={settings.orderUrl} target="_blank" rel="noreferrer">{label}</a></Button>; }
