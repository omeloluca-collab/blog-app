import { promises as fs } from "fs";
import path from "path";
import slugify from "slugify";

export type Artigo = {
  id: string;
  slug?: string;
  title: string;
  author: string;
  publishedAt: string;
  description: string;
  content: string;
};

export type ArtigoComSlug = Artigo & { slug: string };

const filePath = path.join(process.cwd(), "data", "artigos.json");

export async function getArtigos(): Promise<ArtigoComSlug[]> {
  const raw = await fs.readFile(filePath, "utf8");
  const artigos: Artigo[] = JSON.parse(raw);

  return artigos.map((a) => ({
    ...a,
    slug:
      a.slug ??
      slugify(a.title, { lower: true, strict: true, trim: true }) ??
      a.id,
  }));
}

export async function getArtigoBySlug(slug: string): Promise<ArtigoComSlug | null> {
  const artigos = await getArtigos();
  return artigos.find((a) => a.slug === slug) ?? null;
}

export function formatDateBR(isoDate: string): string {
  const d = new Date(`${isoDate}T00:00:00`);
  return new Intl.DateTimeFormat("pt-BR", { dateStyle: "long" }).format(d);
}