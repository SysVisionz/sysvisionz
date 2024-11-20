'use client'
import { type FC, useEffect, useState } from 'react'
import styles from './scss/Main.module.scss'
import Layout from './Layout'
import LineDrawer from './LineDrawer'

const Main: FC = () => {
	const [started, setStarted] = useState<boolean>(false)
	useEffect(() => {
		setStarted(true)
	})

	return <Layout>
	<div className={styles.title} key="title-div">
		<div className={`${styles.first} ${started ? ` ${styles.show}` : ''}`}>
			<h1>Our Systems</h1>
		</div>
		<div className={`${styles.second} ${started ? ` ${styles.show}` : ''}`}>
			<h1>Your Visions</h1>
		</div>
		<div className={styles.lines}>
			<LineDrawer size={4} width={90} position={{x: 28, y: 4}} delay={50} duration={100} direction="right" />
			<LineDrawer size={4} width={46} position={{x: 118, y: 6}} delay={125} duration={100} direction="down" />
			<LineDrawer size={4} width={30} position={{y: -38, x: 88}} delay={300} duration={100} direction="left" />
		</div>
		<div className={styles['let-us']}>
		<h5>When you’re bringing your ideas to life,</h5>
		<h5>there can be a lot to worry about.</h5>
		<br/>
<h5>Let us make sure one thing always goes right.</h5>
		</div>
	</div>
	<div>

	</div>
  </Layout>

}

export default Main