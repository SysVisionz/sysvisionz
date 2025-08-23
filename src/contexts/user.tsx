import { createContext, useState, useContext, useMemo } from "react"
import { useSiteNotify } from "./notification"

interface UserContext {
	user: User<'fe'>;
	login: (displayNameOrEmail: UserContext["user"]["displayName"] | UserContext["user"]["email"], pass?: string) => void
	logout: () => void;
}

export const userContext = createContext<UserContext>({
	user: {
		displayName:"",
		email: "",
		privLevel: null,
	},
	login: () => {},
	logout: () => {}
})


const UserContext: FCWC = ({children}) => {
	const [user, setUser] = useState<UserContext["user"]>({
		displayName: "",
		email: "",
		privLevel: null
	})
	const notify = useSiteNotify()
	const login = (displayNameOrEmail: UserContext["user"]["displayName"] | UserContext["user"]["email"], pass?: string ) => {
		fetch('/user', {
			method: 'POST',
			body: JSON.stringify({
				displayNameOrEmail,
				pass
			})
		}).then((ret) => ret.json().then((newUser: UserContext["user"]) => {
			if (newUser){
				notify.success(`Welcome, ${newUser.displayName || newUser.email}`)
				setUser(newUser)
			}
			else {
				notify.error(`Invalid user name or password.`)
			} 
		}))
	}
	const logout = () => {
		fetch('/user', {
			method: 'DELETE'
		}).then((ret) => ret.json().then((newUser: UserContext["user"]) => {
			if (newUser){
				notify.success(`Goodbye, ${newUser.displayName || newUser.email}`)
				setUser(newUser)
			}
			else {
				notify.error(`Invalid user name or password.`)
			} 
		}))
	}
	return <userContext.Provider value={{user, login, logout}}>
		{children}
	</userContext.Provider>
}

export default UserContext

export function useHasAtLeast <T extends any, P extends never>(privLevel: PrivLevel, callback: () => T): T | null
export function useHasAtLeast <T extends Boolean, P extends never>(privLevel: PrivLevel): T
export function useHasAtLeast <T extends Boolean, P extends PrivLevel>(privLevel: P[]): {[Priv in P]: Boolean}
export function useHasAtLeast <T extends any, P extends PrivLevel>(callbacks: {[Priv in P]: T}): {[Priv in P]: T | null}
export function useHasAtLeast <T extends any, P extends PrivLevel>(callbacks: {[Priv in P]: () => T}): {[Priv in P]: T | null}
export function useHasAtLeast <T extends Boolean | any = Boolean, P extends PrivLevel | never = never>(privLevelOrCallbacks: PrivLevel | {[Priv in P]: T}, callback?: () => T): T | {[Priv in P]: T | null} | Boolean | null {
	const {user} = useContext(userContext)
	const toNumber = (priv: PrivLevel | number) =>  typeof priv === 'number' ? priv : ['user', 'client', 'mod', 'admin', 'master'].indexOf(priv as PrivLevel)
	return useMemo(() => {
		if (typeof privLevelOrCallbacks === 'object'){
			if (Array.isArray(privLevelOrCallbacks)){
				return privLevelOrCallbacks.reduce((acc, priv) => {
					acc[priv] = user.privLevel && toNumber(user.privLevel) >= toNumber(priv) ? true : false
					return acc
				}, {} as {[Priv in P]: Boolean})
			}
			return (Object.keys(privLevelOrCallbacks) as P[]).reduce((acc, priv: P) => {
				acc[priv] = user.privLevel && toNumber(user.privLevel) >= toNumber(priv)
					? typeof (privLevelOrCallbacks as {[P in PrivLevel]?: () => T})[priv as PrivLevel] === 'function'
						? (privLevelOrCallbacks as {[P in PrivLevel]?: () => T})[priv as PrivLevel]?.() ?? null
						: (privLevelOrCallbacks as {[P in PrivLevel]?:T})[priv as PrivLevel] ?? null
					: null
				return acc
			}, {} as {[Priv in PrivLevel]: T | null})
		}
		if (callback){
			return user.privLevel && toNumber(user.privLevel) >= toNumber(privLevelOrCallbacks) ? callback() : null
		}
		return user.privLevel && toNumber(user.privLevel) >= toNumber(privLevelOrCallbacks)
	}, [user.privLevel])
}
