import { createContext, useRef, useEffect, useState, useContext } from "react"
import { useSiteNotify } from "./notification"
import { useDelay } from "~/shared/utils"

interface UserContext {
	user: {
		displayName: string,
		email: "" | `${string}@${string}.${string}`,
		privLevel: PrivLevel | null
	}
	loginError?: string
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
	const wait = useRef<NodeJS.Timeout>()
	const [loginError, setTheLoginError] = useState<UserContext["loginError"]>()
	useEffect(() => {
		fetch('/user').then(user => user.json().then(user => {
			user && setUser(user)
		}))
	}, [])
	const setLoginError = (error:string) => useDelay({onStart: () => {
		if (!wait){
			setTimeout
		}
		setTheLoginError(undefined)
	}, delay: 2000})
	const login = (displayNameOrEmail: UserContext["user"]["displayName"] | UserContext["user"]["email"], pass?: string ) => {
		fetch('/user', {
			method: 'POST',
			body: JSON.stringify({
				displayNameOrEmail,
				pass
			})
		}).then((ret) => ret.json().then((newUser: UserContext["user"]) => {
			if (newUser){
				useSiteNotify().success(`Welcome, ${newUser.displayName || newUser.email}`)
				setUser(newUser)
			}
			else {
				setLoginError(`Invalid user name or password.`)

			} 
		}))
	}
	return <userContext.Provider value={{user, login, loginError}}>
		{children}
	</userContext.Provider>
}

export const useHasAtLeast = (privLevel: PrivLevel, callback: () => void) => {
	const {user} = useContext(userContext)
	return user.privLevel && user.privLevel >= privLevel ? callback ? callback() : true : false
}