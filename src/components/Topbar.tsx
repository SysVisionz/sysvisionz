'use client'
import Logo from './Logo';
import style from './scss/Topbar.module.scss'
import { FC, use, useContext, useEffect, useRef, useState } from "react";
import { userContext } from '../contexts/user';
import Link from 'next/link';
import { useDelay } from '~/shared/utils';
// import Login from './Login';

/** this component changes height, as well as the logo size/type */
const Topbar: FC = () => {
	const [atTop, setAtTop] = useState<boolean>(true)
	const [tablet, setTablet] = useState<boolean>(false)
	const spacer = useRef<HTMLDivElement>(null)
	const [current, setCurrent] = useState<string>()
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
	const links: [string, string, () => boolean][] = [
		['Home', '/', () => window.location.pathname === '/'],
		['Services', '/services', () => !!window.location.pathname.match(/\/services/)]
	]
	return<>
		<div ref={spacer} className={`${style.spacer}${atTop ? ` ${style.top}` : ""}`}></div>
		<div className={`${style.topbar}${atTop ? ` ${style.top}` : ''}`}>
			<div className={style.logo}><Link href="/"><Logo color="blue" /></Link></div>
			<div className={style.links}><div className={style.shadow}>
				{links.map((v) => <Link key={`topbar-links-${v[0]}`} className={current === v[0] ? style.current : undefined} href={v[1]}><h2>{v[0]}</h2></Link>)}
				{/* <Login /> */}
			</div>
			<div style={{display: 'none'}}>
				{user.privLevel ? <div>{user.displayName}</div> : <button>Login</button>}
			</div>
		</div></div>
	</>
}

export default Topbar