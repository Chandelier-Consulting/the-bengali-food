import assert from "node:assert/strict";
import test from "node:test";

let prepareMenuItemsForSave;

try {
  ({ prepareMenuItemsForSave } = await import("../src/lib/menu-save-preparation.mjs"));
} catch {
  // Keep the missing implementation as an assertion failure during the RED step.
}

test("prepares a new item with the upload stored under its temporary client ID", () => {
  assert.equal(typeof prepareMenuItemsForSave, "function");

  const upload = { name: "ilish.jpg" };
  const [prepared] = prepareMenuItemsForSave(
    [{
      id: "new-client-id",
      name: " Ilish Shorshe ",
      price: " $16.00 ",
      description: " Mustard hilsa fish. ",
      category: "Fish & Seafood",
      visible: true,
      sortOrder: 0,
      imageSrc: "blob:preview",
    }],
    { "new-client-id": upload },
    () => "fish-seafood-ilish-shorshe",
  );

  assert.equal(prepared.item.id, "fish-seafood-ilish-shorshe");
  assert.equal(prepared.item.imageSrc, "blob:preview");
  assert.equal(prepared.upload, upload);
  assert.equal(prepared.item.name, "Ilish Shorshe");
});

test("rejects a blob preview that has no file to convert before persistence", () => {
  assert.equal(typeof prepareMenuItemsForSave, "function");

  assert.throws(
    () => prepareMenuItemsForSave(
      [{
        id: "new-client-id",
        name: "Ilish Shorshe",
        price: "$16.00",
        description: "Mustard hilsa fish.",
        category: "Fish & Seafood",
        visible: true,
        sortOrder: 0,
        imageSrc: "blob:stale-preview",
      }],
      {},
      () => "fish-seafood-ilish-shorshe",
    ),
    /photo upload is missing/i,
  );
});
