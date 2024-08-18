import clsx from "clsx";
import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import Footer from "./(root)/sections/Footer";
import Header from "./components/Nav/Header";
import "./globals.css";
import { StoreProvider } from "./StoreProvider";
import { LayoutProps } from "./types";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LEGO Shop",
  description: "You never get too old to play, Right?",
  icons: {
    icon: ["/assets/LEGO_logo.png"],
  },
};

export const revalidate = 0;

export default function RootLayout({ children, padding = true }: LayoutProps) {
  return (
    <html lang="en">
      <body className={clsx(inter.className)}>
        <StoreProvider>
          <ThemeProvider attribute="class" defaultTheme="light">
            <Header />
            <main className="mx-auto max-w-6xl py-24 font-bold text-black max-xl:px-8">
              {children}
            </main>
            <Footer />
            <Toaster richColors position="bottom-left" />
          </ThemeProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
