import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Meu Blog",
    template: "%s | Meu Blog",
  },
  description: "Blog criado com Next.js App Router e SEO dinâmico.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <header className="container header">
          <a className="brand" href="/">Meu Blog</a>
        </header>

        <main className="container">{children}</main>

        <footer className="container footer">
          <small>© {new Date().getFullYear()} Meu Blog</small>
        </footer>
      </body>
    </html>
  );
}