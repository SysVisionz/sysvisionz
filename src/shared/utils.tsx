'use client'
import { useEffect, useRef } from "react"


export const useEffectDelay = (triggers: any[] = [], delay: number = 500) => {
	const timeout = useRef<NodeJS.Timeout | null>(null)
	const onStart = useRef<() => void>()
	const onEnd = useRef<() => void>()
	useEffect(() => {
		if (!timeout.current){
			onStart.current?.()
			timeout.current = setTimeout(() => {
				onEnd.current?.()
				timeout.current = null;
			}, delay)
		}
	}, triggers)
	return {
		/** this will play at the start of the delay, and will not play again until the delay has completed and reset. */
		start: (callback: () => void) => {
			onStart.current = callback
			return {
				/** this will play only at the end of the delay, not including any resets. */
				after: (callback: () => void): void => {
					onEnd.current = callback;
				}
			}
		},
		/** this will play only at the end of the delay, not including any resets. */
		after: (callback: () => void) => {
			onEnd.current = callback
			return {
				/** this will play at the start of the delay, and will not play again until the delay has completed and reset. */
				before: (callback: () => void): void => {
					onStart.current = callback;
				}
			}
		}
	}
}