'use client'
import { createContext, ReactNode, useEffect, useRef, useState } from 'react'
import { useDelay } from '~/shared/utils'

interface SiteContext {
	theme: 'dark' | 'light'
	setTheme: (theme: SiteContext['theme']) => void
	breakpoint: 'mobile' | 'tablet' | 'desktop'
	ready: boolean
}

export const siteContext = createContext<SiteContext>({
	theme: 'light',
	setTheme: () => {},
	breakpoint: 'desktop',
	ready: false
})

const SiteProvider = ({children}: {children: ReactNode}) => {
	const theme = useRef<SiteContext['theme']>('light')
	const [breakpoint, setBreakpointTo] = useState<SiteContext['breakpoint']>('desktop')
	const ready = useRef<[Element, (elem: Element) => boolean][]>([])
	const setFunc = () => {
		if (window.innerWidth < 769 && breakpoint !== 'mobile'){
			setBreakpointTo('mobile')
		} else if (window.innerWidth < 1025 && breakpoint !== 'tablet'){
			setBreakpointTo('tablet')
		} else if (breakpoint !== 'desktop'){
			setBreakpointTo('desktop')
		}
	}
	const setBreakpoint = useDelay({onStart: setFunc, onEnd: setFunc})
	const rObserv = useRef<ResizeObserver>()
	useEffect(() => {
		if (!rObserv.current){
			rObserv.current = new ResizeObserver(setBreakpoint)
		}
		setBreakpoint()
		rObserv.current?.observe(document.getElementById('main')!)
		return () => rObserv.current?.unobserve(document.getElementById('main')!)
	}, [])
	const setTheme = (theTheme: SiteContext['theme']) => {
		theme.current = theTheme
	}
	return <siteContext.Provider value={{theme: theme.current, setTheme, breakpoint, ready: ready.current.length === 0}}>
		{children}
	</siteContext.Provider>
}

export default SiteProvider