import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "decoda · Decodable Stories Platform",
  description:
    "Phonics-controlled decodable stories for early readers, organised by phase.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <header className="border-b border-slate-200 bg-white">
          <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
            <Link href="/" className="flex items-center gap-2 text-xl font-bold text-brand-700">
              <span aria-hidden className="text-2xl">📖</span>
              decoda
            </Link>
            <nav className="text-sm font-medium text-slate-500">
              <Link href="/" className="hover:text-brand-600">
                Library
              </Link>
            </nav>
          </div>
        </header>
        <main className="mx-auto max-w-5xl px-4 py-8">{children}</main>
        <footer className="mx-auto max-w-5xl px-4 py-10 text-center text-xs text-slate-400">
          decoda — Decodable Stories Platform
        </footer>
      </body>
    </html>
  );
}
