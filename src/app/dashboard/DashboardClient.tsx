"use client";

/* eslint-disable @next/next/no-img-element */
import { useEffect, useMemo, useState, useTransition } from "react";
import { FaPlus, FaTriangleExclamation, FaTrash } from "react-icons/fa6";
import { collection, deleteDoc, doc, onSnapshot, setDoc } from "firebase/firestore";
import type { DashboardImageOption, DashboardImageSlot, DashboardMenuItem } from "@/lib/dashboard-content";
import { db, firebaseReady } from "@/lib/firebase-client";
import { prepareMenuItemsForSave } from "@/lib/menu-save-preparation.mjs";

const baseCategories = ["Fish & Seafood", "Vegetarian Comforts", "Bengali Classics"];

function slugify(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function buildNewMenuItem(items: DashboardMenuItem[], category: string, fallbackImage: string): DashboardMenuItem {
  const count = items.filter((item) => item.category === category).length;

  return {
    id: `new-${crypto.randomUUID()}`,
    name: "",
    price: "",
    description: "",
    category,
    visible: true,
    sortOrder: count,
    imageSrc: fallbackImage,
  };
}

function PhotoPreview({ src, alt, className }: { src: string; alt: string; className: string }) {
  if (!src) {
    return (
      <div className={`${className} grid place-items-center border border-dashed border-white/10 bg-black/24 text-center text-xs font-black uppercase tracking-[0.14em] text-white/46`}>
        No photo yet
      </div>
    );
  }

  return <img src={src} alt={alt} className={className} />;
}

async function fileToDataUrl(file: File) {
  const rawDataUrl = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(reader.error ?? new Error("Could not read file."));
    reader.readAsDataURL(file);
  });

  const preview = await new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error("Could not prepare image."));
    image.src = rawDataUrl;
  });

  const maxWidth = 1600;
  const scale = Math.min(1, maxWidth / preview.width);
  const width = Math.max(1, Math.round(preview.width * scale));
  const height = Math.max(1, Math.round(preview.height * scale));
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext("2d");

  if (!context) {
    throw new Error("Could not process image.");
  }

  context.drawImage(preview, 0, 0, width, height);
  return canvas.toDataURL("image/jpeg", 0.82);
}

export default function DashboardClient({
  availableImages,
  initialImageSelections,
  initialMenuItems,
  imageSlots,
  onSignOut,
}: {
  availableImages: DashboardImageOption[];
  initialImageSelections: Record<string, string>;
  initialMenuItems: DashboardMenuItem[];
  imageSlots: DashboardImageSlot[];
  onSignOut: () => Promise<void>;
}) {
  const [imageSelections, setImageSelections] = useState(initialImageSelections);
  const [menuItems, setMenuItems] = useState(initialMenuItems);
  const [remoteItemIds, setRemoteItemIds] = useState<string[]>([]);
  const [sectionStatus, setSectionStatus] = useState("");
  const [menuStatus, setMenuStatus] = useState("");
  const [sectionDirty, setSectionDirty] = useState(false);
  const [menuDirty, setMenuDirty] = useState(false);
  const [sectionUploads, setSectionUploads] = useState<Record<string, File | null>>({});
  const [itemUploads, setItemUploads] = useState<Record<string, File | null>>({});
  const [savingSections, startSavingSections] = useTransition();
  const [savingMenu, startSavingMenu] = useTransition();
  const managerConnected = firebaseReady && Boolean(db);

  const categories = useMemo(() => {
    const dynamic = Array.from(new Set(menuItems.map((item) => item.category).filter(Boolean)));
    return Array.from(new Set([...baseCategories, ...dynamic]));
  }, [menuItems]);

  const imageChoices = useMemo(() => {
    const choices = [
      ...availableImages,
      ...Object.entries(imageSelections)
        .filter(([, src]) => Boolean(src))
        .map(([label, src]) => ({ label, src })),
    ];
    return Array.from(new Map(choices.map((image) => [image.src, image])).values());
  }, [availableImages, imageSelections]);

  const globalSlots = useMemo(() => {
    const categoryKeys = new Set(categories);
    return imageSlots.filter((slot) => !categoryKeys.has(slot.key));
  }, [categories, imageSlots]);

  const sectionSlots = useMemo(() => {
    const slotMap = new Map(imageSlots.map((slot) => [slot.key, slot]));
    return categories.map((category) => slotMap.get(category) ?? { key: category, label: `${category} section`, defaultSrc: imageChoices[0]?.src ?? "" });
  }, [categories, imageChoices, imageSlots]);

  const groupedMenu = useMemo(() => {
    return sectionSlots.map((slot) => ({
      slot,
      items: menuItems
        .filter((item) => item.category === slot.key)
        .sort((left, right) => left.sortOrder - right.sortOrder || left.name.localeCompare(right.name)),
    }));
  }, [menuItems, sectionSlots]);

  useEffect(() => {
    if (!db) return;

    const unsubSettings = onSnapshot(doc(db, "siteContent", "settings"), (snapshot) => {
      const settings = snapshot.data();
      const images = settings?.images as Record<string, string> | undefined;
      if (!sectionDirty && !savingSections) {
        if (images) {
          setImageSelections((current) => ({ ...current, ...images }));
        }
      }
    });

    const unsubMenu = onSnapshot(collection(db, "menuItems"), (snapshot) => {
      setRemoteItemIds(snapshot.docs.map((docSnap) => docSnap.id));
      const items = snapshot.docs.map((docSnap) => {
        const data = docSnap.data() as Partial<DashboardMenuItem>;
        return {
          id: docSnap.id,
          name: data.name ?? "",
          price: data.price ?? "",
          description: data.description ?? "",
          category: data.category ?? "Breakfast",
          visible: data.visible ?? true,
          sortOrder: typeof data.sortOrder === "number" ? data.sortOrder : 0,
          imageSrc: data.imageSrc ?? "",
        };
      });

      if (items.length && !menuDirty && !savingMenu) {
        setMenuItems(items);
      }
    });

    return () => {
      unsubSettings();
      unsubMenu();
    };
  }, [menuDirty, savingMenu, savingSections, sectionDirty]);

  const updateMenuItem = (id: string, field: keyof DashboardMenuItem, value: string | number | boolean) => {
    setMenuDirty(true);
    setMenuItems((current) => current.map((item) => (item.id === id ? { ...item, [field]: value } : item)));
  };

  const addMenuItem = (category: string, fallbackImage: string) => {
    setMenuDirty(true);
    setMenuItems((current) => [...current, buildNewMenuItem(current, category, fallbackImage)]);
    setMenuStatus("");
  };

  const removeMenuItem = (id: string) => {
    setMenuDirty(true);
    setMenuItems((current) => current.filter((item) => item.id !== id));
    setMenuStatus("");
  };

  const saveSectionPhotos = () => {
    startSavingSections(async () => {
      const firestore = db;

      if (!firestore) {
        setSectionStatus("Firebase is not ready yet.");
        return;
      }

      setSectionStatus("Saving photos...");

      const nextImages = { ...imageSelections };

      for (const slot of [...globalSlots, ...sectionSlots]) {
        const file = sectionUploads[slot.key];
        if (!file) continue;

        nextImages[slot.key] = await fileToDataUrl(file);
      }

      await setDoc(
        doc(firestore, "siteContent", "settings"),
        { images: nextImages },
        { merge: true },
      );
      setImageSelections(nextImages);
      setSectionUploads({});
      setSectionDirty(false);
      setSectionStatus("Photos saved.");
    });
  };

  const saveMenu = () => {
    let preparedEntries;

    try {
      preparedEntries = prepareMenuItemsForSave(
        menuItems,
        itemUploads,
        (item: DashboardMenuItem) => `${slugify(item.category)}-${slugify(item.name || crypto.randomUUID())}`,
      );
    } catch (error) {
      setMenuStatus(error instanceof Error ? error.message : "Could not prepare menu photos.");
      return;
    }

    const preparedItems = preparedEntries.map(({ item }) => item);

    const invalidItem = preparedItems.find((item) => !item.name || !item.price || !item.description || !item.category || !item.imageSrc);
    if (invalidItem) {
      setMenuStatus("Each item needs a name, price, description, section, and photo before you save.");
      return;
    }

    setMenuItems(preparedItems);

    startSavingMenu(async () => {
      const firestore = db;

      if (!firestore) {
        setMenuStatus("Firebase is not ready yet.");
        return;
      }

      setMenuStatus("Saving menu changes...");

      const finalItems: DashboardMenuItem[] = [];

      for (const { item, upload } of preparedEntries) {
        if (upload) {
          finalItems.push({ ...item, imageSrc: await fileToDataUrl(upload) });
        } else {
          finalItems.push(item);
        }
      }

      await Promise.all(
        finalItems.map((item) =>
          setDoc(
            doc(firestore, "menuItems", item.id),
            {
              name: item.name,
              price: item.price,
              description: item.description,
              category: item.category,
              visible: item.visible,
              sortOrder: item.sortOrder,
              imageSrc: item.imageSrc,
              updatedAt: new Date().toISOString(),
            },
            { merge: true },
          ),
        ),
      );

      const finalIds = new Set(finalItems.map((item) => item.id));
      const removedIds = remoteItemIds.filter((id) => !finalIds.has(id));

      if (removedIds.length) {
        await Promise.all(removedIds.map((id) => deleteDoc(doc(firestore, "menuItems", id))));
      }

      setMenuItems(finalItems);
      setRemoteItemIds(finalItems.map((item) => item.id));
      setItemUploads({});
      setMenuDirty(false);
      setMenuStatus("Menu changes saved.");
    });
  };

  return (
    <div className="mx-auto max-w-7xl">
      <div className="flex flex-col gap-4 border-b border-white/10 pb-8 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.22em] text-accent">For managers</p>
          <h1 className="mt-3 text-4xl font-black leading-none tracking-[-0.03em] sm:text-6xl">Manager dashboard</h1>
          <p className="mt-4 max-w-3xl text-base font-semibold leading-7 text-white/62">
            Update the menu, swap any website photo, and set each menu item image in one place.
          </p>
        </div>
        <div className={`rounded-lg border px-4 py-3 text-sm font-bold ${managerConnected ? "border-accent/30 bg-accent/10 text-accent" : "border-primary/30 bg-primary/12 text-primary"}`}>
          {managerConnected ? "Connected and ready to save" : "Firebase is not ready yet"}
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <button
          type="button"
          onClick={onSignOut}
          className="inline-flex min-h-10 items-center justify-center rounded-lg border border-white/10 px-4 text-sm font-black text-white transition hover:border-primary/40"
        >
          Sign out
        </button>
      </div>

      {!managerConnected ? (
        <div className="mt-6 rounded-lg border border-primary/30 bg-primary/12 p-4 text-sm font-bold leading-6 text-primary">
          <div className="flex items-start gap-3">
            <FaTriangleExclamation className="mt-0.5 shrink-0" aria-hidden />
            <p>Check the Firebase web config or network connection, then try saving again.</p>
          </div>
        </div>
      ) : null}

      <div className="mt-8 flex flex-wrap gap-3">
        <button
          type="button"
          disabled={!managerConnected || savingSections}
          onClick={saveSectionPhotos}
          className="inline-flex min-h-10 items-center justify-center rounded-lg bg-primary px-4 text-sm font-black text-white transition hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-50"
        >
          {savingSections ? "Saving..." : "Save photos"}
        </button>
        <button
          type="button"
          disabled={!managerConnected || savingMenu}
          onClick={saveMenu}
          className="inline-flex min-h-10 items-center justify-center rounded-lg bg-primary px-4 text-sm font-black text-white transition hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-50"
        >
          {savingMenu ? "Saving..." : "Save menu changes"}
        </button>
        {sectionStatus ? <p className="self-center text-sm font-bold text-accent">{sectionStatus}</p> : null}
        {menuStatus ? <p className="self-center text-sm font-bold text-accent">{menuStatus}</p> : null}
        <p className="text-xs font-semibold leading-5 text-white/54">
          Each menu item needs its own photo before it can be saved.
        </p>
      </div>

      <section className="mt-8 rounded-lg border border-white/10 bg-white/[0.06] p-4">
        <div className="flex flex-col gap-2">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-accent">Photos</p>
          <h2 className="text-3xl font-black">Website and menu photos</h2>
          <p className="max-w-3xl text-sm font-semibold leading-6 text-white/62">
            These images load from Firebase on the live site. Section copy is static in code; only photos and menu records are managed here.
          </p>
        </div>

        <div className="mt-6 grid gap-x-4 gap-y-6 md:grid-cols-2 2xl:grid-cols-3">
          {globalSlots.map((slot) => (
            <article key={slot.key} className="border-t border-white/10 pt-4 first:border-t-0 first:pt-0 md:[&:nth-child(2)]:border-t-0 md:[&:nth-child(2)]:pt-0 2xl:[&:nth-child(3)]:border-t-0 2xl:[&:nth-child(3)]:pt-0">
              <PhotoPreview src={imageSelections[slot.key] ?? slot.defaultSrc} alt={slot.label} className="aspect-[4/3] w-full rounded-lg object-cover" />
              <div className="mt-4">
                <p className="text-sm font-black text-white">{slot.label}</p>
                <p className="mt-1 text-xs font-semibold uppercase tracking-[0.14em] text-white/46">{slot.key}</p>
              </div>
              {imageChoices.length ? (
                <label className="mt-4 grid gap-2 text-sm font-black">
                  Choose saved image
                  <select
                    value={imageSelections[slot.key] ?? slot.defaultSrc}
                    onChange={(event) => {
                      setSectionDirty(true);
                      setImageSelections((current) => ({ ...current, [slot.key]: event.target.value }));
                      setSectionStatus("");
                    }}
                    className="min-h-10 rounded-lg border border-white/10 bg-[#11100f] px-3 text-sm font-semibold text-white outline-none transition focus:border-primary/40"
                  >
                    {imageChoices.map((image) => (
                      <option key={image.src} value={image.src}>
                        {image.label}
                      </option>
                    ))}
                  </select>
                </label>
              ) : null}
              <label className="mt-3 grid gap-2 text-sm font-black">
                Upload custom photo
                <input
                  type="file"
                  accept="image/*"
                  onChange={(event) => {
                    const file = event.target.files?.[0] ?? null;
                    if (!file) return;
                    setSectionDirty(true);
                    setSectionUploads((current) => ({ ...current, [slot.key]: file }));
                    setImageSelections((current) => ({ ...current, [slot.key]: URL.createObjectURL(file) }));
                    setSectionStatus("");
                  }}
                  className="text-xs font-semibold text-white/72 file:mr-3 file:rounded-full file:border-0 file:bg-primary file:px-3 file:py-2 file:text-xs file:font-black file:text-white"
                />
              </label>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-8 grid gap-4">
        {groupedMenu.map(({ slot, items }) => (
          <article key={slot.key} className="rounded-lg border border-white/10 bg-white/[0.06] p-4">
            <div className="flex flex-col gap-4 xl:grid xl:grid-cols-[280px_1fr] xl:items-start">
              <div>
                <PhotoPreview src={imageSelections[slot.key] ?? slot.defaultSrc} alt={slot.label} className="aspect-[4/3] w-full rounded-lg object-cover" />
                {imageChoices.length ? (
                  <label className="mt-4 grid gap-2 text-sm font-black">
                    Section photo
                    <select
                      value={imageSelections[slot.key] ?? slot.defaultSrc}
                      onChange={(event) => {
                        setSectionDirty(true);
                        setImageSelections((current) => ({ ...current, [slot.key]: event.target.value }));
                        setSectionStatus("");
                      }}
                      className="min-h-10 rounded-lg border border-white/10 bg-[#11100f] px-3 text-sm font-semibold text-white outline-none transition focus:border-primary/40"
                    >
                      {imageChoices.map((image) => (
                        <option key={image.src} value={image.src}>
                          {image.label}
                        </option>
                      ))}
                    </select>
                  </label>
                ) : null}
                <label className="mt-3 grid gap-2 text-sm font-black">
                  Upload custom section photo
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(event) => {
                      const file = event.target.files?.[0] ?? null;
                      if (!file) return;
                      setSectionDirty(true);
                      setSectionUploads((current) => ({ ...current, [slot.key]: file }));
                      setImageSelections((current) => ({ ...current, [slot.key]: URL.createObjectURL(file) }));
                      setSectionStatus("");
                    }}
                    className="text-xs font-semibold text-white/72 file:mr-3 file:rounded-full file:border-0 file:bg-primary file:px-3 file:py-2 file:text-xs file:font-black file:text-white"
                  />
                </label>
              </div>

              <div className="w-full">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.18em] text-accent">Menu section</p>
                    <h2 className="mt-2 text-3xl font-black">{slot.key}</h2>
                  </div>
                  <button
                    type="button"
                    onClick={() => addMenuItem(slot.key, imageSelections[slot.key] ?? slot.defaultSrc)}
                    className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg border border-white/10 px-4 text-sm font-black text-white transition hover:border-primary/40"
                  >
                    <FaPlus aria-hidden /> Add item to {slot.key}
                  </button>
                </div>

                  <div className="mt-4 divide-y divide-white/10">
                    {items.length ? (
                      items.map((item) => (
                      <article key={item.id} className="py-4 first:pt-0">
                        <div className="grid gap-4 xl:grid-cols-[180px_1fr_auto]">
                          <div>
                            <PhotoPreview src={item.imageSrc} alt={item.name || "Menu item"} className="aspect-[4/3] w-full rounded-lg object-cover" />
                            {imageChoices.length ? (
                              <label className="mt-3 grid gap-2 text-sm font-black">
                                Item photo
                                <select
                                  value={item.imageSrc}
                                  onChange={(event) => updateMenuItem(item.id, "imageSrc", event.target.value)}
                                  className="min-h-10 rounded-lg border border-white/10 bg-[#11100f] px-3 text-sm font-semibold text-white outline-none transition focus:border-primary/40"
                                >
                                  {imageChoices.map((image) => (
                                    <option key={image.src} value={image.src}>
                                      {image.label}
                                    </option>
                                  ))}
                                </select>
                              </label>
                            ) : null}
                            <label className="mt-3 grid gap-2 text-sm font-black">
                              Upload custom item photo
                              <input
                                type="file"
                                accept="image/*"
                                onChange={(event) => {
                                  const file = event.target.files?.[0] ?? null;
                                  if (!file) return;
                                  setMenuDirty(true);
                                  setItemUploads((current) => ({ ...current, [item.id]: file }));
                                  updateMenuItem(item.id, "imageSrc", URL.createObjectURL(file));
                                  setMenuStatus("");
                                }}
                                className="text-xs font-semibold text-white/72 file:mr-3 file:rounded-full file:border-0 file:bg-primary file:px-3 file:py-2 file:text-xs file:font-black file:text-white"
                              />
                            </label>
                          </div>

                          <div className="grid gap-4">
                            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-[1.2fr_.7fr]">
                              <label className="grid gap-2 text-sm font-black">
                                Item name
                                <input
                                  value={item.name}
                                  onChange={(event) => updateMenuItem(item.id, "name", event.target.value)}
                                  className="min-h-10 rounded-lg border border-white/10 bg-[#11100f] px-3 text-sm font-semibold text-white outline-none transition focus:border-primary/40"
                                />
                              </label>
                              <label className="grid gap-2 text-sm font-black">
                                Price
                                <input
                                  value={item.price}
                                  onChange={(event) => updateMenuItem(item.id, "price", event.target.value)}
                                  className="min-h-10 rounded-lg border border-white/10 bg-[#11100f] px-3 text-sm font-semibold text-white outline-none transition focus:border-primary/40"
                                />
                              </label>
                            </div>

                            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-[1fr_.8fr]">
                              <label className="grid gap-2 text-sm font-black">
                                Section
                                <select
                                  value={item.category}
                                  onChange={(event) => updateMenuItem(item.id, "category", event.target.value)}
                                  className="min-h-10 rounded-lg border border-white/10 bg-[#11100f] px-3 text-sm font-semibold text-white outline-none transition focus:border-primary/40"
                                >
                                  {categories.map((category) => (
                                    <option key={category} value={category}>
                                      {category}
                                    </option>
                                  ))}
                                </select>
                              </label>
                              <label className="grid gap-2 text-sm font-black">
                                Item order
                                <input
                                  type="number"
                                  min={0}
                                  value={item.sortOrder}
                                  onChange={(event) => updateMenuItem(item.id, "sortOrder", Number(event.target.value))}
                                  className="min-h-10 rounded-lg border border-white/10 bg-[#11100f] px-3 text-sm font-semibold text-white outline-none transition focus:border-primary/40"
                                />
                              </label>
                            </div>

                            <label className="grid gap-2 text-sm font-black">
                              Description
                              <textarea
                                value={item.description}
                                onChange={(event) => updateMenuItem(item.id, "description", event.target.value)}
                                rows={3}
                                className="rounded-lg border border-white/10 bg-[#11100f] px-3 py-2 text-sm font-semibold text-white outline-none transition focus:border-primary/40"
                              />
                            </label>
                          </div>

                          <div className="flex gap-2 xl:flex-col xl:justify-between">
                            <label className="flex min-h-10 items-center gap-2 rounded-lg border border-white/10 px-3 text-sm font-black text-white/72">
                              <input
                                type="checkbox"
                                checked={item.visible}
                                onChange={(event) => updateMenuItem(item.id, "visible", event.target.checked)}
                                className="h-4 w-4 accent-primary"
                              />
                              Show item
                            </label>
                            <button
                              type="button"
                              onClick={() => removeMenuItem(item.id)}
                              className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg border border-white/10 px-3 text-sm font-black text-white/72 transition hover:border-primary/40 hover:text-white"
                              aria-label={`Remove ${item.name || "menu item"}`}
                            >
                              <FaTrash aria-hidden /> Remove
                            </button>
                          </div>
                        </div>
                      </article>
                    ))
                  ) : (
                    <div className="border-t border-dashed border-white/10 pt-4 text-sm font-semibold text-white/58">
                      No items in this section yet. Use <span className="font-black text-white">Add item to {slot.key}</span> to put one on the menu.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
