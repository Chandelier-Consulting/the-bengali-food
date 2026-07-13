export const SITE_CONTENT_CACHE_VERSION = 1;
export const SITE_CONTENT_CACHE_KEY = `tbf:site-content:v${SITE_CONTENT_CACHE_VERSION}`;

let memoryCache = null;

function isRecord(value) {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function isUsableSettings(settings) {
  return (
    isRecord(settings) &&
    typeof settings.businessName === "string" &&
    typeof settings.locationLabel === "string" &&
    typeof settings.orderUrl === "string" &&
    isRecord(settings.images) &&
    typeof settings.images.Hero === "string"
  );
}

function isUsablePayload(payload) {
  return (
    isRecord(payload) &&
    payload.version === SITE_CONTENT_CACHE_VERSION &&
    isUsableSettings(payload.settings) &&
    Array.isArray(payload.menuItems)
  );
}

export function clearSiteContentMemoryCache() {
  memoryCache = null;
}

export function readSiteContentCache(storage = globalThis.localStorage) {
  if (memoryCache) {
    return { data: memoryCache, source: "memory" };
  }

  if (!storage) {
    return null;
  }

  try {
    const raw = storage.getItem(SITE_CONTENT_CACHE_KEY);
    if (!raw) {
      return null;
    }

    const parsed = JSON.parse(raw);
    if (!isUsablePayload(parsed)) {
      storage.removeItem(SITE_CONTENT_CACHE_KEY);
      return null;
    }

    memoryCache = parsed;
    return { data: parsed, source: "storage" };
  } catch {
    storage.removeItem(SITE_CONTENT_CACHE_KEY);
    return null;
  }
}

export function writeSiteContentCache(data, storage = globalThis.localStorage) {
  const payload = {
    version: SITE_CONTENT_CACHE_VERSION,
    savedAt: Date.now(),
    settings: data.settings,
    menuItems: data.menuItems,
  };

  memoryCache = payload;

  try {
    storage?.setItem(SITE_CONTENT_CACHE_KEY, JSON.stringify(payload));
  } catch {
    // Memory cache still covers the active session when storage is unavailable.
  }

  return payload;
}
