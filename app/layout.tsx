import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Nav from "./components/Nav";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
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
    <html lang="en" className={inter.className}>
      <body>
        <Nav />
        {children}
      </body>
    </html>
  );
}
