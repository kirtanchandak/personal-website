import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
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
    <html lang="en" className={`${inter.variable} ${manrope.variable} ${inter.className}`}>
      <body>
        <Nav />
        {children}
      </body>
    </html>
  );
}
