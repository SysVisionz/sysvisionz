'use client'
import { useEffect, useState } from 'react'
import styles from '~/scss/LandingPage.module.scss'
import Layout from '~/Layout'
import Links from '~/Links'

export default function Home() {
	const [started, setStarted] = useState<boolean>(false)
	useEffect(() => {
		setStarted(true)
	}, [])
  // const {breakpoint} = useContext(siteContext)
  return (
          <Layout>
            <div className={styles.title} key="title-div">
              <header className={styles['sys-vis']}>
                <div className={`${styles.first} ${started ? ` ${styles.show}` : ''}`}>
                  <h1>Our Systems</h1>
                </div>
                <div className={`${styles.second} ${started ? ` ${styles.show}` : ''}`}>
                  <h1>Your Visions</h1>
                </div>  
              </header>
              <div className={styles['let-us']}>
                <h5>When you’re bringing your ideas to life,</h5>
                <h5>there can be a lot to worry about.</h5>
                <br/>
                <h5>Let us make sure one thing always goes right.</h5>
                <h2>Never worry<br/>about your website</h2>
              </div>
              <Links />
            </div>
          </Layout>
  );
}
