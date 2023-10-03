import "./globals.css"
import { Metadata } from "next"
import Navbar from "./components/navbar";

export const metadata: Metadata = {
  title: "Home",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Navbar />

        {children}
      </body>
    </html>
  )
}