import clsx from "clsx";
import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { Inter } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getCurrentUser } from "./components/getCurrentUser";
import "./globals.css";
import { StoreProvider } from "./StoreProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Lego Shop",
  description: "You never get too old to play, Right?",
  icons: {
    icon: ["/assets/LEGO_logo.png"],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentUser = await getCurrentUser();

  console.log("user >>>", currentUser);

  return (
    <html lang="en">
      <body
        className={clsx(inter.className, "bg-background overflow-x-hidden")}
      >
        <StoreProvider>
          <ThemeProvider attribute="class" defaultTheme="light">
            <ToastContainer />
            {children}
          </ThemeProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
