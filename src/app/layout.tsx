import type { Metadata } from "next";
import style from "./Style.module.scss";
import SiteProvider from "../contexts/site";
import Footer from "~/Footer";
import Parallax from "~/Parallax";
import { dev } from "~/images";
import { ReactElement } from "react";
import Topbar from "~/Topbar";
import "./global.css"


export const metadata: Metadata = {
  title: "SysVisionz",
  description: "SysVisionz, a website for the future",
}

export default function RootLayout({
  children
}: Readonly<{
  children: ReactElement<HTMLDivElement>[];
}>) {

  return (
    <html lang="en">
      <body className={style.body}>
        <Parallax image={dev}>
          <SiteProvider>
              <Topbar/>
                <main className={style.main} id="main">
                  <div className={style.layout}>
                    {children}
                  </div>
                </main>
              <Footer />
          </SiteProvider>
        </Parallax>
      </body>
    </html>
  );
}
