import type { Metadata } from "next";
import { Space_Grotesk, Bangers } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-grotesk",
});

const bangers = Bangers({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-bangers",
});

export const metadata: Metadata = {
  title: "SeenIt | See It. Trust It.",
  description:
    "India's first trust-indexed, video-first UGC review platform powered by SARS™. Real people, real products, real experiences — on video.",
  keywords: [
    "SeenIt", "video reviews", "UGC", "India reviews", "SARS",
    "authentic reviews", "product reviews", "trust", "verified creators",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${bangers.variable}`}>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={spaceGrotesk.className}>{children}</body>
    </html>
  );
}
