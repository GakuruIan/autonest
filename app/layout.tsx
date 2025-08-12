import type { Metadata } from "next";
import { Bebas_Neue, Rajdhani, Poppins, Jura } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/providers/theme-provider";
import Navbar from "./components/Navbar";

import { ClerkProvider } from "@clerk/nextjs";

const bebas_neue = Bebas_Neue({
  weight: "400",
  variable: "--font-bebas_neue",
  subsets: ["latin"],
});

const rajdhani = Rajdhani({
  weight: "400",
  variable: "--font-rajdhani",
  subsets: ["latin"],
});

const jura = Jura({
  weight: ["300", "400", "500"],
  variable: "--font-jura",
});

const poppins = Poppins({
  weight: ["100", "400"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Autonest",
  description: "An automobile website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${bebas_neue.variable} ${poppins.variable} ${rajdhani.variable} ${jura.className} antialiased`}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem={false}
            storageKey="autonest-theme"
          >
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
