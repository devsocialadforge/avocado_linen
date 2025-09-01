import type { Metadata } from "next";
import { Playfair_Display, Montserrat } from "next/font/google";
import "../globals.css";

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
        {children}
      </body>
    </html>
  );
}
