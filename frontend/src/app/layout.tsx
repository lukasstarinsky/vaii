import "@fortawesome/fontawesome-svg-core/styles.css"; 
import "./globals.css"
import { Metadata } from "next"
import { Open_Sans } from "next/font/google";
import Navbar from "@/components/Navbar";

import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

const openSans = Open_Sans({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Home",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={openSans.className}>
      <body className="flex flex-col">
        <Navbar />

        <main className="lg:container self-center flex justify-center flex-col items-center">
          {children}
        </main>
      </body>
    </html>
  );
}