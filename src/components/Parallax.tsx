'use client'
import Image from 'next/image'
import { type FC, useEffect, useRef, useState } from "react";
import { useEffectDelay } from "~/shared/utils";
import style from './scss/Parallax.module.scss'
const Parallax: FCWC<{image: Image}> = ({image, children}) => {
	const [top, setTop] = useState<number>(0)
	const [scrollY, setScrollY] = useState<number>(0)
	const [isReady, setReady] = useState<boolean>(false)
	const ready = () => setReady(true)
	const adjustTop = () => {
	  setTop(typeof window !== 'undefined' ? window.scrollY / (document.body.clientHeight - window.innerHeight) * (window.innerHeight - (img.current?.clientHeight || 0)) : 0)
	}
	const img = useRef<HTMLImageElement>(null)
	useEffectDelay({"onStart": adjustTop, onEnd: adjustTop, 'delay': 40}, [scrollY])
	useEffect(() => {
	  const scrollListener = () => {
		setScrollY(window.scrollY)
	  }
	  if (!isReady){
		if (img.current?.complete) {
			ready()
		}
		else{
			img.current?.addEventListener('load', ready)
		}
	  }
	  !ready && window.addEventListener('scroll', scrollListener)
	  return () => {
		window.removeEventListener('scroll', scrollListener)
		img.current?.removeEventListener('load', ready)
		}
	}, [])
	return <div className={`${style.content}${isReady ? ` ${style.ready}` : ''}`}>
		<div className={style['dev-img']}><Image ref={img} src={image.src} alt="image" height={image.height} width={image.width} style={{top}} /></div>
		{children}
	</div>
}

export default Parallax