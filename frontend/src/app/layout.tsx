import "@fortawesome/fontawesome-svg-core/styles.css"; 
import "./globals.css"
import { Metadata } from "next"
import Navbar from "@/components/Navbar";

import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

export const metadata: Metadata = {
  title: "Home",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex flex-col">
        <Navbar />

        <main className="container self-center flex justify-center">
          {children}
        </main>
      </body>
    </html>
  );
}