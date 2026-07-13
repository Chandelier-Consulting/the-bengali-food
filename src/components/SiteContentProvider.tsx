"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { collection, doc, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase-client";
import { compareMenuItems } from "@/lib/menu-order.mjs";
import { readSiteContentCache, writeSiteContentCache } from "@/lib/site-content-cache.mjs";
import type { MenuItem } from "@/lib/menu-data";
import type { SiteSettings } from "@/lib/site-content";
import GlobalLoadingOverlay from "./GlobalLoadingOverlay";

const MIN_LOADING_MS = 900;

type State = {
  settings: SiteSettings | null;
  menuItems: MenuItem[];
  ready: boolean;
};

type ManagedContent = {
  settings: SiteSettings;
  menuItems: MenuItem[];
};

const Context = createContext<State>({ settings: null, menuItems: [], ready: false });

function normalizeMenuItems(items: MenuItem[]) {
  return items.filter((item) => item.visible).sort(compareMenuItems);
}

export function SiteContentProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [settingsReady, setSettingsReady] = useState(false);
  const [menuReady, setMenuReady] = useState(false);
  const [cacheChecked, setCacheChecked] = useState(false);
  const [hydratedFromCache, setHydratedFromCache] = useState(false);
  const [minimumLoadingElapsed, setMinimumLoadingElapsed] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const cached = readSiteContentCache();

      if (cached?.data.settings) {
        setSettings(cached.data.settings);
        setMenuItems(normalizeMenuItems(cached.data.menuItems as MenuItem[]));
        setSettingsReady(true);
        setMenuReady(true);
        setHydratedFromCache(true);
        setMinimumLoadingElapsed(true);
      }

      setCacheChecked(true);
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (hydratedFromCache) {
      return;
    }

    const timer = window.setTimeout(() => setMinimumLoadingElapsed(true), MIN_LOADING_MS);
    return () => window.clearTimeout(timer);
  }, [hydratedFromCache]);

  useEffect(() => {
    if (!db) {
      return;
    }

    let latestSettings: SiteSettings | null = null;
    let latestMenuItems: MenuItem[] | null = null;

    const persistIfComplete = () => {
      if (!latestSettings || !latestMenuItems) {
        return;
      }

      writeSiteContentCache({
        settings: latestSettings,
        menuItems: latestMenuItems,
      } satisfies ManagedContent);
    };

    const offSettings = onSnapshot(doc(db, "siteContent", "settings"), (snapshot) => {
      latestSettings = snapshot.exists() ? (snapshot.data() as SiteSettings) : null;
      setSettings(latestSettings);
      setSettingsReady(true);
      persistIfComplete();
    });

    const offMenu = onSnapshot(collection(db, "menuItems"), (snapshot) => {
      latestMenuItems = normalizeMenuItems(
        snapshot.docs.map((item) => ({ id: item.id, ...item.data() }) as MenuItem),
      );
      setMenuItems(latestMenuItems);
      setMenuReady(true);
      persistIfComplete();
    });

    return () => {
      offSettings();
      offMenu();
    };
  }, []);

  const ready = settingsReady && menuReady;
  const loading = cacheChecked && !hydratedFromCache && (!ready || !minimumLoadingElapsed);

  const value = useMemo(
    () => ({ settings, menuItems, ready }),
    [settings, menuItems, ready],
  );

  return (
    <Context.Provider value={value}>
      {children}
      <GlobalLoadingOverlay visible={loading} />
    </Context.Provider>
  );
}

export function useSiteContent() {
  return useContext(Context);
}
