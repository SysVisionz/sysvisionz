'use client'
import { useEffect, useRef, useState } from "react"


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
	return useEffect(() => {
		let time = timeout.current
		if (!time){
			onStart?.()
			time = setTimeout(() => {
				onEnd?.()
				time = null;
			}, delay)
		}
		else if (resets){
			clearTimeout(time)
			time = setTimeout(() => {
				onEnd?.()
				time = null;
			})
		}
	}, [...triggers, delay, onEnd, onStart, resets])
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
	useEffect(() => {
		onStartFunc.current = onStart
		onEndFunc.current = onEnd
	}, [onStart, onEnd])
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

export const classNamer = (...args: (string | undefined | false | null)[]) => args.filter(v => v).join(' ')

type SearchObject<T> = T & {toSearchString: () => string}

export const useSearch = <T extends {[key: string]: string | number | boolean} = {[key: string]: string | number | boolean}>(): SearchObject<T> => {
	const [search, setSearch] = useState<SearchObject<T>>({} as SearchObject<T>)
	useEffect(() => {
		if (typeof window !== 'undefined'){
			setSearch(() => {
				const s: SearchObject<T>  = location.search.slice(1).split('&').reduce((obj: SearchObject<T>, v) => {
					const [key, value] = v.split('=').map(decodeURIComponent)
					obj[key as keyof SearchObject<T>] = (!isNaN(Number(value)) ? Number(value)
						: value === 'true' ? true
						: value === 'false' ? false
						: value) as SearchObject<T>[keyof SearchObject<T>]
					return obj
				}, {} as SearchObject<T>)
				s.toSearchString = () => `?${Object.entries(s).map(v => `${encodeURIComponent(v[0])}=${encodeURIComponent(v[1].toString())}`).join('&')}`
				return s
			})
		}
	}, [])
	return search
}

export const random = (min: number = 0, max: number = 1000) => Math.floor(Math.random() * (max - min) + min)
export const isDiff = (...values: ([number, number] | number)[]) => {
	const range = values.find(v => typeof v === 'number') || 5
	values.every((v) => typeof v !== 'object' || Math.abs(v[0] - v[1]) > range)
}