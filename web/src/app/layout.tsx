import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Noria — Discover autonomous agents",
  description: "Find, compare, and understand autonomous agents on BNB Smart Chain.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
