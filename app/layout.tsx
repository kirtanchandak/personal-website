import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Manrope } from "next/font/google";
import { ModeProvider } from "./components/ModeProvider";
import Nav from "./components/Nav";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-manrope",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-jetbrains",
});

export const metadata: Metadata = {
  title: "Kirtan Chandak",
  description:
    "Software developer at Kuration AI. Agents, MCP servers, and developer tooling. GSoC contributor and LFX intern.",
  openGraph: {
    title: "Kirtan Chandak",
    description:
      "Software developer at Kuration AI. Agents, MCP servers, and developer tooling.",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${manrope.variable} ${jetbrains.variable} ${inter.className}`}
    >
      <body>
        <ModeProvider>
          <Nav />
          {children}
        </ModeProvider>
      </body>
    </html>
  );
}
