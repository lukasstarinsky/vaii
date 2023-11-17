'use client';

import "@fortawesome/fontawesome-svg-core/styles.css"; 
import "./globals.css"
import "@/services/HttpService";
import { Open_Sans } from "next/font/google";
import { useGlobalStore } from "@/store/global";
import { useUserStore } from "@/store/user";
import { useEffect } from "react";
import { config } from "@fortawesome/fontawesome-svg-core";
import RouteChangeHandler from "@/components/RouteChangeHandler";
import Navbar from "@/components/Navbar";
import Loading from "@/components/Loading";
import * as AuthService from "@/services/AuthService";

config.autoAddCss = false;

const openSans = Open_Sans({
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({ children }) {
  const { isLoading } = useGlobalStore();
  const { setUser } = useUserStore();

  useEffect(() => {
    AuthService.CheckUser((user) => {
      setUser(user.id, user.username);
    });
  }, []);

  return (
    <html lang="en" className={openSans.className}>
      <body className="flex flex-col">
        <Navbar />
        <RouteChangeHandler />

        { isLoading && <Loading /> }

        <main className={`${isLoading ? 'hidden': ''} container self-center flex justify-center flex-col items-center`}>
          {children}
        </main>
      </body>
    </html>
  );
}