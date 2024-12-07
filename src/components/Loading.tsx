'use client'
import { FC, useEffect, useRef, useState, ReactElement } from "react";

function Loading ({message, percent, at, onIsLoaded}: {message?: string, percent?: number, at?: {[percentage: number]: () => void}, onIsLoaded?: () => void}): ReactElement
function Loading ({message, at, time, onIsLoaded}: {message?: string, at?: {[percentage: number]: () => void}, onIsLoaded?: () => void, 
	/** time must be positive */
	time?: number}): ReactElement
function Loading ({onIsLoaded, message, percent, at = {}, time}: {message?: string, percent?: number, at?: {[percentage: number]: () => void}, time?: number, onIsLoaded?: () => void}): ReactElement {
	const [curr, setCurre] = useState<number>(percent ?? 0)
	const setCurr = (v: number) => {
		if (was.current){
			was.current[0] =  v;
		}
		setCurre(v)
	}
	const was = useRef<[number, number]>([curr, curr])
	const [prog, setProg] = useState<number>(curr)
	const timer = useRef<NodeJS.Timeout>()
	const timers = useRef<SetIterator<(() => NodeJS.Timeout)>>()
	const testingTimer = useRef<[NodeJS.Timeout, number]>()
	useEffect(() => {
		testingTimer.current = [setInterval(() => {
			if (testingTimer.current){
				testingTimer.current[1] += 50;
			}
		}, 50), 0]
		if (time){
			if ( time < 50 ){
				setProg(100)
			}
			else if (time < 500){
				setCurr(time);
			}
			else {
				const theTimers = new Set<(() => NodeJS.Timeout)>()
				let total = 0;	
				for (let i = 0; i < 5 && total < time - 500; i++){
					const t = 50 + Math.floor(time/3 * Math.random())
					total += t
					theTimers.add(() => setTimeout(() => {
						const v = curr + t;
						setCurr( v > time ? time : v)
						timers.current?.next().value?.()
					}, t))
				}
				theTimers.add(() => setTimeout(() => {
					setCurr(time)
				}, time - total))
				timers.current = theTimers.values()
				let i = timers.current.next().value
				i?.()
			}
		}
	}, [])
	useEffect(() => {
		if (prog < curr){
			const newProg = prog + (curr - prog)/1.35
			for (const i in at){
				if (Number(i) > was.current[1] && Number(i) <= newProg){
					at[i]()
				}
			}
			if (was.current[1] !== time && newProg === time){
				console.log(testingTimer.current?.[1])
				onIsLoaded?.()
			}
			was.current[1] = newProg
			console.log(was.current)
			clearTimeout(timer.current)
			timer.current = setTimeout(() => setProg( curr - newProg < (curr - was.current[0])/20 ? curr : newProg), 50)
		}
	}, [curr, prog])
	useEffect(() => {
		if (percent){
			setCurr(percent)
		}
	}, [percent])
	return (
		<div>
			{message && <p>{message}</p>}
			<progress value={prog} max={time && time > 50 ? time : 100} />
		</div>
	)
}

export default Loading