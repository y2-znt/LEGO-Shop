import TanstackProvider from "@/providers/tanstack-provider";
import clsx from "clsx";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ReactNode } from "react";
import { Toaster } from "sonner";

import Header from "@/components/shared/Nav/Header";
import Footer from "@/components/shared/sections/Footer";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LEGO Shop",
  description: "You never get too old to play, Right?",
  icons: {
    icon: ["/assets/LEGO_logo.png"],
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={clsx(inter.className)}>
        <TanstackProvider>
          <Header />
          <main className="mx-auto max-w-6xl py-24 font-bold text-black max-xl:px-8">
            {children}
          </main>
          <Footer />
          <Toaster richColors position="bottom-left" />
        </TanstackProvider>
      </body>
    </html>
  );
}
