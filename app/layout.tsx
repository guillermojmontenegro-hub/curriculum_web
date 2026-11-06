import type { Metadata } from "next";
import { Inter, Roboto, Space_Grotesk } from "next/font/google";
import { MotionEffects } from "@/components/motion-effects";
import "./globals.css";
import "./portfolio.css";

const themeInitializer = `
(() => {
  const storageKey = "theme-preference";
  const root = document.documentElement;
  let storedTheme;
  try { storedTheme = window.localStorage.getItem(storageKey); } catch {}
  const theme =
    storedTheme === "light" || storedTheme === "dark" ? storedTheme : "light";

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
  title: "Guillermo Montenegro | Software, Mobile & AI",
  description:
    "Desarrollo de software desde 2010. Android, iOS, web full stack, backend Java y Python, IA aplicada y automatización. Conocé mi trabajo y mi recorrido.",
  openGraph: {
    title: "Guillermo Montenegro | Software, Mobile & AI",
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
        <MotionEffects />
        {children}
      </body>
    </html>
  );
}
