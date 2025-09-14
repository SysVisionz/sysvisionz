import { cloneElement, FC, MouseEventHandler, ReactElement } from "react"
import style from './scss/Button.module.scss'
import { classNamer } from "~/shared/FE"
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Button: FC<{navigate?: string, children: string | number | ReactElement<any, any>, onClick?: MouseEventHandler<HTMLButtonElement>, className?: string}> = ({className, children, onClick, navigate}) => {
	let theChildren =['string', 'number'].includes(typeof children) 
		? <div>{children as string|number}</div>
// eslint-disable-next-line @typescript-eslint/no-explicit-any
		: children as ReactElement<any, any>
	theChildren = cloneElement(theChildren, {className: `${style.content} ${theChildren.props.className || ''}`})
	const button = <button className={classNamer(style.button, !navigate && className)} onClick={onClick}>{theChildren}</button>
	return navigate ? <a className={className} href={`${navigate.match(/\.(com|net|org|io)(\/*|)$/) ? 'https://' : ''}${navigate}`}>{button}</a> : button
}

export default Button