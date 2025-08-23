// 'use client'
import type { Metadata } from "next";
import style from "./Style.module.scss";
import SiteProvider from "../contexts/site";
import Footer from "~/Footer";
import Parallax from "~/Parallax";
import { dev } from "~/images";
import { ReactElement, 
  // useEffect, useState 
} from "react";
import Topbar from "~/Topbar";
import "./global.css"
import favicon from "./favicon.ico";
// import Button from "~/Button";
import nextSession from 'next-session'


export const metadata: Metadata = {
  title: "SysVisionz",
  description: "SysVisionz, a website for the future",
}

export default function RootLayout({
  children
}: Readonly<{
  children: ReactElement<HTMLDivElement>[];
}>) {
  // const [header, setHeader] = useState<number>(5);
  // const [body, setBody] = useState<number>(0);
  // useEffect(() => {
  //   if (body > 6) {
  //     setBody(0);
  //   }
  //   if (header > 6) {
  //     setHeader(0);
  //   }
  // }, [body, header]);
  return (
    <html lang="en">
      <link rel="apple-touch-icon" href={favicon.src} />
      <body className={style.body + " " + style[`body-header-5`] + " " + style[`body-body-0`]}>
        <Parallax image={dev}>
          <SiteProvider>
              {
              // typeof window !== 'undefined' && location.host === "localhost:8082" ? <div className={style.changers}><Button onClick={() => {setHeader(header + 1)}}>Headers</Button>
              // <Button onClick={() => {setBody(body + 1)}}>Body</Button></div> : null
              }
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