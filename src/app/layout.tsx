import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Influence App",
  description: "Next.js App Router Base",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
