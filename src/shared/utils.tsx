'use client'
import { useEffect, useRef } from "react"


type UseEffectDelayParameters = {
	onStart?: () => void,
	onEnd?: ()=> void,
	resets?: boolean,
	delay?: number
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const cleanObject = <T extends object >(object: T, test?: (val: any) => boolean) => Object.keys(object).reduce((newObj: Partial<T>, key: string) => {
		if (test ? test(object[key as keyof T]) : object[key as keyof T] !== undefined){
			newObj[key as keyof T] = object[key as keyof T]
		}
		return newObj
}, {})

export const makeHeaders = (headers: {[key: string]: string|number|boolean}) => new Headers(Object.keys(headers).map(v => [v, String(headers[v])]))

export function useEffectDelay (parameters: UseEffectDelayParameters, 
// eslint-disable-next-line @typescript-eslint/no-explicit-any
triggers: any[]): void
export function useEffectDelay (func: () => void, 
// eslint-disable-next-line @typescript-eslint/no-explicit-any
triggers: any[]): void
export function useEffectDelay (funcOrParameters: UseEffectDelayParameters | (() => void),
// eslint-disable-next-line @typescript-eslint/no-explicit-any
triggers: any[]) {
	const timeout = useRef<NodeJS.Timeout | null>(null)
	const {onStart, onEnd, resets, delay = 100} = typeof funcOrParameters === 'function' ? {onStart: funcOrParameters} : funcOrParameters
	useEffect(() => {
		
		if (!timeout.current){
			onStart?.()
			timeout.current = setTimeout(() => {
				onEnd?.()
				timeout.current = null;
			}, delay)			
		}
		else if (resets){
			clearTimeout(timeout.current)
			timeout.current = setTimeout(() => {
				onEnd?.()
				timeout.current = null;
			})
		}
	}, triggers)
}

export function useDelay
<
// eslint-disable-next-line @typescript-eslint/no-explicit-any
T extends any[] = [], 
S extends (...args: T) => void = (...args: T) => void,
E extends (...args: T) => void = S
> (parameters: {onStart?: S, onEnd?: E, resets?: boolean, rerunOnStart?: false }, delay?: number): S
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useDelay
<
// eslint-disable-next-line @typescript-eslint/no-explicit-any
T extends any[] = [], 
S extends (...args: T) => void = (...args: T) => void,
E extends (...args: T) => void = S
> (parameters: {onStart: S, onEnd?: E, resets?: boolean, rerunOnStart: true}, delay?: number): S
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useDelay<T extends any[] = [],
S extends (...args: T) => void = (...args: T) => void
>(onStart: S, delay?: number): S
export function useDelay <
// eslint-disable-next-line @typescript-eslint/no-explicit-any
T extends any[] = [],
S extends (...args: T) => void = (...args: T) => void,
E extends (...args: T) => void = S>(parametersOrFunc: {onStart?: S, onEnd?: E, resets?: boolean, rerunOnStart?: boolean} | S, delay: number = 100){
	const {onStart, onEnd, resets, rerunOnStart} = typeof parametersOrFunc === 'function' ? {onStart: parametersOrFunc} : parametersOrFunc
	const timeout = useRef<NodeJS.Timeout | null>(null)
	const onStartFunc = useRef<((...args: T) => void) | undefined>(onStart);
	const onEndFunc = useRef<((...args: T) => void) | undefined>(onEnd);
	return (...args: T) => {
		if (!timeout.current){
			onStartFunc.current?.(...args)
			timeout.current = setTimeout(() => {
				onEndFunc.current?.(...args)
				timeout.current = null;
			}, delay)
		}
		else if (resets){
			clearTimeout(timeout.current)
			if (rerunOnStart){
				onStart?.(...args)
			}
			timeout.current = setTimeout(() => {
				onEndFunc.current?.(...args)
				timeout.current = null;
			}, delay)
		}
	}
}