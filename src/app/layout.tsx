import type { Metadata } from "next";
import localFont from "next/font/local";
import Topbar from "~/Topbar";
import style from "./style.module.scss";
import SiteProvider from "../contexts/site";
import LoadOverlay from "~/LoadOverlay";
import {bgWires} from '~/images'
import Footer from "~/Footer";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "SysVisionz",
  description: "SysVisionz, a website for the future",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} ${style.body}`}>
        <SiteProvider>
          <LoadOverlay />
          <div className={style.background} style={{maskImage:bgWires.src}} />
          <Topbar />
          <main className={style.main} id="main">{children}</main>
        </SiteProvider>
        <Footer />
      </body>
    </html>
  );
}
