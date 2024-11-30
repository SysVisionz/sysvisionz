'use client'
import Logo from './Logo';
import style from './scss/Topbar.module.scss'
import { FC, useContext, useEffect, useRef, useState } from "react";
import { userContext } from '../contexts/user';

/** this component changes height, as well as the logo size/type */
const Topbar: FC = () => {
	const [atTop, setAtTop] = useState<boolean>(true)
	const spacer = useRef<HTMLDivElement>(null)
	useEffect(() => {
		const iObserv = new IntersectionObserver((entries) => {
			if (entries[0].isIntersecting){
				setAtTop(true)
			} else {
				setAtTop(false)
			}
		}, {threshold: 0.1})
		if (!(typeof window === 'undefined')){
			setAtTop(window.scrollY <= 70)
		}
		spacer.current && iObserv.observe(spacer.current)
		return () => {
			spacer.current && iObserv.unobserve(spacer.current)
		}
		
	}, [])
	const {user} = useContext(userContext)
	return<>
		<div ref={spacer} className={`${style.spacer}${atTop ? ` ${style.top}` : ""}`}></div>
		<div className={`${style.topbar}${atTop ? ` ${style.top}` : ''}`}>
			<div className={style.logo}><Logo style={atTop ? 'large' : 'small'}/></div>
			<div className={style.links}>
				<a href="/about">About</a>
				<a href="/services">Services</a>
				<a href="/contact">Contact</a>
			</div>
			<div style={{display: 'none'}}>
				{/* {user.privLevel ? : <button>Login</button>} */}
			</div>
		</div>
	</>
}

export default Topbar