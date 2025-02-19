'use client'
import Head from 'next/head'
import styles from './LandingPage.module.scss'
import Links from '~/Links'
import SlidingSection from '~/SlidingSection'
import { howWork, nights, noWorries, whatDo } from '~/images'

export default function Home() {
  
  // const {breakpoint} = useContext(siteContext)
  return (<>
              <Head><title>SysVisionz: Our Systems, Your Visionz</title></Head>
              <SlidingSection>
                <header className={styles['sys-vis']}>
                  <div className={styles.first}>
                    <h1>Our Systems, Your Visions</h1>
                  </div>  
                </header>
              </SlidingSection>
              <SlidingSection image={{src: noWorries.src, alt: 'no worries'}}>
                <div className={styles['main-section']}>
                  <div className={styles['let-us']}>
                    <h5>When you’re bringing your ideas to life,</h5>
                    <h5>there can be a lot to worry about.</h5>
                    <br/>
                    <h5>Let us make sure one thing always goes right.</h5>
                    <h2>Never worry about your website</h2>
                  </div>
                </div>
                <Links />
              </SlidingSection>
              <SlidingSection image={{src: whatDo.src, alt: 'site'}}> 
                <h2>What we Do</h2>
                <p>
                  At SysVisionz, we believe that your applications should be the least of your worries.
                </p>
                <p>
                  Our goal is your goal; to provide you with the team to make your business thrive in the rapidly changing tech landscape,
                </p>
              </SlidingSection>
              <SlidingSection image={{src: howWork.src, alt: 'how work'}}>
                <h2>How we Work</h2>
                <p>
                  Our applications are built with the latest technologies, providing top tier performance and security.
                </p>
                <p>
                  Whether your application is for your team or for your clients, we ensure you have a future-proof, scalable and maintainable solution.
                </p>
              </SlidingSection>
              <SlidingSection className={styles.why} image={{src: nights.src, alt: 'why', fill: true}}>
                <h2>Why SysVisionz?</h2>
                <p>
                  When you choose us, you can be assured that your applications are delivered with the care and attention to detail you've always wanted.
                </p>
                <p>
                  Our extensive experience ensures we know how to ensure you get what you want the first time, and make sure that happens.
                </p>
                <p>
                  We know that your time is valuable, and we ensure you can focus on what you do best, while we give you the tools to not just survive, but thrive.
                </p>
              </SlidingSection>
              <SlidingSection className={styles["why-wait"]}><h3>
                So why wait?<br/> 
                Let&apos;s get to work.<br/>
                Let our Systems build your Visions today.
              </h3>
              <Links className={styles["interested-links"]} /></SlidingSection>
            </>
  );
}
