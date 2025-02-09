'use client'
import styles from '~/scss/Footer.module.scss'
import Socials from './Socials'
import Testimonials from './Testimonials'
import Button from './Button'
import { useRef } from 'react'

const Footer = () => {
	const footer = useRef<HTMLDivElement>(null)
	return (<>
		<div className={styles.spacer} />
		<footer className={styles.footer} ref={footer}>
			<div className={styles.container}>
				<div className={styles.content} >
					<div className={styles.meet}><Button navigate="meet.sysvisionz.com"><h3>Schedule a Meeting</h3></Button></div>
					<Socials />
					<Testimonials />
				</div>
				<div className={styles.attributions}>
					<span> &copy; 2025, SysVisionz LLC</span>
					<span>Built with icons by <a href="https://www.flaticon.com/authors/riajulislam">riajulislam</a> and images by <a href="https://www.freepik.com/author/vectorjuice">vectorjuice</a>, <a href="https://www.freepik.com/author/pikisuperstar">pikisuperstar</a>, <a href="https://www.freepik.com/author/harryarts">harryarts</a>, <a href="https://www.freepik.com/author/freepik">freepik</a> and <a href="https://www.freepik.com/author/pressfoto">pressfoto</a></span>
				</div>
			</div>
		</footer></>
	)
}

export default Footer