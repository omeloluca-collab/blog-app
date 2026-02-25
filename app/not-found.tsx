import Link from "next/link";

export default function NotFound() {
  return (
    <section className="stack">
      <div className="card">
        <h1 className="h1">404</h1>
        <p className="meta">Artigo não encontrado.</p>
        <Link className="btn" href="/">Voltar para a home</Link>
      </div>
    </section>
  );
}