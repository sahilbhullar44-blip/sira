import type { Metadata } from "next";
import { Playfair_Display, Mulish } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
});

const mulish = Mulish({
  variable: "--font-mulish",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "600"],
});

export const metadata: Metadata = {
  title: "SiRa Entertainment - The Golden Stage",
  description:
    "SiRa Entertainment curates world-class experiences. We bridge the gap between iconic artists and the audiences who adore them.",
};

import SmoothScroller from "@/components/SmoothScroller";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${playfair.variable} ${mulish.variable} antialiased selection:bg-red-700 selection:text-white`}
      >
        <SmoothScroller />
        <div className="noise-overlay" />
        {children}
      </body>
    </html>
  );
}
