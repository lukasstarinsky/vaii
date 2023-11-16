'use client';

import "@fortawesome/fontawesome-svg-core/styles.css"; 
import "./globals.css"
import "@/services/HttpService";
import { Open_Sans } from "next/font/google";
import { useGlobalStore } from "@/store/global";
import { useEffect } from "react";
import { usePathname, useSearchParams } from 'next/navigation'
import { config } from "@fortawesome/fontawesome-svg-core";
import Navbar from "@/components/Navbar";
import Loading from "@/components/Loading";

config.autoAddCss = false;

const openSans = Open_Sans({
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({ children }) {
  const { isLoading, startLoadingDelay } = useGlobalStore();
  const pathname = usePathname()
  const searchParams = useSearchParams()
 
  useEffect(() => {
    startLoadingDelay(300);
  }, [pathname, searchParams])

  return (
    <html lang="en" className={openSans.className}>
      <body className="flex flex-col">
        <Navbar />

        { isLoading && <Loading /> }

        <main className={`${isLoading ? 'hidden': ''} container self-center flex justify-center flex-col items-center`}>
          {children}
        </main>
      </body>
    </html>
  );
}