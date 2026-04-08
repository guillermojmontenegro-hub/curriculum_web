import type { Metadata } from "next";
import { Inter, Roboto, Space_Grotesk } from "next/font/google";
import "./globals.css";

const themeInitializer = `
(() => {
  const storageKey = "theme-preference";
  const root = document.documentElement;
  const storedTheme = window.localStorage.getItem(storageKey);
  const systemTheme = window.matchMedia("(prefers-color-scheme: light)").matches
    ? "light"
    : "dark";
  const theme =
    storedTheme === "light" || storedTheme === "dark" ? storedTheme : systemTheme;

  root.dataset.theme = theme;
  root.style.colorScheme = theme;
})();
`;

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
});

const roboto = Roboto({
  subsets: ["latin"],
  style: ["normal"],
  weight: ["300", "400"],
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
      suppressHydrationWarning
    >
      <body>
        <script dangerouslySetInnerHTML={{ __html: themeInitializer }} />
        {children}
      </body>
    </html>
  );
}
