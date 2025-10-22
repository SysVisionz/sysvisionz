import { FC, useContext, useRef, useState } from "react";
import Button from "./Button";
import style from "./scss/Login.module.scss";
import { classNamer } from "~/shared/FE";
import { notificationContext } from "~/contexts/notification";
import ExpandaBox from "./ExpandaBox";

const Login: FC = () => {
	const [open, setOpen] = useState<boolean>(false);
	const u= useRef<HTMLInputElement>(null);
	const {push} = useContext(notificationContext);
	const button = useRef<HTMLButtonElement>(null)
	const loginBox = useRef<HTMLDivElement>(null)
	const close =(e: MouseEvent) => {
		e.stopPropagation();
		if (e.target && !loginBox.current?.contains?.(e.target as Node)) {
			document.body.removeEventListener('click', close);
			setOpen(false);
		}
	}
	  return <div className={style.login}>
		<Button ref={button} className={`${style.button}${open ? ` ${style.open}` : ''}`} onClick={() => {
			if (!open){
				setOpen(true);
				if (u.current){
					u.current.focus();
				}
				if (typeof window !== 'undefined'){
					document.body.addEventListener('click', close)
				}
			}
		}}>Login</Button>
		<ExpandaBox className={style["login-box"]} ref={loginBox} min={{width: button.current?.clientWidth}} open= {open}>
			<form onSubmit={(e) => {
				e.preventDefault();
				fetch('/api/login', {
					method: 'POST',
					body: JSON.stringify({username: u.current?.value, password: u.current?.value}),
					headers: {
						'Content-Type': 'application/json'
					}
				}).then((res) => res.json().then((data) => {
					if (data.success){
						setOpen(false);
					}
				})).catch((err) => {
					push.error(err.message)
				})
			}}>
				<input type="text" ref={u} placeholder="Username" />
				<input type="password" placeholder="Password" />
				<button type="submit">Login</button>
			</form>
	  	</ExpandaBox>
	</div>
}
export default Login; 