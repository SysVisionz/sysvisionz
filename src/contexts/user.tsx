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
	},
	login: () => {},
	logout: () => {}
})


const UserContext: FCWC = ({children}) => {
	const [user, setUser] = useState<UserContext["user"]>({
		displayName: "",
		email: "",
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
