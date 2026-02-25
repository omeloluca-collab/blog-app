import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getArtigoBySlug, getArtigos, formatDateBR } from "../../../lib/artigos";

export const dynamic = "force-static";

type Props = {
  params: { slug: string } | Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const artigos = await getArtigos();
  return artigos.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const artigo = await getArtigoBySlug(slug);
  if (!artigo) notFound();

  return {
    title: artigo.title,
    description: artigo.description,
    authors: [{ name: artigo.author }],
    openGraph: {
      title: artigo.title,
      description: artigo.description,
      type: "article",
      publishedTime: artigo.publishedAt,
    },
  };
}

export default async function ArtigoPage({ params }: Props) {
  const { slug } = await params;

  const artigo = await getArtigoBySlug(slug);
  if (!artigo) notFound();

  const paragraphs = (artigo.content ?? "")
    .split("\n")
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <article className="stack">
      <Link className="btn" href="/">← Voltar</Link>

      <div className="card">
        <h1 className="h1">{artigo.title}</h1>
        <p className="meta">
          Por <strong>{artigo.author}</strong> • {formatDateBR(artigo.publishedAt)}
        </p>
        <p className="meta">{artigo.description}</p>
      </div>

      <div className="card content">
        {paragraphs.length ? (
          paragraphs.map((p, i) => <p key={i}>{p}</p>)
        ) : (
          <p>Este artigo ainda não tem conteúdo.</p>
        )}
      </div>
    </article>
  );
}