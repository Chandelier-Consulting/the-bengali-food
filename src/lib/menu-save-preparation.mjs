/** @typedef {import("./dashboard-content").DashboardMenuItem} DashboardMenuItem */
/** @typedef {{ item: DashboardMenuItem; upload: File | null | undefined }} PreparedMenuItem */

/**
 * @param {DashboardMenuItem[]} menuItems
 * @param {Record<string, File | null>} itemUploads
 * @param {(item: DashboardMenuItem) => string} createPersistentId
 * @returns {PreparedMenuItem[]}
 */
export function prepareMenuItemsForSave(menuItems, itemUploads, createPersistentId) {
  return menuItems.map((item) => {
    const upload = itemUploads[item.id];
    const imageSrc = item.imageSrc.trim();

    if (imageSrc.startsWith("blob:") && !upload) {
      throw new Error(`The photo upload is missing for ${item.name || "this menu item"}.`);
    }

    return {
      item: {
        ...item,
        id: item.id.startsWith("new-") ? createPersistentId(item) : item.id,
        name: item.name.trim(),
        price: item.price.trim(),
        description: item.description.trim(),
        imageSrc,
      },
      upload,
    };
  });
}
