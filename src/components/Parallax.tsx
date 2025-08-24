'use client'
import Image from 'next/image'
import { useEffect, useRef, useState } from "react";
import { useDelay } from "~/shared/utils";
import style from './scss/Parallax.module.scss'
const Parallax: FCWC<{image: Image}> = ({image, children}) => {
	const [top, setTop] = useState<number>(0)
	const [isReady, setReady] = useState<boolean>(false)
	const resizer = useRef<ResizeObserver>()
	const timeout = useRef<NodeJS.Timeout>()
	const max = useRef<number>(0)
	const readyTimeout = useRef<NodeJS.Timeout>()
	const getTarget = () => {
		return -Math.floor((document.body.clientHeight - (img.current?.clientHeight || 0)) * (document.body.scrollTop / (document.body.scrollHeight - document.body.clientHeight))) + document.body.clientHeight - (img.current?.clientHeight || 0)
	}
	const adjustTop = () => {
		if (typeof window !== 'undefined'){
			const getCloser = () => {
				clearTimeout(timeout.current)
				const top = parseInt(img.current?.style.top || '0')
				const diff = getTarget() - top
				if (Math.abs(diff) > 3 && isReady){
					// console.log(top + diff * .1)
					setTop(top + diff * .5)
					timeout.current = setTimeout(getCloser, 40)
				} else {
					setTop(getTarget())
				}
			}
			getCloser()
		}
	}
	const img = useRef<HTMLImageElement>(null)
	const adjust = useDelay({"onStart": adjustTop, onEnd: adjustTop}, 40)
	const ready = () => {
		adjust()
		clearTimeout(readyTimeout.current)
		readyTimeout.current = setTimeout(() => {
			setReady(true)
		}, 40)
	}
	useEffect(() => {
		max.current = document.body.clientHeight * (document.body.clientHeight / (img.current?.clientHeight || 0)) - document.body.clientHeight
		const imag = img.current;
	  if (!isReady){
		if (imag?.complete) {
			ready()
		}
		else{
			imag?.addEventListener('load', ready)
		}
	}
		resizer.current = new ResizeObserver(() => {
			max.current = -(document.body.clientHeight * (document.body.clientHeight / (img.current?.clientHeight || 0)) - document.body.clientHeight)
			adjust()
		})
		document.body.addEventListener('scroll', adjust)
	  return () => {
		document.body.removeEventListener('scroll', adjust)
		resizer.current?.disconnect()
		imag?.removeEventListener('load', ready)
		}
	}, [isReady])
	return <div className={`${style.content}${isReady ? ` ${style.ready}` : ''}`}>
		<div className={style['dev-img']}><Image ref={img} src={image.src} alt="image" height={image.height} width={image.width} style={{top}} /></div>
		{children}
	</div>
}

export default Parallax