"use client";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { collection, doc, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase-client";
import type { MenuItem } from "@/lib/menu-data";
import type { SiteSettings } from "@/lib/site-content";

type State = { settings: SiteSettings | null; menuItems: MenuItem[]; ready: boolean };
const Context = createContext<State>({ settings: null, menuItems: [], ready: false });
export function SiteContentProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<SiteSettings | null>(null); const [menuItems, setMenuItems] = useState<MenuItem[]>([]); const [settingsReady, setSettingsReady] = useState(false); const [menuReady, setMenuReady] = useState(false);
  useEffect(() => { if (!db) return; const offSettings = onSnapshot(doc(db, "siteContent", "settings"), (snapshot) => { setSettings(snapshot.exists() ? snapshot.data() as SiteSettings : null); setSettingsReady(true); }); const offMenu = onSnapshot(collection(db, "menuItems"), (snapshot) => { setMenuItems(snapshot.docs.map((item) => ({ id: item.id, ...item.data() } as MenuItem)).filter((item) => item.visible).sort((a, b) => a.sortOrder - b.sortOrder)); setMenuReady(true); }); return () => { offSettings(); offMenu(); }; }, []);
  return <Context.Provider value={useMemo(() => ({ settings, menuItems, ready: settingsReady && menuReady }), [settings, menuItems, settingsReady, menuReady])}>{children}</Context.Provider>;
}
export function useSiteContent() { return useContext(Context); }
