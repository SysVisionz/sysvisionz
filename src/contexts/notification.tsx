import { useContext, createContext, ReactNode, useMemo, useRef, useEffect, useState } from "react"

interface Notice {
	type: 'info' | 'warn' | 'error'
	visible: boolean
	value: string
	fadeDelay: number
	delete: () => {}
	action: IterableIterator<() => NodeJS.Timeout>
	next: () => void,
	id: number
}

type Notifications = {
	[Key in 'info' | 'warn' | 'error']: Notice[]
}

interface NotificationContext extends Notifications{
	push: {
		(info: string): void;
	} & {
		[type in 'error' | 'info' | 'warn']: (err: string) => void
	}
}

const notificationContext = createContext<NotificationContext>({
	info: [],
	warn: [],
	error: [],
	push: new Proxy<NotificationContext["push"]>({} as NotificationContext["push"], {
		apply: () => {},
		get: () => {}
	})
})

const NotificationProvider: FCWC = ({children}) => {
	class Notice {
		type: 'info' | 'warn' | 'error'
		visible: boolean = false;
		value: string
		fadeDelay: number
		id: number
		delete = () => {
			const i = notifications.current[this.type].findIndex(v => v === this as Notice)
		}
		constructor(type: 'info' | 'warn' | 'error', value: string, {
			fadeDelay = 400,
		} = {}){
			this.id = Math.floor(Math.pow(10, 6)* Math.random())
			this.value = value;
			this.type = type;
			this.visible= false
			this.fadeDelay = fadeDelay
			this.action.next();
		}

		action: IterableIterator<() => NodeJS.Timeout> = new Set<() => NodeJS.Timeout>([() => setTimeout(() => {
			this.next()
		}, 40), () => setTimeout(() => {
			this.visible = false
			this.next()
		}, this.value.length * 100),
			() => setTimeout(() => {
				this.delete()
			}, this.fadeDelay)
		]).values()

		next = this.action.next().value

	}
	const notifications = useRef<Notifications>({info: [], error: [], warn: []})
	const push = new Proxy<NotificationContext["push"]>((() => {}) as unknown as NotificationContext["push"], {
		apply: (t, thisArg, [info]) => {
			new Notice('info', info)
		}
	})
	return <notificationContext.Provider value={{...notifications.current, push}}>
		{children}
	</notificationContext.Provider>
}

export const useSiteNotify = () => useContext(notificationContext).push