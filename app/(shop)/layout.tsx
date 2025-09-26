import type { Metadata } from "next";
import { Playfair_Display, Montserrat } from "next/font/google";
import "../globals.css";
import { Header } from "@/components/header";

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Avocado Ladies Fashion",
  description: "Modern fashion for women",
  icons: {
    icon: "/favicon.ico", // default favicon
    shortcut: "/favicon.ico", // optional
    apple: "/favicon.ico", // for iOS
  },
};

export const revalidate = 3600; // revalidate at most every hour
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${playfairDisplay.variable} ${montserrat.variable} antialiased`}
      >
        <Header />
        <main className="min-h-screen pb-10 px-2 bg-white">{children}</main>
      </body>
    </html>
  );
}
