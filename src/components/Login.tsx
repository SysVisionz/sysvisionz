import { FC, use, useRef, useState } from "react";
import Button from "./Button";
import style from "./scss/Login.module.scss";
import { classNamer } from "~/shared/utils";

const Login: FC = () => {
	const [open, setOpen] = useState<boolean>(false);
	const u= useRef<HTMLInputElement>(null);
	const contain = useRef<HTMLDivElement>(null);
	const close =(e: MouseEvent) => {
		e.stopPropagation();
		document.body.removeEventListener('click', close);
		if (contain.current && !contain.current.contains(e.target as Node)){
			setOpen(false);
		}
	}
	  return <div>
		<Button onClick={() => {
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
		<div className={classNamer(style["login-box"], !open && style.hidden)} ref={contain}>
			<h1>Login</h1>
			<form>
			<input type="text" ref={u} placeholder="Username" />
			<input type="password" placeholder="Password" />
			<button type="submit" onClick={(e) => {
				e.preventDefault();
				fetch('/api/login', {
					method: 'POST',
					body: JSON.stringify({username: u.current?.value, password: u.current?.value}),
					headers: {
						'Content-Type': 'application/json'
					}
				}).then((res) => res.json().then((data) => {
					if (data.success){
						setOpen
					}
				})).catch((err) => {
					
				})
			}}>Login</button>
			</form>
	  	</div>
	</div>
}
export default Login; 