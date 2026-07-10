export const cateringMenuHeadingField = "cateringMenuHeading";
export const defaultCateringMenuHeading = "Start with the reliable favorites.";

export function resolveCateringMenuHeading(value?: string | null) {
  if (typeof value !== "string") return defaultCateringMenuHeading;

  const trimmed = value.trim();
  return trimmed || defaultCateringMenuHeading;
}
