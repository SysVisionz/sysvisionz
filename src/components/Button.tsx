import { cloneElement, FC, MouseEventHandler, ReactElement } from "react"
import style from './scss/Button.module.scss'
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Button: FC<{navigate?: string, children: string | number | ReactElement<any, any>, onClick?: MouseEventHandler<HTMLButtonElement>}> = ({children, onClick, navigate}) => {
	let theChildren =['string', 'number'].includes(typeof children) 
		? <div>{children as string|number}</div>
// eslint-disable-next-line @typescript-eslint/no-explicit-any
		: children as ReactElement<any, any>
	theChildren = cloneElement(theChildren, {className: `${style.content} ${theChildren.props.className || ''}`})
	const button = <button className={style.button} onClick={onClick}>{theChildren}</button>
	return navigate ? <a href={`${navigate.match(/\.(com|net|org|io)(\/*|)$/) ? 'https://' : ''}${navigate}`}>{button}</a> : button
}

export default Button