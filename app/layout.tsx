import clsx from "clsx";
import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import Header from "./components/Nav/Header";
import "./globals.css";
import { StoreProvider } from "./StoreProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LEGO Shop",
  description: "You never get too old to play, Right?",
  icons: {
    icon: ["/assets/LEGO_logo.png"],
  },
};

export const revalidate = 0;

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={clsx(inter.className, "overflow-x-hidden bg-background")}
      >
        <StoreProvider>
          <ThemeProvider attribute="class" defaultTheme="light">
            <Header />
            {children}
            <Toaster richColors position="bottom-left" />
          </ThemeProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
