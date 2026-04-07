import type { Metadata } from "next";
import { Inter, Roboto, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
});

const roboto = Roboto({
  subsets: ["latin"],
  style: ["normal"],
  weight: ["200", "300"],
  variable: "--font-headline",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-label",
});

export const metadata: Metadata = {
  title: "Guillermo Montenegro | CV",
  description:
    "Perfil profesional y articulos técnicos de Guillermo Montenegro sobre IA aplicada, software y producto.",
  openGraph: {
    title: "Guillermo Montenegro | CV",
    description:
      "Perfil profesional, experiencia y articulos técnicos escritos por Guillermo Montenegro.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="es"
      className={`${inter.variable} ${roboto.variable} ${spaceGrotesk.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
