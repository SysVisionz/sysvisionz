'use client'
import styles from '~/scss/Footer.module.scss'
import Socials from './Socials'
import Testimonials from './Testimonials'
import Button from './Button'
import { useEffect, useRef, useState } from 'react'
import { useDelay } from '~/shared/utils'

const Footer = () => {
	const footer = useRef<HTMLDivElement>(null)
	const [height, setHeight] = useState<number>(100)
	const checkSize = () => {
		if (footer.current){
			setHeight(footer.current.clientHeight)
		}
	}
	const check = useDelay({
		onStart: checkSize,
		onEnd: checkSize
	}, 150)
	const observer = useRef<ResizeObserver>()
	useEffect(() => {
		if (!observer.current) { observer.current = new ResizeObserver(check) }
		if (observer.current && typeof window !== 'undefined') { observer.current.observe(document.body) }
		return () => {
			if (observer.current) {observer.current?.disconnect()}
		}
	}, [])
		return (<>
		<div className={styles.spacer} style={{height}} />
		<footer className={styles.footer} ref={footer}>
			<div className={styles.container}>
				<div className={styles.content} >
					<div className={styles.meet}><Button navigate="meet.sysvisionz.com"><h3>Schedule a Meeting</h3></Button></div>
					<Socials className={styles['footer-social']} />
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