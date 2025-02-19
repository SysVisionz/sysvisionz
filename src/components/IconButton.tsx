import { MouseEventHandler } from "react"
import style from './scss/IconButton.module.scss'
import Icon from "~/Icon"
import { Icons } from "~/icons"
 
const IconButton = <T extends keyof Icons, I extends keyof Icons[T]>({onClick, navigate, category, icon, ...props}: {navigate?: string, onClick?: MouseEventHandler<HTMLButtonElement>, category: T, icon: I} & Omit<Parameters<typeof Icon>[0], 'icon' | 'category'>) => {
	const button = <button className={style.button} onClick={(evt) => onClick?.(evt)}><Icon category={category} icon={icon} {...props}/></button>
	return navigate ? <a href={`${navigate.match(/\.(com|net|org|io)(\/*|)$/) ? 'https://' : ''}${navigate}`}>{button}</a> : button
}

export default IconButton