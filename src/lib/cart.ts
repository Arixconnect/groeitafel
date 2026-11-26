import { products } from "../data/products";
export type CartLine = { id: string; quantity: number };
export function validQuantity(value: number): boolean {
  return Number.isInteger(value) && value >= 1 && value <= 20;
}
export function sanitizeCart(input: unknown): CartLine[] {
  if (!Array.isArray(input)) return [];
  const unique = new Map<string, number>();
  for (const row of input) {
    if (
      row &&
      typeof row === "object" &&
      typeof row.id === "string" &&
      products.some((p) => p.id === row.id) &&
      validQuantity(row.quantity)
    )
      unique.set(
        row.id,
        Math.min(20, (unique.get(row.id) || 0) + row.quantity),
      );
  }
  return [...unique].map(([id, quantity]) => ({ id, quantity }));
}
export function calculateCart(lines: CartLine[]) {
  const items = sanitizeCart(lines).map((line) => ({
    ...line,
    product: products.find((p) => p.id === line.id)!,
  }));
  const subtotal = items.reduce(
    (sum, i) => sum + i.product.price * i.quantity,
    0,
  );
  const shipping = items.some((i) => i.product.kind === "physical") ? 495 : 0;
  return { items, subtotal, shipping, fees: 0, total: subtotal + shipping };
}
// Replace this adapter for production. No network, payment or reservation occurs.
export async function demoCheckout(lines: CartLine[]) {
  if (!sanitizeCart(lines).length) throw new Error("Je winkelmand is leeg.");
  return {
    mode: "demo" as const,
    message: "Dit was een demonstratie. Er is niets betaald of gereserveerd.",
  };
}
