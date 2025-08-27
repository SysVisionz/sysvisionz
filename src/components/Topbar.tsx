'use client'
import Logo from './Logo';
import style from './scss/Topbar.module.scss'
import { FC, useContext, useEffect, useRef, useState } from "react";
import Link from 'next/link';
import { useDelay } from '~/shared/utils';
import Login from './Login';
import { useHasAtLeast, userContext } from '~/contexts/user';

/** functionalities by priv level:
 * future: forums, chat with support
 * users: messages, proposals, profile, persistent chat
 * clients: invoices, my proposals, projects, team chat
 * mods: user management
 * admin: billing settings, project management
 * master: user management
 */

/** this component changes height, as well as the logo size/type */
const Topbar: FC = () => {
	const [atTop, setAtTop] = useState<boolean>(true)
	const [tablet, setTablet] = useState<boolean>(false)
	const spacer = useRef<HTMLDivElement>(null)
	const iObserv = useRef<IntersectionObserver>()
	const [links, setLinks] = useState<[string, string][]>([['Home', '/'], ['Services', '/services']])
	const [dropdown, setDropdown] = useState<[string, string][]>([])
	const addLink = (type: 'dropdown' | 'links', ...v: [string, string][]) => {
		const [get, set] = type === 'dropdown' ? [dropdown, setDropdown] : [links, setLinks]
		for (const i in v){
			if (!get.find((val) => val[0] === v[i][0])){
				set([...get, v[i]])
			}
		}
	}
	useHasAtLeast({
		mod: () => {
			addLink('dropdown', ['Dashboard', '/dashboard'])
			return true;
		},
		'client': () => {
			addLink('dropdown', ['Projects', '/projects'], ['Team Chat', '/team-chat'])
			return true;
		},
		'user': () => {
			addLink('dropdown', ['Messages', '/messages'], ['Profile', '/profile'])
			addLink('links', ['Proposals', '/proposals'])
			return true;
		},
	})
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
			<div className={style.links}><div className={style.shadow}>
				{links.map((v) => Array.isArray(v) ? <Link key={`topbar-links-${v[0]}`} href={v[1]}><h2>{v[0]}</h2></Link> : null)}
				{/* <Login /> */}
			</div>
			<div style={{display: 'none'}}>
				{dropdown.length ? <div>{user.displayName}</div> : <Login />}
			</div>
		</div></div>
	</>
}

export default Topbar