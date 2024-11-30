import { FC, ReactNode } from "react"
import style from './scss/Button.module.scss'
const Button: FC<{navigate?: string, children: ReactNode, onClick?: () => void}> = ({children, onClick, navigate}) => {
	const button = <button className={style.button} onClick={onClick}>{children}</button>
	return navigate ? <a href={`${navigate.match(/\.(com|net|org|io)(\/*|)$/) ? 'https://' : ''}${navigate}`}>{button}</a> : button
}

export default Button