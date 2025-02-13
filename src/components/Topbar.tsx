'use client'
import Logo from './Logo';
import style from './scss/Topbar.module.scss'
import { FC, useContext, useEffect, useRef, useState } from "react";
import { userContext } from '../contexts/user';
import Link from 'next/link';
import { useDelay } from '~/shared/utils';

/** this component changes height, as well as the logo size/type */
const Topbar: FC = () => {
	const [atTop, setAtTop] = useState<boolean>(true)
	const [tablet, setTablet] = useState<boolean>(false)
	const spacer = useRef<HTMLDivElement>(null)
	const iObserv = useRef<IntersectionObserver>()
	const setTabSize = useDelay({onEnd: () => {
		if (tablet !== window.innerWidth <= 768){
			setTablet(window.innerWidth <= 768)
		}
	}}, 300)
	const observer = useRef<ResizeObserver>()
	useEffect(() => {
		if (!iObserv.current){
			iObserv.current = new IntersectionObserver((entries) => {
				if (entries[0].isIntersecting){
					setAtTop(true)
				} else {
					setAtTop(false)
				}
			}, {threshold: 0.8})
		}
		if (!observer.current) { observer.current = new ResizeObserver(setTabSize) }
		if (typeof window !== 'undefined'){
			setAtTop(window.scrollY <= 70)
			if (tablet !== window.innerWidth <= 768){
				setTablet(window.innerWidth <= 768)
			}
		}
		if (spacer.current){ iObserv.current.observe(spacer.current) }
		if (observer.current && typeof window !== 'undefined') { observer.current.observe(document.body) }
		return () => {
			if (spacer.current) {iObserv.current?.unobserve(spacer.current)}
			if (observer.current) {observer.current?.disconnect()}
		}
	}, [])
	const {user} = useContext(userContext)
	return<>
		<div ref={spacer} className={`${style.spacer}${atTop ? ` ${style.top}` : ""}`}></div>
		<div className={`${style.topbar}${atTop ? ` ${style.top}` : ''}`}>
			<div className={style.logo}><Link href="/"><Logo color="blue" /></Link></div>
			<div className={style.links}>
				<Link href="/"><h2>Home</h2></Link>
				<Link href="/services"><h2>Services</h2></Link>
			</div>
			<div style={{display: 'none'}}>
				{user.privLevel ? <div>{user.displayName}</div> : <button>Login</button>}
			</div>
		</div>
	</>
}

export default Topbar