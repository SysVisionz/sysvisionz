import { createContext, useState, useContext } from "react"
import { useSiteNotify } from "./notification"

interface UserContext {
	user: {
		displayName: string,
		email: "" | `${string}@${string}.${string}`,
		privLevel: PrivLevel | null
	}
	login: (displayNameOrEmail: UserContext["user"]["displayName"] | UserContext["user"]["email"], pass?: string) => void
}

export const userContext = createContext<UserContext>({
	user: {
		displayName:"",
		email: "",
		privLevel: null,
	},
	login: () => {}
})


const NotificationProvider: FCWC = ({children}) => {
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
	return <userContext.Provider value={{user, login}}>
		{children}
	</userContext.Provider>
}

export default NotificationProvider

export function useHasAtLeast (privLevel: PrivLevel, callback: () => boolean): boolean
export function useHasAtLeast (privLevel: {[Priv in PrivLevel]?: () => boolean}): boolean
export function useHasAtLeast (privLevel: PrivLevel | {[Priv in PrivLevel]?: () => boolean}, callback?: () => boolean): boolean {
	const {user: {privLevel: userPriv}} = useContext(userContext)
	if (!userPriv){
		return false;
	}
	if (typeof privLevel === 'string'){
		return userPriv && userPriv >= privLevel ? callback ? callback() : true : false
	}
	return privLevel[userPriv]?.() || false
}
