import Link from "next/link";
import { getArtigos, formatDateBR } from "../lib/artigos";

export const dynamic = "force-static";

export default async function HomePage() {
  const artigos = await getArtigos();

  return (
    <section className="stack">
      <span className="badge">Artigos</span>
      <h1 className="h1">Últimos posts</h1>

      {artigos.length === 0 ? (
        <div className="card">
          <p>Nenhum artigo cadastrado.</p>
        </div>
      ) : (
        <div className="stack">
          {artigos.map((a) => (
            <article className="card" key={a.id}>
              <h2 className="h2">
                <Link href={`/artigos/${a.slug}`}>{a.title}</Link>
              </h2>

              <p className="meta">
                Por <strong>{a.author}</strong> • {formatDateBR(a.publishedAt)}
              </p>

              <p className="meta">{a.description}</p>

              <Link className="btn" href={`/artigos/${a.slug}`}>
                Ler artigo →
              </Link>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}