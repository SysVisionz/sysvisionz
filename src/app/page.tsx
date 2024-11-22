'use client'
import { type FC, useEffect, useState } from 'react'
import styles from '~/scss/LandingPage.module.scss'
import Layout from '~/Layout'
import LineDrawer from '~/LineDrawer'
import {logo} from '~/images'

export default function Home() {
	const [started, setStarted] = useState<boolean>(false)
	useEffect(() => {
		setStarted(true)
	})
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
                  <LineDrawer size={4} width={20} position={{x: -120, y: -10 }} delay={200} duration={100} direction="down" />
                  <LineDrawer size={4} width={32} position={{x: -122, y: -30 }} delay={375} duration={100} direction="right" />
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
                <button className={styles.button}><a href="/contact">Schedule a Meeting</a></button>
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
