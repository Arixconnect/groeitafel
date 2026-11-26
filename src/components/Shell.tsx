"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { ShoppingBag, Menu, X, Plus, Minus, Check } from "lucide-react";
import { type CartLine, sanitizeCart, validQuantity } from "@/lib/cart";
const CartContext = createContext<{
  lines: CartLine[];
  add: (id: string, n: number) => void;
  setQuantity: (id: string, n: number) => void;
  remove: (id: string) => void;
  clear: () => void;
}>({
  lines: [],
  add: () => {},
  setQuantity: () => {},
  remove: () => {},
  clear: () => {},
});
export const useCart = () => useContext(CartContext);
const links = [
  ["/programma", "Programma"],
  ["/aan-tafel", "Aan tafel"],
  ["/speel", "Speel & ontdek"],
  ["/shop", "Shop"],
  ["/samen-bouwen", "Samen bouwen"],
];
export function Shell({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]),
    [ready, setReady] = useState(false),
    [menu, setMenu] = useState(false);
  const path = usePathname();
  useEffect(() => {
    try {
      setLines(
        sanitizeCart(
          JSON.parse(localStorage.getItem("groeitafel-demo-cart") || "[]"),
        ),
      );
    } catch {}
    setReady(true);
  }, []);
  useEffect(() => {
    if (ready)
      try {
        localStorage.setItem("groeitafel-demo-cart", JSON.stringify(lines));
      } catch {}
  }, [lines, ready]);
  useEffect(() => {
    setMenu(false);
  }, [path]);
  const add = (id: string, n: number) => {
    if (!validQuantity(n)) return;
    setLines((prev) => sanitizeCart([...prev, { id, quantity: n }]));
  };
  return (
    <CartContext.Provider
      value={{
        lines,
        add,
        setQuantity: (id, n) => {
          if (validQuantity(n))
            setLines((prev) =>
              prev.map((i) => (i.id === id ? { ...i, quantity: n } : i)),
            );
        },
        remove: (id) => setLines((prev) => prev.filter((i) => i.id !== id)),
        clear: () => setLines([]),
      }}
    >
      <a className="skip-link" href="#main">
        Naar de inhoud
      </a>
      <div className="concept-bar">
        Concept voor 2027 — programma en prijzen voorlopig.
      </div>
      <header className="site-header">
        <Link href="/" className="logo" aria-label="De Groeitafel home">
          <span className="logo-mark">✳</span>
          <span>
            de groeitafel<span className="logo-dot">.</span>
          </span>
        </Link>
        <nav aria-label="Hoofdnavigatie" className={menu ? "nav open" : "nav"}>
          {links.map(([href, label]) => (
            <Link
              key={href}
              href={href}
              aria-current={path.startsWith(href) ? "page" : undefined}
            >
              {label}
            </Link>
          ))}
        </nav>
        <div className="header-actions">
          <Link
            href="/winkelmand"
            className="bag-link"
            aria-label={`Winkelmand, ${lines.reduce((s, i) => s + i.quantity, 0)} producten`}
          >
            <ShoppingBag size={21} />
            <span>{lines.reduce((s, i) => s + i.quantity, 0)}</span>
          </Link>
          <Link href="/programma" className="button small header-cta">
            Schuif aan
          </Link>
          <button
            className="menu-button icon-button"
            aria-label={menu ? "Menu sluiten" : "Menu openen"}
            aria-expanded={menu}
            onClick={() => setMenu(!menu)}
          >
            {menu ? <X /> : <Menu />}
          </button>
        </div>
      </header>
      <main id="main">{children}</main>
      <footer>
        <div className="footer-top">
          <div>
            <Link href="/" className="logo">
              <span className="logo-mark">✳</span>de groeitafel.
            </Link>
            <p>
              Grote ideeën beginnen
              <br />
              met een kleine ontmoeting.
            </p>
          </div>
          <div>
            <b>Er is plek voor jouw idee.</b>
            <p>Een concept van Arix Camelia.</p>
            <Link href="/samen-bouwen" className="text-link">
              Bouw mee aan de Groeitafel
            </Link>
          </div>
          <div>
            <b>Ontdek de tafel</b>
            <Link href="/programma">De avonden</Link>
            <Link href="/aan-tafel">Ik zoek / ik bied</Link>
            <Link href="/speel">Begin een gesprek</Link>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© De Groeitafel · Concept 2027</span>
          <span>
            Voorgestelde huisstijl · Alle voorbeelden zijn illustratief
          </span>
        </div>
      </footer>
    </CartContext.Provider>
  );
}
export function Quantity({
  value,
  onChange,
  label = "Aantal",
}: {
  value: number;
  onChange: (n: number) => void;
  label?: string;
}) {
  return (
    <div className="quantity">
      <button
        aria-label={`${label} verlagen`}
        disabled={value <= 1}
        onClick={() => onChange(value - 1)}
      >
        <Minus size={15} />
      </button>
      <input
        type="number"
        min="1"
        max="20"
        step="1"
        value={value}
        aria-label={label}
        onChange={(e) => {
          const n = Number(e.target.value);
          if (validQuantity(n)) onChange(n);
        }}
      />
      <button
        aria-label={`${label} verhogen`}
        disabled={value >= 20}
        onClick={() => onChange(value + 1)}
      >
        <Plus size={15} />
      </button>
    </div>
  );
}
export function AddButton({
  id,
  quantity = 1,
}: {
  id: string;
  quantity?: number;
}) {
  const { add } = useCart();
  const [added, setAdded] = useState(false);
  useEffect(() => {
    setAdded(false);
  }, [id, quantity]);
  return (
    <>
      <button
        className="button"
        onClick={() => {
          add(id, quantity);
          setAdded(true);
        }}
      >
        {added ? (
          <>
            <Check size={18} />
            Toegevoegd
          </>
        ) : (
          "In de demo-winkelmand"
        )}
      </button>
      <span role="status" className="add-status">
        {added && <Link href="/winkelmand">Bekijk je winkelmand</Link>}
      </span>
    </>
  );
}
