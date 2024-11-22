'use client'
import Logo from './Logo';
import style from './scss/Topbar.module.scss'
import { FC, useEffect, useState } from "react";

/** this component changes height, as well as the logo size/type */
const Topbar: FC = () => {
	const [atTop, setAtTop] = useState<boolean>(true)
	useEffect(() => {
		if (!(typeof window === 'undefined')){
			setAtTop(window.scrollY <= 70)
		}
	})
	return <div className={`${style.topbar}${atTop ? ` ${style.top}` : ''}`}>
		<Logo />
	</div>
}

export default Topbar