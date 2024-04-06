import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NextTopLoader from 'nextjs-toploader';

import Providers from "./providers";
import Header from "./header";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pair Code Buddy",
  description: "Pair programming with a buddy",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <NextTopLoader />
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}
