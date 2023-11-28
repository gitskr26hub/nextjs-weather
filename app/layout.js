

import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Context from "@/context/context"

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Weather App",
  description: "welcome to Weather app by skr",
};

export default function RootLayout({ children }) {
  
  return (
    <html lang="en">
      <body className={inter.className}>
       <Context>
        <Navbar />
        {children}
      </Context>

      </body>
    </html>
  );
}
