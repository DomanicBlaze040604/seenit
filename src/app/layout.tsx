import type { Metadata } from "next";
import { Public_Sans } from "next/font/google";
import "./globals.css";

const publicSans = Public_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "SeenIt | Trust-First Video Reviews",
  description:
    "Experience authentic product feedback through our trust-first UGC video platform. Verified creators, honest experiences, zero manipulation.",
  keywords: ["reviews", "video reviews", "UGC", "product reviews", "trust", "verified"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={publicSans.className}>
        {children}
      </body>
    </html>
  );
}
