import Link from "next/link";
export default function NotFound() {
  return (
    <div className="section empty-state">
      <h1>Deze stoel staat ergens anders.</h1>
      <p>We kunnen deze pagina niet vinden.</p>
      <Link href="/" className="button">
        Terug naar de tafel
      </Link>
    </div>
  );
}
