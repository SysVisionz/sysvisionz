'use client'
import { FC, useEffect, useRef, useState, ReactElement, ReactNode, LegacyRef } from "react";
import style from './scss/Loading.module.scss'

function Loading ({message, percent, at, onIsLoaded, className}: {message?: string, percent?: number, at?: {[percentage: number]: () => void}, className?: string | {
	/** class name for the containing element */
	container?: string,
	/** class name for the full bar element */
	bar?: string,
	/** class name for the progress bar element */
	progress?: string
}, onIsLoaded?: () => void}): ReactElement
function Loading ({message, at, delay, onIsLoaded, className}: {message?: string, at?: {[percentage: number]: () => void}, className?: string | {
	/** class name for the containing element */
	container?: string,
	/** class name for the full bar element */
	bar?: string,
	/** class name for the progress bar element */
	progress?: string
}, onIsLoaded?: () => void, 
	/** delay must be positive */
	delay?: number}): ReactElement
function Loading ({message, className, at, ...args }: {message?: string, percent?: number, at?: {[percentage: number]: () => void}, delay?: number, className?: string | {
	/** class name for the containing element */
	container?: string,
	/** class name for the full bar element */
	bar?: string,
	/** class name for the progress bar element */
	progress?: string
}, onIsLoaded?: () => void}): ReactElement {
	const was = useRef<`${number}%`>(args.delay ? '0%' : `${args.percent as number}%`)
	const container = useRef<HTMLDivElement>(null)
	const {container: cName, container: contain, progress} = typeof className === 'object' ? className : {container: className}
	const percent = useLoadStyle(args.delay || `${args.percent}%` as `${number}%`)
	const timers = useRef<NodeJS.Timeout[]>([])
	useEffect(() => {
		for (const i in at){
			if (i <= percent && i > was.current){
				timers.current.push(setTimeout(()=> {
					at[Number(i)]()
				}, 160))
			}
		}
		was.current = percent
	}, [percent])
	return (
	<div className={cName}>
		{message && <p>{message}</p>}
		<div ref={container} className={style.container} >
			<div className={style.bar} style={{width: percent}}></div>
		</div>
	</div>
	)
}

const useLoadStyle = (val: number | `${number}%`): `${number}%` => {
	const [percent, setPercent] = useState<`${number}%`>(typeof val === 'string' ? val : `0%`)
	const timers = useRef< (() => NodeJS.Timeout)[] >(Array(5))
	useEffect(() => {
		if (typeof val === 'string') {
			setPercent(val)
		}
		else {
		// TODO: finish this later, dude. There's no reason you need to do this right now, it's so far from MVP	
		}
	}, [val])
	return percent;
}

export default Loading