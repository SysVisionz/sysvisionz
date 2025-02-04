'use client'
import Logo from './Logo';
import style from './scss/Topbar.module.scss'
import { FC, useContext, useEffect, useRef, useState } from "react";
import { userContext } from '../contexts/user';
import Link from 'next/link';

/** this component changes height, as well as the logo size/type */
const Topbar: FC = () => {
	const [atTop, setAtTop] = useState<boolean>(true)
	const spacer = useRef<HTMLDivElement>(null)
	const iObserv = useRef<IntersectionObserver>()
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
		if (!(typeof window === 'undefined')){
			setAtTop(window.scrollY <= 70)
		}
		if (spacer.current){iObserv.current.observe(spacer.current)}
		return () => {
			if (spacer.current) {iObserv.current?.unobserve(spacer.current)}
		}
		
	}, [])
	const {user} = useContext(userContext)
	return<>
		<div ref={spacer} className={`${style.spacer}${atTop ? ` ${style.top}` : ""}`}></div>
		<div className={`${style.topbar}${atTop ? ` ${style.top}` : ''}`}>
			<div className={style.logo}><Link href="/"><Logo {...(atTop ? {} : {
				color: 'blue',
				style: 'small'
			})} /></Link></div>
			<div className={style.links}>
				<Link href="/">Home</Link>
				<Link href="/services">Services</Link>
			</div>
			<div style={{display: 'none'}}>
				{user.privLevel ? <div>{user.displayName}</div> : <button>Login</button>}
			</div>
		</div>
	</>
}

export default Topbar