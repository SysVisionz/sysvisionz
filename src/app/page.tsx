'use client'
import { useEffect, useRef, useState } from 'react'
import styles from '~/scss/LandingPage.module.scss'
import Layout from '~/Layout'
import Links from '~/Links'
import Image from 'next/image'
import {dev} from '~/images'
import { useEffectDelay } from '~/shared/utils'

export default function Home() {
	const [started, setStarted] = useState<boolean>(false)
  const [top, setTop] = useState<number>(0)
  const [scrollY, setScrollY] = useState<number>(0)
  useEffect(() => {
    const scrollListener = () => {
      setScrollY(window.scrollY)
    }
    window.addEventListener('scroll', scrollListener)
    return () => {window.removeEventListener('scroll', scrollListener)}
  }, [])
  const adjustTop = () => {
    setTop(typeof window !== 'undefined' ? window.scrollY / (document.body.clientHeight - window.innerHeight) * (window.innerHeight - (img.current?.clientHeight || 0)) : 0)
  }
  const img = useRef<HTMLImageElement>(null)
  useEffectDelay({"onStart": adjustTop, onEnd: adjustTop, 'delay': 40}, [scrollY])

  // const {breakpoint} = useContext(siteContext)
  return (
          <Layout>
            <div className={styles['dev-img']}><Image ref={img} src={dev.src} alt="dev" height={dev.height} width={dev.width} style={{top}} /></div>
            <div className={styles.title} key="title-div">
              <header className={styles['sys-vis']}>
                <div className={`${styles.first} ${started ? ` ${styles.show}` : ''}`}>
                  <h1>Our Systems</h1>
                </div>
                <div className={`${styles.second} ${started ? ` ${styles.show}` : ''}`}>
                  <h1>Your Visions</h1>
                </div>  
              </header>
              <div className={styles['main-section']}>
                <div className={styles['let-us']}>
                  <h5>When you’re bringing your ideas to life,</h5>
                  <h5>there can be a lot to worry about.</h5>
                  <br/>
                  <h5>Let us make sure one thing always goes right.</h5>
                  <h2>Never worry<br/>about your website</h2>
                </div>
              </div>
              <Links />
              <div>
                <h2>What we Do</h2>
                <p>
                  Here at SysVisionz, we believe that your website should be the least of your worries, and every team deserves to have the tools to realize their maximum potential. 
                  We are dedicated to providing custom tailored software development for your business, as well as 
                  providing guidance on how your team can onboard, mentor, and improve your own developers, settng you up for success now and in the future.
                </p>
                <p>
                  Our goal is your goal; to make your business thrive in the rapidly shifting, unpredictable tech landscape.
                  Our experienced team of developers work closely with you to build, refine, or refactor your application.
                </p>
                <p>
                  If you have a team already, we work closely with your developers to help them revitalize their innovative spirit
                  giving them the tools and ways of working that will provide your business with the edge it needs to stay on top,
                  no matter what the future throws at you.
                </p>
              </div>
              <div>
                <h2>How we Work</h2>
                <p>
                  Our applications are built with the latest technologies, providing the performance and security you expect and deserve from your software.
                </p>
                <p>
                  Whether your application is internal or customer facing, we work with you to ensure that it not only meets your specifications, but provides a future-proof, scalable and maintainable solution that will keep you prepared to meet all your business needs.
                </p>
                <p>
                  Not only that, but our team has proven experience meeting security and compliance requirements for even HIPAA level data sensitivity
                </p>
              </div>
              <div>
                <h2>Why SysVisionz?</h2>
                <p>
                  When you choose us, you can be assured that your applications will be delivered with the care and attention to detail you have always wanted from your contractors.
                </p>
                <p>
                  With extensive experience in the industry, we know what works and what doesn't, and have the experience to know the right questions to ask to ensure you get what you want the first time.
                </p>
                <p>
                  After all, we know that your time is valuable, and we want to make sure that you can focus on what you do best, while we take care of the software development that makes your business not just survive, but thrive.
                </p>
              </div>
              <h3>
                So why wait? Let's get to work, and let our Systems handle your Visions today.
              </h3>
              <Links />
            </div>
          </Layout>
  );
}
