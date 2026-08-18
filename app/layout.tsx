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
  metadataBase: new URL("https://kirtanchandak.in"),
  title: {
    default: "Kirtan Chandak — Software Developer | AI Agents & Developer Tools",
    template: "%s | Kirtan Chandak",
  },
  description:
    "Kirtan Chandak is a software developer at Kuration AI, building AI agents, MCP servers, and developer tooling. Google Summer of Code contributor, LFX intern at Vitess (Linux Foundation), and Microsoft Student Ambassador.",
  keywords: [
    "Kirtan Chandak",
    "Kirtan",
    "Chandak",
    "software developer",
    "AI agents",
    "MCP servers",
    "developer tools",
    "Kuration AI",
    "Google Summer of Code",
    "GSoC",
    "LFX",
    "Vitess",
    "Linux Foundation",
    "open source",
    "Next.js",
    "TypeScript",
    "React",
    "Python",
    "FastAPI",
  ],
  authors: [{ name: "Kirtan Chandak", url: "https://kirtanchandak.in" }],
  creator: "Kirtan Chandak",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Kirtan Chandak — Software Developer",
    description:
      "Software developer at Kuration AI building AI agents, MCP servers, and developer tooling. GSoC contributor & LFX intern.",
    url: "https://kirtanchandak.in",
    siteName: "Kirtan Chandak",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/kirtan.webp",
        width: 400,
        height: 400,
        alt: "Kirtan Chandak",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kirtan Chandak — Software Developer",
    description:
      "Building AI agents and developer tools at Kuration AI. GSoC contributor & LFX intern at Vitess.",
    creator: "@kaborundak",
    images: ["/kirtan.webp"],
  },
  alternates: {
    canonical: "https://kirtanchandak.in",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${manrope.variable} ${jetbrains.variable} ${inter.className}`}
      suppressHydrationWarning
    >
      <body suppressHydrationWarning>
        <ModeProvider>
          <Nav />
          {children}
        </ModeProvider>
      </body>
    </html>
  );
}
