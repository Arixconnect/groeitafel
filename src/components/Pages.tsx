"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import {
  Check,
  RotateCcw,
  Shuffle,
  Clock3,
  MapPin,
  Lightbulb,
  Users,
  Package,
  Ticket,
  Trash2,
  Heart,
  Paintbrush,
  Network,
  Code2,
  Home as HomeIcon,
  CheckCircle2,
} from "lucide-react";
import { evenings, quarters, eveningTypes, type Evening } from "@/data/program";
import { products, accessories, money, type Product } from "@/data/products";
import { profiles, questions, bingoTasks } from "@/data/play";
import { calculateCart, demoCheckout } from "@/lib/cart";
import { useCart, Quantity, AddButton } from "./Shell";
import { EventCard } from "./Home";
import { EveningArt, ProductArt } from "./Artwork";
export function PageHead({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="page-head">
      <span className="eyebrow">{eyebrow}</span>
      <h1>{title}</h1>
      <div className="page-lead">{children}</div>
    </div>
  );
}
export function Program() {
  const [q, setQ] = useState("all"),
    [type, setType] = useState("all");
  const filtered = evenings.filter(
    (e) =>
      (q === "all" || e.quarter === Number(q)) &&
      (type === "all" || e.type === type),
  );
  return (
    <div className="section page">
      <PageHead
        eyebrow="HET VOORBEELDPROGRAMMA · 2027"
        title="Een avond. Een nieuw begin."
      >
        <p>
          Kom leren, bouwen of ontmoeten. Je gaat naar huis met een idee dat
          verder is dan toen je binnenkwam.
        </p>
      </PageHead>
      <div className="filter-bar">
        <fieldset>
          <legend>Kwartaal</legend>
          <div className="pills">
            {[
              ["all", "Alle kwartalen"],
              ...quarters.map((q) => [String(q.id), `Q${q.id}`]),
            ].map(([id, label]) => (
              <button key={id} aria-pressed={q === id} onClick={() => setQ(id)}>
                {label}
              </button>
            ))}
          </div>
        </fieldset>
        <label>
          Soort avond
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="all">Alle avonden</option>
            {eveningTypes.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </label>
      </div>
      {q !== "all" && (
        <div className="theme-heading">
          <span className="eyebrow">{quarters[Number(q) - 1].period}</span>
          <h2>{quarters[Number(q) - 1].title}</h2>
        </div>
      )}
      <p className="result-count" role="status">
        {filtered.length} voorbeeldavonden · Data en locaties nog te bepalen
      </p>
      <div className="grid-three program-grid">
        {filtered.map((e) => (
          <div key={e.id}>
            <EventCard event={e} />
            <dl className="program-details">
              <div>
                <dt>Niveau</dt>
                <dd>{e.level}</dd>
              </div>
              <div>
                <dt>Neem mee</dt>
                <dd>{e.needs}</dd>
              </div>
              <div>
                <dt>Je maakt</dt>
                <dd>{e.result}</dd>
              </div>
            </dl>
          </div>
        ))}
      </div>
    </div>
  );
}
export function EventDetail({ event }: { event: Evening }) {
  const [variant, setVariant] = useState("regulier"),
    [qty, setQty] = useState(1);
  return (
    <div className="section page">
      <Link className="back-link" href="/programma">
        Terug naar het programma
      </Link>
      <div className="detail-grid">
        <div>
          <span className="eyebrow">
            VOORBEELDAVOND · Q{event.quarter} · {event.type}
          </span>
          <h1>{event.title}</h1>
          <p className="lead">{event.description}</p>
          <div className="detail-meta">
            <span>
              <Clock3 />
              {event.duration}
            </span>
            <span>
              <MapPin />
              Datum en locatie nog te bepalen
            </span>
          </div>
          <EveningArt type={event.type} />
          <section className="detail-section">
            <h2>Voor wie is deze avond?</h2>
            <p>{event.audience}</p>
            <h2>Dit maken we samen</h2>
            <p>
              {event.result}. Dit is het beoogde oefenresultaat; we testen deze
              avondvorm nog.
            </p>
            <h2>Zo kan je avond eruitzien</h2>
            <ol className="schedule">
              {[
                [
                  "15 min",
                  "Aanschuiven & matchen",
                  "Deel je ik zoek / ik bied-kaartje.",
                ],
                [
                  "15 min",
                  "Waarde uitwisselen",
                  "Kies samen een kleine, haalbare opdracht.",
                ],
                [
                  event.duration === "2 uur" ? "50 min" : "80 min",
                  "Aan de bouwtafel",
                  "Werk samen aan een eerste versie.",
                ],
                [
                  "25 min",
                  "Laten zien & feedback",
                  "Test met een andere tafel en verbeter één ding.",
                ],
                [
                  "15 min",
                  "Een volgende stap",
                  "Spreek af wat je binnen zeven dagen doet.",
                ],
              ].map(([time, title, desc]) => (
                <li key={title}>
                  <span>{time}</span>
                  <div>
                    <h3>{title}</h3>
                    <p>{desc}</p>
                  </div>
                </li>
              ))}
            </ol>
            <h2>Wat neem je mee?</h2>
            <p>{event.needs}</p>
            <p>
              We werken met fictieve voorbeelden. Deel geen vertrouwelijke
              bedrijfs- of klantgegevens in AI-tools.
            </p>
          </section>
        </div>
        <aside className="ticket-box">
          <span className="eyebrow">SCHUIF AAN · DEMO</span>
          <h2>Een plek aan tafel.</h2>
          <p>
            Digitale voorbeeldtickets. Er is nog geen echte registratie of
            voorraad.
          </p>
          <fieldset>
            <legend>Kies je tickettype</legend>
            {[
              ["regulier", "Regulier", 1500],
              ["gesponsord", "Gesponsorde plek", 0],
            ].map(([id, label, price]) => (
              <label
                className={`ticket-option ${variant === id ? "selected" : ""}`}
                key={id}
              >
                <input
                  type="radio"
                  name="ticket"
                  value={id}
                  checked={variant === id}
                  onChange={() => setVariant(String(id))}
                />
                <span>{label}</span>
                <b>{money(Number(price))}</b>
              </label>
            ))}
          </fieldset>
          <p className="micro">
            {variant === "gesponsord"
              ? "Voorbeeld van mogelijke sponsoring. Er zijn nog geen gesponsorde plekken toegezegd."
              : "Voorlopige conceptprijs, inclusief eventuele btw. Definitieve prijs en fiscale behandeling volgen."}
          </p>
          <label className="quantity-label">
            Aantal (maximaal 20 in de demo)
            <Quantity value={qty} onChange={setQty} />
          </label>
          <AddButton id={`${event.id}-${variant}`} quantity={qty} />
          <p className="micro">
            <Ticket size={15} /> Digitaal · Geen verzendkosten
          </p>
          <div className="notice">
            Je probeert alleen de bestelstappen. Niets wordt betaald of
            gereserveerd.
          </div>
        </aside>
      </div>
    </div>
  );
}
export function MatchPage() {
  const [skill, setSkill] = useState("all"),
    [need, setNeed] = useState("all"),
    [selected, setSelected] = useState<string | null>(null);
  const filtered = profiles.filter(
    (p) =>
      (skill === "all" || p.skill === skill) &&
      (need === "all" || p.need === need),
  );
  const person = profiles.find((p) => p.id === selected);
  const partner = person
    ? profiles[
        profiles.indexOf(person) % 2 === 0
          ? profiles.indexOf(person) + 1
          : profiles.indexOf(person) - 1
      ]
    : undefined;
  return (
    <div className="section page">
      <PageHead
        eyebrow="DE MATCHTAFEL"
        title="Jij zoekt iets. Jij brengt iets."
      >
        <p>
          Een goede match begint met twee kanten. Ontdek hoe ervaring en
          creativiteit elkaar kunnen helpen.
        </p>
      </PageHead>
      <div className="notice">
        <Users size={20} />
        <span>
          Dit zijn expliciet fictieve voorbeeldprofielen. Er worden geen
          contactgegevens verzameld of gedeeld.
        </span>
      </div>
      <div className="filter-bar">
        <label>
          Vaardigheid
          <select value={skill} onChange={(e) => setSkill(e.target.value)}>
            <option value="all">Alle vaardigheden</option>
            {profiles.map((p) => (
              <option key={p.skill}>{p.skill}</option>
            ))}
          </select>
        </label>
        <label>
          Hulpvraag
          <select value={need} onChange={(e) => setNeed(e.target.value)}>
            <option value="all">Alle hulpvragen</option>
            {profiles.map((p) => (
              <option key={p.need}>{p.need}</option>
            ))}
          </select>
        </label>
        <button
          className="text-link"
          onClick={() => {
            setSkill("all");
            setNeed("all");
            setSelected(null);
          }}
        >
          Opnieuw beginnen
        </button>
      </div>
      <p role="status" className="micro">
        {filtered.length} fictieve profielen gevonden
      </p>
      <div className="grid-two profile-grid">
        {filtered.map((p) => (
          <article className="profile-card" key={p.id}>
            <div className="profile-heading">
              <div className={`avatar ${p.color}`}>
                {p.initial}
                <span>✳</span>
              </div>
              <div>
                <span className="eyebrow">FICTIEF VOORBEELD</span>
                <h2>{p.name}</h2>
                <p>{p.role}</p>
              </div>
            </div>
            <div className="profile-offers">
              <div>
                <span className="eyebrow">IK ZOEK</span>
                <p>{p.seek}</p>
              </div>
              <div>
                <span className="eyebrow">IK BIED</span>
                <p>{p.offer}</p>
              </div>
            </div>
            <button
              className="button outline"
              onClick={() => setSelected(p.id)}
              aria-pressed={selected === p.id}
            >
              Bekijk {p.name}s voorbeeldmatch
            </button>
          </article>
        ))}
      </div>
      {!filtered.length && (
        <div className="empty-state">
          <h2>Deze combinatie is er nog niet.</h2>
          <p>Probeer één filter of bekijk alle fictieve profielen.</p>
          <button
            className="button"
            onClick={() => {
              setSkill("all");
              setNeed("all");
            }}
          >
            Toon alle profielen
          </button>
        </div>
      )}
      <div aria-live="polite">
        {person && partner && (
          <section className="match-result">
            <span className="eyebrow">DIT ZOU KUNNEN WERKEN</span>
            <h2>
              {person.name} + {partner.name}
              <Heart size={30} />
            </h2>
            <p>
              <b>{person.name}</b> zoekt {person.seek.toLowerCase()}.{" "}
              <b>{partner.name}</b> biedt {partner.offer.toLowerCase()}.
              Andersom brengt {person.name} {person.offer.toLowerCase()} mee,
              passend bij de vraag van {partner.name}.
            </p>
            <p>
              <b>Samen aan de bouwtafel:</b>{" "}
              {["noor", "sam"].includes(person.id)
                ? "maak een visueel concept voor Sams profielpagina en oefen daarna Noors eerste klantgesprek."
                : "bouw een eerste projectpagina voor Joost en oefen Mila’s pitch voor een lokaal netwerk."}
            </p>
            <span className="micro">
              Een uitgewerkt voorbeeld, geen echte match of contactverzoek.
            </span>
          </section>
        )}
      </div>
    </div>
  );
}
export function PlayPage() {
  const [card, setCard] = useState(-1),
    [checked, setChecked] = useState<number[]>([]),
    [ready, setReady] = useState(false);
  useEffect(() => {
    try {
      const saved = JSON.parse(
        localStorage.getItem("groeitafel-demo-bingo") || "[]",
      );
      if (Array.isArray(saved))
        setChecked([
          ...new Set(
            saved.filter(
              (n: unknown) =>
                typeof n === "number" && Number.isInteger(n) && n >= 0 && n < 9,
            ),
          ),
        ] as number[]);
    } catch {}
    setReady(true);
  }, []);
  useEffect(() => {
    if (ready)
      try {
        localStorage.setItem("groeitafel-demo-bingo", JSON.stringify(checked));
      } catch {}
  }, [ready, checked]);
  return (
    <div className="section page">
      <PageHead
        eyebrow="SPEEL & ONTDEK"
        title="Het begint met een goede vraag."
      >
        <p>
          Geen voorbereiding nodig. Trek een kaart of ga op zoek naar een match.
          Alleen, of met iemand aan de andere kant van de tafel.
        </p>
      </PageHead>
      <div className="games-grid">
        <section className="question-game">
          <span className="eyebrow">VRAAGKAARTEN</span>
          <h2>Leg eens op tafel.</h2>
          <p>
            Trek een kaart, lees de vraag hardop en geef elkaar een minuut om te
            antwoorden.
          </p>
          <div className="question-card" aria-live="polite">
            <span className="question-star">✳</span>
            <span className="eyebrow">
              {card < 0
                ? "EEN KLEINE VRAAG. EEN GROOT GESPREK."
                : questions[card][0]}
            </span>
            <h3>
              {card < 0 ? "Wat komt er op jouw tafel?" : questions[card][1]}
            </h3>
            <small>
              {card < 0
                ? "Jouw eerste kaart wacht op je."
                : `Kaart ${card + 1} van ${questions.length}`}
            </small>
          </div>
          <div className="game-actions">
            <button
              className="button"
              onClick={() => setCard((card + 1) % questions.length)}
            >
              <Shuffle size={18} />
              {card < 0
                ? "Trek een vraag"
                : card === questions.length - 1
                  ? "Terug naar de eerste kaart"
                  : "Volgende kaart"}
            </button>
            <button
              className="icon-button"
              aria-label="Vraagkaarten opnieuw beginnen"
              onClick={() => setCard(-1)}
            >
              <RotateCcw size={20} />
            </button>
          </div>
        </section>
        <section className="bingo-game">
          <span className="eyebrow">MATCHBINGO</span>
          <h2>Kleine acties. Nieuwe connecties.</h2>
          <p>
            Doe een opdracht en vink het vakje aan. Negen vakjes vol? Dan heb je
            een tafel vol verhalen.
          </p>
          <div className="bingo-progress">
            <span aria-live="polite">
              {checked.length} van 9 opdrachten gedaan
            </span>
            <b>{Math.round((checked.length / 9) * 100)}%</b>
          </div>
          <progress
            max="9"
            value={checked.length}
            aria-label="Voortgang matchbingo"
          />
          <div className="bingo-grid">
            {bingoTasks.map((task, i) => (
              <button
                key={task}
                aria-pressed={checked.includes(i)}
                onClick={() =>
                  setChecked((prev) =>
                    prev.includes(i)
                      ? prev.filter((n) => n !== i)
                      : [...prev, i],
                  )
                }
              >
                <span>
                  {checked.includes(i) ? (
                    <Check size={20} />
                  ) : (
                    <span className="bingo-circle" />
                  )}
                </span>
                {task}
              </button>
            ))}
          </div>
          <div className="bingo-footer">
            <span role="status">
              {checked.length === 9
                ? "Bingo! Kijk eens wat er aan tafel is ontstaan."
                : "Je voortgang blijft alleen op dit apparaat bewaard."}
            </span>
            <button className="text-link" onClick={() => setChecked([])}>
              <RotateCcw size={16} />
              Reset bingo
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
export function Shop() {
  const [category, setCategory] = useState("accessories");
  return (
    <div className="section page">
      <PageHead
        eyebrow="DE GROEITAFEL SHOP · CONCEPT"
        title="Neem iets mee. Laat iets groeien."
      >
        <p>
          Een avond om aan te schuiven. Een boekje voor dat ene idee. Ontdek
          onze tickets en accessoireconcepten.
        </p>
      </PageHead>
      <div className="pills shop-tabs" aria-label="Productcategorie">
        <button
          aria-pressed={category === "accessories"}
          onClick={() => setCategory("accessories")}
        >
          Accessoires <Package size={16} />
        </button>
        <button
          aria-pressed={category === "tickets"}
          onClick={() => setCategory("tickets")}
        >
          Tickets <Ticket size={16} />
        </button>
      </div>
      <div className="notice">
        Alle producten, illustraties en prijzen zijn concepten. Er wordt niets
        verkocht, geleverd of gereserveerd.
      </div>
      {category === "accessories" ? (
        <div className="grid-three product-grid">
          {accessories.map((p) => (
            <article className="product-card" key={p.id}>
              <Link href={`/shop/${p.id}`} tabIndex={-1} aria-hidden="true">
                <ProductArt type={p.art} />
              </Link>
              <div className="product-info">
                <span className="eyebrow">FYSIEK · CONCEPT</span>
                <h2>
                  <Link href={`/shop/${p.id}`}>{p.name}</Link>
                </h2>
                <p>{p.description}</p>
                <div className="product-bottom">
                  <b>
                    {money(p.price)} <small>voorlopig</small>
                  </b>
                  <Link className="text-link" href={`/shop/${p.id}`}>
                    Bekijk product
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <>
          <p className="lead">
            Digitale concepttickets · regulier {money(1500)} · gesponsorde
            voorbeeldplek {money(0)}. Geen verzendkosten.
          </p>
          <div className="grid-three">
            {evenings.map((e) => (
              <EventCard key={e.id} event={e} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
export function ProductDetail({ product }: { product: Product }) {
  const [n, setN] = useState(1);
  return (
    <div className="section page">
      <Link className="back-link" href="/shop">
        Terug naar de shop
      </Link>
      <div className="detail-grid product-detail">
        <ProductArt type={product.art} />
        <div>
          <span className="eyebrow">ACCESSOIRECONCEPT · FYSIEK PRODUCT</span>
          <h1>{product.name}</h1>
          <p className="lead">{product.description}</p>
          <p className="product-price">
            {money(product.price)} <small>voorlopige prijs</small>
          </p>
          <p>
            Conceptprijs inclusief eventuele btw. De definitieve uitvoering,
            prijs en fiscale behandeling staan nog niet vast.
          </p>
          <label className="quantity-label">
            Aantal (1–20)
            <Quantity value={n} onChange={setN} />
          </label>
          <AddButton id={product.id} quantity={n} />
          <div className="notice">
            <Package size={22} />
            <span>
              Fysiek product · Demo-verzending {money(495)} per bestelling met
              accessoires. Alle kosten zie je vóór de bevestiging.
            </span>
          </div>
          <p className="micro">
            De afbeelding is een conceptillustratie. Dit product is nog niet in
            productie en wordt in deze demo niet geleverd.
          </p>
        </div>
      </div>
    </div>
  );
}
export function CartPage() {
  const { lines, setQuantity, remove, clear } = useCart();
  const [done, setDone] = useState(false),
    [busy, setBusy] = useState(false),
    [error, setError] = useState("");
  const totals = calculateCart(lines);
  async function checkout() {
    setBusy(true);
    try {
      await demoCheckout(lines);
      clear();
      setDone(true);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  }
  return (
    <div className="section page">
      <PageHead
        eyebrow="JOUW DEMO-WINKELMAND"
        title={done ? "Bedankt voor het proberen." : "Wat neem jij mee?"}
      >
        <p>
          {done
            ? "Dit was een demonstratie. Er is niets betaald of gereserveerd."
            : "Alle producten en prijzen zijn voorlopig. Bekijk alle kosten en probeer de bestelstappen zonder persoonsgegevens of betaalgegevens."}
        </p>
      </PageHead>
      {done ? (
        <div className="success-state" role="status">
          <CheckCircle2 size={54} />
          <h2>Alleen een voorproefje.</h2>
          <p>
            Er is geen bestelling, ticket of bevestigingsmail aangemaakt. Je
            demo-winkelmand is leeggemaakt.
          </p>
          <button
            className="button"
            onClick={() => {
              setDone(false);
              setError("");
            }}
          >
            Opnieuw beginnen
          </button>
          <Link href="/programma" className="text-link">
            Ontdek het programma
          </Link>
        </div>
      ) : totals.items.length ? (
        <div className="cart-layout">
          <div>
            <div className="cart-items">
              {totals.items.map((item) => (
                <article className="cart-item" key={item.id}>
                  <div
                    className={`cart-icon ${item.product.kind === "ticket" ? "lime" : "peach"}`}
                  >
                    {item.product.kind === "ticket" ? <Ticket /> : <Package />}
                  </div>
                  <div className="cart-item-info">
                    <span className="eyebrow">
                      {item.product.kind === "ticket"
                        ? "DIGITAAL TICKET"
                        : "FYSIEK ACCESSOIRE"}{" "}
                      · CONCEPT
                    </span>
                    <h2>{item.product.name}</h2>
                    {item.product.variant && <p>{item.product.variant}</p>}
                    <p>{money(item.product.price)} per stuk</p>
                    <Quantity
                      value={item.quantity}
                      label={`Aantal ${item.product.name}`}
                      onChange={(n) => setQuantity(item.id, n)}
                    />
                  </div>
                  <div className="cart-line-end">
                    <b>{money(item.product.price * item.quantity)}</b>
                    <button
                      className="icon-button"
                      aria-label={`${item.product.name} verwijderen`}
                      onClick={() => remove(item.id)}
                    >
                      <Trash2 size={19} />
                    </button>
                  </div>
                </article>
              ))}
            </div>
            <button className="text-link" onClick={clear}>
              Winkelmand leegmaken
            </button>
            <div className="notice">
              Tickets zijn digitaal. Accessoires zijn fysiek. In deze demo staan
              ze samen; bij een echte bestelling kunnen twee afrekenroutes nodig
              zijn.
            </div>
          </div>
          <aside className="order-summary">
            <h2>Alles op een rij.</h2>
            <dl>
              <div>
                <dt>Producten</dt>
                <dd>{money(totals.subtotal)}</dd>
              </div>
              <div>
                <dt>Verzending {totals.shipping > 0 ? "(concept)" : ""}</dt>
                <dd>{money(totals.shipping)}</dd>
              </div>
              <div>
                <dt>Service- / betaalkosten (demo)</dt>
                <dd>{money(totals.fees)}</dd>
              </div>
              <div className="total">
                <dt>Totaal</dt>
                <dd>{money(totals.total)}</dd>
              </div>
            </dl>
            <p className="micro">
              Alle conceptprijzen inclusief eventuele btw; fiscale behandeling
              nog te bepalen. Geen extra kosten in deze demo.
            </p>
            <button className="button" disabled={busy} onClick={checkout}>
              {busy ? "Even proberen…" : "Probeer de bestelling"}
            </button>
            {error && <p role="alert">{error}</p>}
            <p className="micro">
              Zonder betaling, reservering of levering. Je hoeft niets in te
              vullen.
            </p>
          </aside>
        </div>
      ) : (
        <div className="empty-state">
          <Package size={46} />
          <h2>Je tafel is nog leeg.</h2>
          <p>Kies een voorbeeldticket of ontdek de accessoires.</p>
          <Link href="/shop" className="button">
            Ontdek de shop
          </Link>
          <Link href="/programma" className="button outline">
            Bekijk de avonden
          </Link>
        </div>
      )}
    </div>
  );
}
const roles = [
  {
    title: "Programma maken",
    icon: Lightbulb,
    text: "Denk mee over thema’s en maak een workshop die aansluit bij echte lokale vragen.",
  },
  {
    title: "Begeleiden",
    icon: Users,
    text: "Help deelnemers om klein te beginnen, samen te werken en een volgende stap te kiezen.",
  },
  {
    title: "Netwerk",
    icon: Network,
    text: "Breng ondernemers en makers samen die elkaar anders niet snel ontmoeten.",
  },
  {
    title: "Locatie",
    icon: HomeIcon,
    text: "Verken een toegankelijke plek met tafels, stroom en ruimte voor ontmoetingen.",
  },
  {
    title: "Ontwerp",
    icon: Paintbrush,
    text: "Geef de avonden, kaartjes en communicatie een uitnodigende visuele vorm.",
  },
  {
    title: "Techniek",
    icon: Code2,
    text: "Denk mee over eenvoudige prototypes, digitale hulpmiddelen en een werkbare website.",
  },
];
export function Partners() {
  const [role, setRole] = useState("Ontwerp");
  return (
    <div className="section page">
      <PageHead eyebrow="SAMEN BOUWEN" title="De beste tafel maken we samen.">
        <p>
          De Groeitafel is een idee in ontwikkeling. We zoeken mensen die hun
          kennis, tijd, netwerk of ruimte willen inbrengen.
        </p>
      </PageHead>
      <div className="partner-intro">
        <div className="partner-quote">
          <span>✳</span>
          <h2>
            Geen logo aan de zijlijn.
            <br />
            Een stoel aan tafel.
          </h2>
        </div>
        <div>
          <h2>Wat kan je bijdrage betekenen?</h2>
          <p>
            Je helpt een concrete avond mogelijk maken en kunt direct feedback
            krijgen op de vorm die we samen testen. Je ontmoet andere
            perspectieven en maakt zichtbaar welke expertise jij meebrengt.
          </p>
          <p>
            We bespreken vooraf je rol, tijdsinvestering en verwachtingen. Er
            zijn geen opbrengsten, leads of bereik gegarandeerd.
          </p>
        </div>
      </div>
      <section className="roles">
        <span className="eyebrow">WAAR ZOU JIJ BIJ WILLEN HELPEN?</span>
        <h2>Zes manieren om aan te schuiven.</h2>
        <p>
          Kies een rol en bekijk een eerste gespreksvraag. Dit verstuurt geen
          aanmelding.
        </p>
        <div className="grid-three">
          {roles.map((r) => (
            <button
              className="role-card"
              key={r.title}
              aria-pressed={role === r.title}
              onClick={() => setRole(r.title)}
            >
              <r.icon size={28} />
              <h3>{r.title}</h3>
              <p>{r.text}</p>
              <span>
                {role === r.title ? (
                  <Check />
                ) : (
                  <span className="bingo-circle" />
                )}
              </span>
            </button>
          ))}
        </div>
        <div className="role-result" aria-live="polite">
          <span className="eyebrow">EEN BEGIN VOOR HET GESPREK · {role}</span>
          <h3>Welke kleine bijdrage kunnen we samen uitproberen?</h3>
          <p>
            Bespreek met Arix wat je binnen deze rol wilt doen, hoeveel tijd je
            beschikbaar hebt en wat je nodig hebt om te beginnen. Gebruik dit
            concept als gespreksstarter; er is nog geen aanmeldkanaal gekoppeld.
          </p>
        </div>
      </section>
      <section className="people-note grid-two">
        <div>
          <span className="eyebrow">DE INITIATIEFNEMER</span>
          <h2>Arix Camelia</h2>
          <p>
            Arix’ basis is marketing, content en online zichtbaarheid. Vanuit
            die ervaring ontwikkelt hij de Groeitafel. AI-workshops zijn een
            nieuw aanbod dat wordt getest.
          </p>
        </div>
        <div>
          <span className="eyebrow">EEN OPEN UITNODIGING</span>
          <h2>Rig, ontwerp je mee?</h2>
          <p>
            Dit concept is ook een uitnodiging aan Rig om de avonden en de
            visuele vorm mee te ontwerpen. Zijn rol is nog niet afgesproken; hij
            is geen bevestigde partner.
          </p>
          <p>
            Hiskia wordt mogelijk gevraagd om aan te sluiten. Ook die
            betrokkenheid staat nog open.
          </p>
        </div>
      </section>
    </div>
  );
}
