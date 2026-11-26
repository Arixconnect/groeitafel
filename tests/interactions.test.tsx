import "./setup";
import test, { afterEach } from "node:test";
import assert from "node:assert/strict";
import { render, cleanup, fireEvent, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { PathnameContext } from "next/dist/shared/lib/hooks-client-context.shared-runtime";
import { Shell, Quantity } from "../src/components/Shell";
import {
  Program,
  MatchPage,
  PlayPage,
  CartPage,
  EventDetail,
  ProductDetail,
  Shop,
} from "../src/components/Pages";
import { Method } from "../src/components/Home";
import { evenings } from "../src/data/program";
import { accessories } from "../src/data/products";
afterEach(() => {
  cleanup();
  localStorage.clear();
});
function shell(ui: React.ReactNode) {
  return render(
    <PathnameContext.Provider value="/">
      <Shell>{ui}</Shell>
    </PathnameContext.Provider>,
  );
}
test("program filters combine quarter and type", () => {
  const r = render(<Program />);
  assert.equal(r.container.querySelectorAll(".event-card").length, 12);
  fireEvent.click(r.getByRole("button", { name: "Q2" }));
  assert.equal(r.container.querySelectorAll(".event-card").length, 3);
  fireEvent.change(r.getByLabelText("Soort avond"), {
    target: { value: "Vibe code avond" },
  });
  assert.equal(r.container.querySelectorAll(".event-card").length, 1);
  assert.match(r.getByRole("status").textContent!, /1 voorbeeldavonden/);
  assert.ok(r.getByRole("link", { name: "Maak een klikbaar klantpad" }));
});
test("profile filters, empty results, reset and reciprocal match", () => {
  const r = render(<MatchPage />);
  fireEvent.change(r.getByLabelText("Vaardigheid"), {
    target: { value: "Ontwerp" },
  });
  assert.equal(r.container.querySelectorAll(".profile-card").length, 1);
  fireEvent.click(
    r.getByRole("button", { name: "Bekijk Noors voorbeeldmatch" }),
  );
  assert.ok(r.getByRole("heading", { name: "Noor + Sam" }));
  fireEvent.change(r.getByLabelText("Hulpvraag"), {
    target: { value: "Netwerk opbouwen" },
  });
  assert.ok(r.getByText("Deze combinatie is er nog niet."));
  fireEvent.click(r.getByRole("button", { name: "Opnieuw beginnen" }));
  assert.equal(r.container.querySelectorAll(".profile-card").length, 4);
});
test("question cards advance and restart; bingo toggles, persists and resets", () => {
  const r = render(<PlayPage />);
  fireEvent.click(r.getByRole("button", { name: "Trek een vraag" }));
  assert.ok(r.getByText("Kaart 1 van 9"));
  fireEvent.click(r.getByRole("button", { name: "Volgende kaart" }));
  assert.ok(r.getByText("Kaart 2 van 9"));
  fireEvent.click(r.getByLabelText("Vraagkaarten opnieuw beginnen"));
  assert.ok(r.getByRole("button", { name: "Trek een vraag" }));
  const bingo = r.container.querySelectorAll(".bingo-grid button");
  for (const button of bingo) fireEvent.click(button);
  assert.match(
    r.container.querySelector(".bingo-footer")!.textContent!,
    /Bingo!/,
  );
  assert.equal(
    JSON.parse(localStorage.getItem("groeitafel-demo-bingo")!).length,
    9,
  );
  fireEvent.click(r.getByRole("button", { name: "Reset bingo" }));
  assert.equal(r.getByRole("progressbar").getAttribute("value"), "0");
  assert.deepEqual(
    JSON.parse(localStorage.getItem("groeitafel-demo-bingo")!),
    [],
  );
});
test("method keyboard tab navigation", async () => {
  const r = render(<Method />);
  const user = userEvent.setup();
  r.getByRole("tab", { name: "1 Matchtafel" }).focus();
  await user.keyboard("{ArrowRight}");
  assert.equal(
    r
      .getByRole("tab", { name: "2 Waarde-uitwisseling" })
      .getAttribute("aria-selected"),
    "true",
  );
  assert.match(r.getByRole("tabpanel").textContent!, /Allebei iets te brengen/);
  await user.keyboard("{End}");
  assert.equal(
    r
      .getByRole("tab", { name: "5 Volgende stap" })
      .getAttribute("aria-selected"),
    "true",
  );
});
test("quantity rejects negative and excessive values", () => {
  const values: number[] = [];
  const r = render(<Quantity value={1} onChange={(n) => values.push(n)} />);
  const input = r.getByRole("spinbutton");
  fireEvent.change(input, { target: { value: "-1" } });
  fireEvent.change(input, { target: { value: "21" } });
  fireEvent.change(input, { target: { value: "1.5" } });
  assert.equal(values.length, 0);
  fireEvent.change(input, { target: { value: "3" } });
  assert.deepEqual(values, [3]);
  assert.ok(
    r.getByRole("button", { name: "Aantal verlagen" }).hasAttribute("disabled"),
  );
});
for (const [name, items, total] of [
  ["ticket-only", [{ id: "q1-workshop-regulier", quantity: 1 }], "€ 15,00"],
  ["accessory-only", [{ id: "notitieboek", quantity: 1 }], "€ 17,45"],
  [
    "mixed",
    [
      { id: "q1-workshop-regulier", quantity: 1 },
      { id: "notitieboek", quantity: 1 },
    ],
    "€ 32,45",
  ],
] as const) {
  test(`${name} checkout and restart work without data entry`, async () => {
    localStorage.setItem("groeitafel-demo-cart", JSON.stringify(items));
    const r = shell(<CartPage />);
    assert.equal(r.container.querySelector(".total dd")!.textContent, total);
    assert.equal(
      r.container.querySelectorAll("input[type=email],input[type=text]").length,
      0,
    );
    fireEvent.click(r.getByRole("button", { name: "Probeer de bestelling" }));
    await r.findByText(
      "Dit was een demonstratie. Er is niets betaald of gereserveerd.",
    );
    assert.deepEqual(
      JSON.parse(localStorage.getItem("groeitafel-demo-cart")!),
      [],
    );
    fireEvent.click(r.getByRole("button", { name: "Opnieuw beginnen" }));
    assert.ok(r.getByText("Je tafel is nog leeg."));
  });
}
test("remove final physical product removes shipping and clear shows empty state", () => {
  localStorage.setItem(
    "groeitafel-demo-cart",
    JSON.stringify([
      { id: "q1-workshop-regulier", quantity: 1 },
      { id: "notitieboek", quantity: 1 },
    ]),
  );
  const r = shell(<CartPage />);
  fireEvent.click(r.getByLabelText("Ruimte voor grote ideeën verwijderen"));
  assert.equal(r.container.querySelector(".total dd")!.textContent, "€ 15,00");
  fireEvent.click(r.getByRole("button", { name: "Winkelmand leegmaken" }));
  assert.ok(r.getByText("Je tafel is nog leeg."));
});
test("sponsored ticket selection adds correct digital item", () => {
  const r = shell(<EventDetail event={evenings[0]} />);
  fireEvent.click(r.getByRole("radio", { name: /Gesponsorde plek/ }));
  fireEvent.click(r.getByRole("button", { name: "In de demo-winkelmand" }));
  assert.deepEqual(JSON.parse(localStorage.getItem("groeitafel-demo-cart")!), [
    { id: "q1-workshop-gesponsord", quantity: 1 },
  ]);
  assert.ok(r.getByRole("link", { name: "Bekijk je winkelmand" }));
});
test("product quantity selection adds physical item", () => {
  const r = shell(<ProductDetail product={accessories[0]} />);
  fireEvent.change(r.getByRole("spinbutton"), { target: { value: "3" } });
  fireEvent.click(r.getByRole("button", { name: "In de demo-winkelmand" }));
  assert.deepEqual(JSON.parse(localStorage.getItem("groeitafel-demo-cart")!), [
    { id: "notitieboek", quantity: 3 },
  ]);
});
test("shop categories switch and mobile menu opens", () => {
  const r = shell(<Shop />);
  assert.equal(r.container.querySelectorAll(".product-card").length, 3);
  fireEvent.click(r.getByRole("button", { name: /Tickets/ }));
  assert.equal(r.container.querySelectorAll(".event-card").length, 12);
  fireEvent.click(r.getByRole("button", { name: "Menu openen" }));
  assert.equal(
    r
      .getByRole("button", { name: "Menu sluiten" })
      .getAttribute("aria-expanded"),
    "true",
  );
  assert.equal(
    within(r.getByRole("navigation")).getAllByRole("link").length,
    5,
  );
});
