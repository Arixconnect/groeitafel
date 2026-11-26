"use client";
import Link from "next/link";
import { useState } from "react";
import {
  Clock3,
  MapPin,
  Handshake,
  Sprout,
  Check,
  MousePointer2,
} from "lucide-react";
import { evenings, quarters, method, type Evening } from "@/data/program";
import { EveningArt } from "./Artwork";
export function EventCard({ event }: { event: Evening }) {
  return (
    <article className="event-card">
      <Link href={`/programma/${event.id}`} tabIndex={-1} aria-hidden="true">
        <EveningArt type={event.type} />
      </Link>
      <div className="event-body">
        <div className="event-top">
          <span className="eyebrow">{event.type}</span>
          <span className="quarter-tag">Q{event.quarter}</span>
        </div>
        <h3>
          <Link href={`/programma/${event.id}`}>{event.title}</Link>
        </h3>
        <p>{event.description}</p>
        <div className="event-meta">
          <span>
            <Clock3 size={15} />
            {event.duration}
          </span>
          <span>
            <MapPin size={15} />
            Locatie volgt
          </span>
        </div>
        <p className="micro">Voorbeeldavond · Datum nog te bepalen</p>
        <Link href={`/programma/${event.id}`} className="text-link">
          Ontdek deze avond
        </Link>
      </div>
    </article>
  );
}
export function Method() {
  const [step, setStep] = useState(0);
  return (
    <section className="method-section section" id="zo-werkt-het">
      <div className="section-heading">
        <div>
          <span className="eyebrow">GEEN LANGE PRAAT. WEL IETS MAKEN.</span>
          <h2>
            Van ‘hoi’ naar
            <br />
            ‘dit hebben we gemaakt’.
          </h2>
        </div>
        <p>
          Je hoeft niet alles te kunnen.
          <br />
          Je hoeft alleen iets mee te brengen.
        </p>
      </div>
      <div className="method-tabs" role="tablist" aria-label="De vijf stappen">
        {method.map((m, i) => (
          <button
            key={m.title}
            role="tab"
            id={`step-${i}`}
            aria-controls="step-panel"
            aria-selected={step === i}
            tabIndex={step === i ? 0 : -1}
            onKeyDown={(e) => {
              if (["ArrowRight", "ArrowLeft", "Home", "End"].includes(e.key)) {
                e.preventDefault();
                const n =
                  e.key === "Home"
                    ? 0
                    : e.key === "End"
                      ? 4
                      : (step + (e.key === "ArrowRight" ? 1 : 4)) % 5;
                setStep(n);
                document.getElementById(`step-${n}`)?.focus();
              }
            }}
            onClick={() => setStep(i)}
          >
            <span>{i + 1}</span> {m.title}
          </button>
        ))}
      </div>
      <div
        className="method-panel"
        role="tabpanel"
        id="step-panel"
        aria-labelledby={`step-${step}`}
      >
        <div className="match-drawing" aria-hidden="true">
          <div className="note note-one">
            <small>IK ZOEK</small>
            <b>{step === 2 ? "Een goed idee" : "Een frisse blik"}</b>
            <span>♡</span>
          </div>
          <div className="note note-two">
            <small>IK BIED</small>
            <b>{step === 2 ? "Twee paar handen" : "Mijn creativiteit"}</b>
            <span>✳</span>
          </div>
          <span className="match-plus">+</span>
        </div>
        <div className="method-copy">
          <span className="eyebrow">{method[step].tag}</span>
          <h3>{method[step].title}</h3>
          <p>{method[step].text}</p>
          <blockquote>{method[step].example}</blockquote>
          <Link href="/aan-tafel" className="text-link">
            Probeer een voorbeeldmatch
          </Link>
        </div>
      </div>
    </section>
  );
}
export default function Home() {
  const [q, setQ] = useState(1);
  return (
    <>
      <section className="hero section">
        <div className="hero-copy">
          <div className="eyebrow hero-eyebrow">
            <span className="mini-line" /> ONDERNEMERS × JONGE MAKERS
          </div>
          <h1>
            Schuif aan.
            <br />
            Breng iets mee.
            <br />
            <span>Bouw samen.</span>
            <svg className="underline" viewBox="0 0 400 16" aria-hidden="true">
              <path d="M3 10Q200-4 395 7M29 14Q190 3 361 13" />
            </svg>
          </h1>
          <p>
            De ontmoetingsplek waar lokale ondernemers en jonge makers kennis,
            creativiteit en digitale skills uitwisselen — en samen iets maken.
          </p>
          <div className="hero-buttons">
            <Link href="/programma" className="button">
              Ontdek de avonden
            </Link>
            <a href="#zo-werkt-het" className="button outline">
              Zo werkt de Groeitafel
            </a>
          </div>
          <div className="hero-foot">
            <span className="tiny-star">✳</span>Eén avond per maand. Ieder iets
            te brengen.
          </div>
        </div>
        <div className="hero-visual">
          <span className="visual-label">EEN TAFEL VOL MOGELIJKHEDEN</span>
          <img
            src="/images/tafel.svg"
            alt="Illustratie van vier mensen die samen aan een ronde tafel werken, met ik zoek- en ik bied-kaartjes"
            width="700"
            height="660"
          />
          <div className="hero-sticker">
            <span>
              Niet alleen
              <br />
              ontmoeten.
            </span>
            <b>Samen doen.</b>
          </div>
          <span className="illustration-caption">
            Een impressie van het idee. Jouw stoel staat klaar.
          </span>
        </div>
      </section>
      <div className="values-strip">
        <span>
          <Handshake />
          Gelijkwaardig uitwisselen
        </span>
        <span className="strip-star">✳</span>
        <span>
          <MousePointer2 />
          Meteen iets maken
        </span>
        <span className="strip-star">✳</span>
        <span>
          <Sprout />
          Samen verder groeien
        </span>
      </div>
      <section className="section evenings-section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">DRIE AVONDEN. ÉÉN GROEITAFEL.</span>
            <h2>Wat breng jij aan tafel?</h2>
          </div>
          <Link href="/programma" className="text-link">
            Bekijk het hele programma
          </Link>
        </div>
        <div className="grid-three">
          {evenings.slice(0, 3).map((e) => (
            <EventCard key={e.id} event={e} />
          ))}
        </div>
      </section>
      <Method />
      <section className="quarter-section section">
        <div className="quarter-intro">
          <span className="eyebrow">EEN JAAR VOL MOGELIJKHEDEN</span>
          <h2>
            Klein beginnen.
            <br />
            Elk kwartaal verder.
          </h2>
          <p>
            Elke maand een andere avond. Elk kwartaal een thema dat je samen
            verder helpt.
          </p>
          <div className="quarter-buttons" aria-label="Kies een kwartaal">
            {quarters.map((item) => (
              <button
                key={item.id}
                onClick={() => setQ(item.id)}
                aria-pressed={q === item.id}
              >
                Q{item.id}
              </button>
            ))}
          </div>
          <p className="micro">
            Voorbeeldprogramma 2027 · Data en locaties volgen.
          </p>
        </div>
        <div className="quarter-feature">
          <span className="eyebrow">
            Q{q} · {quarters[q - 1].period}
          </span>
          <h3>
            {quarters[q - 1].title}
            <span>✳</span>
          </h3>
          <p>{quarters[q - 1].description}</p>
          <div className="quarter-list">
            {evenings
              .filter((e) => e.quarter === q)
              .map((e) => (
                <Link key={e.id} href={`/programma/${e.id}`}>
                  <span>{e.type}</span>
                  <b>{e.title}</b>
                </Link>
              ))}
          </div>
        </div>
      </section>
      <section className="section exchange">
        <div className="section-heading">
          <div>
            <span className="eyebrow">
              JIJ HEBT MEER TE BRENGEN DAN JE DENKT
            </span>
            <h2>
              Twee perspectieven.
              <br />
              Eén goed begin.
            </h2>
          </div>
        </div>
        <div className="grid-two">
          <article>
            <span className="eyebrow">VOOR LOKALE ONDERNEMERS</span>
            <h3>
              Ervaring ontmoet
              <br />
              een frisse blik.
            </h3>
            <p>
              Deel wat jij hebt geleerd over klanten, keuzes en ondernemen.
              Ontdek met een maker hoe je jouw verhaal ook digitaal kunt laten
              spreken.
            </p>
            <ul className="check-list">
              <li>
                <Check />
                Een frisse blik op je vraag
              </li>
              <li>
                <Check />
                Iets bruikbaars om mee verder te gaan
              </li>
              <li>
                <Check />
                Een ontmoeting buiten je eigen netwerk
              </li>
            </ul>
          </article>
          <article>
            <span className="eyebrow">VOOR JONGE MAKERS</span>
            <h3>
              Jouw skills verdienen
              <br />
              een echte vraag.
            </h3>
            <p>
              Breng je creatieve en digitale vaardigheden mee. Werk aan een
              concrete vraag en leer van iemand die het ondernemen van dichtbij
              kent.
            </p>
            <ul className="check-list">
              <li>
                <Check />
                Ruimte om te proberen en te leren
              </li>
              <li>
                <Check />
                Praktische feedback op je werk
              </li>
              <li>
                <Check />
                Zakelijke kennis vanuit de praktijk
              </li>
            </ul>
          </article>
        </div>
      </section>
      <section className="partner-banner section">
        <span className="giant-star" aria-hidden="true">
          ✳
        </span>
        <div>
          <span className="eyebrow">DE TAFEL IS NOG NIET AF</span>
          <h2>
            Er is ook plek
            <br />
            voor jouw bijdrage.
          </h2>
          <p>
            Een ruimte, een goed netwerk of een talent voor begeleiden?
            <br />
            Denk mee over wat de Groeitafel kan worden.
          </p>
          <Link href="/samen-bouwen" className="button">
            Samen bouwen
          </Link>
        </div>
        <span className="handwritten">Schuif je aan?</span>
      </section>
    </>
  );
}
