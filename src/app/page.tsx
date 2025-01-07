'use client'
import { useEffect, useState } from 'react'
import styles from '~/scss/LandingPage.module.scss'
import Layout from '~/Layout'
import LineDrawer from '~/LineDrawer'
import Button from '~/Button'

export default function Home() {
	const [started, setStarted] = useState<boolean>(false)
	useEffect(() => {
		setStarted(true)
	}, [])
  // const {breakpoint} = useContext(siteContext)
  return (
          <Layout>
            <div className={styles.title} key="title-div">
              <div className={styles['sys-vis']}>
                <div className={`${styles.first} ${started ? ` ${styles.show}` : ''}`}>
                  <h1>Our Systems</h1>
                </div>
                <div className={`${styles.second} ${started ? ` ${styles.show}` : ''}`}>
                  <h1>Your Visions</h1>
                </div>
                <div className={styles.lines}>
                  <LineDrawer size={4} width={16} position={{x: -155, y: -5}} delay={200} duration={100} direction="down" />
                  <LineDrawer size={4} width={52} position={{x: -157, y: -21 }} delay={375} duration={100} direction="right" />
                </div>
              </div>
              <div className={styles['let-us']}>
                <h5>When you’re bringing your ideas to life,</h5>
                <h5>there can be a lot to worry about.</h5>
                <br/>
                <h5>Let us make sure one thing always goes right.</h5>
                <h2>Never worry<br/>about your website</h2>
              </div>
              <div className={styles.meet}>
                <Button navigate="meet.sysvisionz.com">Schedule a Meeting</Button>
                <div className={styles.links}>
                  Call us at <a href="tel:5417357873">(541) 735-7873</a><br/>
                  Email us at <a href="mailto:contact@sysvisionz.com">contact@sysvisionz.com</a>
                </div>
              </div>
            </div>
             <div>

            </div>
          </Layout>
  );
}
