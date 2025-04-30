import Header from "@/components/shared/Nav/Header";
import Footer from "@/components/shared/sections/Footer";
import { StoreProvider } from "@/providers/StoreProvider";
import TanstackProvider from "@/providers/tanstack-provider";
import { LayoutProps } from "@/types";
import clsx from "clsx";
import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LEGO Shop",
  description: "You never get too old to play, Right?",
  icons: {
    icon: ["/assets/LEGO_logo.png"],
  },
};

export const revalidate = 0;

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="en">
      <body className={clsx(inter.className)}>
        <StoreProvider>
          <ThemeProvider attribute="class" defaultTheme="light">
            <TanstackProvider>
              <Header />
              <main className="mx-auto max-w-6xl py-24 font-bold text-black max-xl:px-8">
                {children}
              </main>
              <Footer />
              <Toaster richColors position="bottom-left" />
            </TanstackProvider>
          </ThemeProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
