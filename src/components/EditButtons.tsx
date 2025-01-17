import { FC, MouseEventHandler, ReactNode, useState } from "react"
import style from './scss/EditButtons.module.scss'
import Button from "./Button"
import icons from "../icons"
import Tooltip from "./Tooltip"

type ObjectStyle = {onClick: MouseEventHandler<HTMLButtonElement>, content?: ReactNode}
type Button = 'edit' | 'delete' | 'duplicate' | 'cancel' | 'undo'

const EditButtons: FC<{[K in Button]?: ObjectStyle["onClick"] | ObjectStyle} & {className?: string, id?: string}> = ({ id, className, ...props}) => {
	const [buttons, setButtons] = useState<{[K in Button]?: ObjectStyle["onClick"]}>({})
	const icon = {
		edit: icons.edit.pencil01,
		delete: icons.interfce.trashFull,
		duplicate: icons.edit.copy,
		undo: icons.edit.undo,
		cancel: icons.edit.closeCircle
	}
	for (const i in props){
		if (props[i as keyof typeof props]){
			const theButtons: {[K in Button]?: ObjectStyle}  = {}
			if (typeof props[i as keyof typeof props] === 'function') {
				theButtons[i as Button] = {
					onClick: props[i as keyof typeof props] as MouseEventHandler<HTMLButtonElement>, 
				}
			}
			if (!(props[i as keyof typeof props] as ObjectStyle)!.content){
				(props[i as keyof typeof props] as ObjectStyle)!.content = icon[i as keyof typeof icon].src
			}
		}
	}
	console.log(buttons, setButtons)
	return <div className={[style.container, id || '', className || ''].join(' ')}>
		{(Object.keys(props) as ['edit', 'delete', 'duplicate', 'undo', 'cancel']).reduce((buttons: ReactNode[], button: keyof typeof props ) => {
			return props[button] ? buttons.concat(<Tooltip tooltip={`${button[0].toUpperCase}${button.substring(1)}`}><Button onClick={typeof props[button] === 'object' ? props[button].onClick : undefined}>{typeof props[button] === 'object' ? props[button].content : undefined}</Button></Tooltip>) : buttons
		}, [] as ReactNode[])}
	</div>
}

export default EditButtons