export const menuCategoryOrder = [
  "Fish & Seafood",
  "Vegetarian Comforts",
  "Bengali Classics",
  "Rice & Sides",
  "Desserts",
];

const categoryRank = new Map(menuCategoryOrder.map((category, index) => [category, index]));

export function compareMenuItems(left, right) {
  const leftCategory = categoryRank.get(left.category) ?? menuCategoryOrder.length;
  const rightCategory = categoryRank.get(right.category) ?? menuCategoryOrder.length;

  return (
    leftCategory - rightCategory ||
    left.sortOrder - right.sortOrder ||
    left.name.localeCompare(right.name)
  );
}
