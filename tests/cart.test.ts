import test from "node:test";
import assert from "node:assert/strict";
import {
  calculateCart,
  sanitizeCart,
  validQuantity,
  demoCheckout,
} from "../src/lib/cart";
import { evenings } from "../src/data/program";
import { products } from "../src/data/products";
test("ticket-only: no shipping, including sponsored tickets", () => {
  assert.deepEqual(
    calculateCart([{ id: "q1-workshop-regulier", quantity: 2 }]).total,
    3000,
  );
  assert.equal(
    calculateCart([{ id: "q1-workshop-regulier", quantity: 2 }]).shipping,
    0,
  );
  assert.equal(
    calculateCart([{ id: "q1-workshop-gesponsord", quantity: 1 }]).total,
    0,
  );
});
test("accessory-only: shipping charged once", () => {
  const t = calculateCart([
    { id: "notitieboek", quantity: 2 },
    { id: "totebag", quantity: 1 },
  ]);
  assert.equal(t.subtotal, 4000);
  assert.equal(t.shipping, 495);
  assert.equal(t.total, 4495);
});
test("mixed order: exactly one physical shipping charge", () => {
  const t = calculateCart([
    { id: "q1-vibe-code-regulier", quantity: 2 },
    { id: "kaartenset", quantity: 1 },
  ]);
  assert.equal(t.shipping, 495);
  assert.equal(t.total, 5245);
});
test("empty basket: no cost and cannot checkout", async () => {
  assert.equal(calculateCart([]).total, 0);
  await assert.rejects(() => demoCheckout([]), /leeg/);
});
test("invalid quantities and unknown products are rejected", () => {
  for (const value of [0, -1, 21, 1.5, NaN, Infinity])
    assert.equal(validQuantity(value), false);
  assert.deepEqual(
    sanitizeCart([
      { id: "notitieboek", quantity: -1 },
      { id: "fake", quantity: 1 },
      { id: "notitieboek", quantity: "2" },
      null,
    ]),
    [],
  );
});
test("corrupt storage and repeated IDs are safely normalized", () => {
  assert.deepEqual(sanitizeCart("broken"), []);
  assert.deepEqual(
    sanitizeCart([
      { id: "notitieboek", quantity: 15 },
      { id: "notitieboek", quantity: 15 },
    ]),
    [{ id: "notitieboek", quantity: 20 }],
  );
});
test("removing the final physical item removes shipping", () => {
  const lines = [
    { id: "notitieboek", quantity: 1 },
    { id: "q1-netwerk-regulier", quantity: 1 },
  ];
  assert.equal(
    calculateCart(lines.filter((i) => i.id !== "notitieboek")).shipping,
    0,
  );
});
test("checkout is explicitly a demonstration", async () => {
  const result = await demoCheckout([{ id: "notitieboek", quantity: 1 }]);
  assert.equal(result.mode, "demo");
  assert.equal(
    result.message,
    "Dit was een demonstratie. Er is niets betaald of gereserveerd.",
  );
});
test("each quarter offers all three evening types and both ticket types", () => {
  for (let q = 1; q <= 4; q++) {
    const es = evenings.filter((e) => e.quarter === q);
    assert.equal(es.length, 3);
    assert.equal(new Set(es.map((e) => e.type)).size, 3);
    for (const e of es)
      assert.equal(products.filter((p) => p.eventId === e.id).length, 2);
  }
});
