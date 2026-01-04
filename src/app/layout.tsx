import type { Metadata } from "next";
import { Syne } from "next/font/google";
import "./globals.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"], // Syne has unique weights, useful for bold headers
});

export const metadata: Metadata = {
  title: "SiRa Entertainment - The Golden Stage",
  description:
    "SiRa Entertainment curates world-class experiences. We bridge the gap between iconic artists and the audiences who adore them.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${syne.variable} antialiased selection:bg-red-700 selection:text-white`}
      >
        {children}
      </body>
    </html>
  );
}
