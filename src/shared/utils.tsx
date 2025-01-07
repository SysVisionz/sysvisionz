'use client'
import { useEffect, useRef } from "react"


export const useEffectDelay = ({triggers = [], delay = 500, onStart, onEnd}: {triggers?: unknown[], delay?: number, onStart?: () => void, onEnd?: ()=> void} = {}) => {
	const timeout = useRef<NodeJS.Timeout | null>(null)
	const onStartFunc = useRef<(() => void) | undefined>(onStart)
	const onEndFunc = useRef<(() => void) |undefined >(onEnd)
	const clearTrigger = useRef<[() => void, () => void]>([() => {}, () => {}])
	useEffect(() => {
		if (!timeout.current){
			clearTrigger.current[0] = onStartFunc.current?.() || clearTrigger.current[0]
			timeout.current = setTimeout(() => {
				clearTrigger.current[1] = onEndFunc.current?.() || clearTrigger.current[1]
				timeout.current = null;
			}, delay)
		}
		return () => {
			clearTrigger.current.forEach(v => {v()})
		}
	}, triggers)
	return {
		/** this will play at the start of the delay, and will not play again until the delay has completed and reset. */
		start: (callback: () => void) => {
			onStartFunc.current = callback
			return {
				/** this will play only at the end of the delay, not including any resets. */
				after: (callback: () => void): void => {
					onEndFunc.current = callback;
				}
			}
		},
		/** this will play only at the end of the delay, not including any resets. */
		end: (callback: () => void) => {
			onEndFunc.current = callback
			return {
				/** this will play at the start of the delay, and will not play again until the delay has completed and reset. */
				before: (callback: () => void): void => {
					onStartFunc.current = callback;
				}
			}
		}
	}
}

export const useDelay = <T extends unknown[] = []>({onStart, onEnd, delay = 500}: {onStart?: (...args: T) => void, onEnd?: (...args: T) => void, delay?: number} = {}) => {
	const timeout = useRef<NodeJS.Timeout | null>(null)
	const onStartFunc = useRef<((...args: T) => void) | undefined>(onStart);
	const onEndFunc = useRef<((...args: T) => void) | undefined>(onEnd);
	return (...args: T) => {
		console.log('running')
		if (!timeout.current){
			onStartFunc.current?.(...args)
			timeout.current = setTimeout(() => {
				onEndFunc.current?.(...args)
				timeout.current = null;
			}, delay)
		}
	}
}