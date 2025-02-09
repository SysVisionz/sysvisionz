import { FC, MouseEventHandler, ReactElement, ReactNode, useEffect, useState } from "react"
import style from './scss/EditButtons.module.scss'
import Tooltip from "./Tooltip"
import IconButton from "./IconButton";
import Button from "./Button";

type ObjectStyle = {onClick: MouseEventHandler<HTMLButtonElement>, content?: ReactNode}
type Button = 'edit' | 'delete' | 'duplicate' | 'cancel' | 'undo'

const EditButtons: FC<{[K in Button]?: ObjectStyle["onClick"] | ObjectStyle} & {className?: string, id?: string}> = ({ id, className, ...props}) => {
	const [buttons, setButtons] = useState<JSX.Element[]>([])
	useEffect(() => {
		setButtons(() => {
			const theButtons: JSX.Element[] = []
			const icons = {
				edit: {category: 'edit', icon: 'pencil01'},
				save: {category: 'interfce', icon: 'check'},
				delete: {category: 'interfce', icon: 'trashFull'},
				duplicate: {category: 'edit', icon: 'copy'},
				undo: {category: 'edit', icon: 'undo'},
				cancel: {category: 'edit', icon: 'closeCircle'}
			} as const
			for (const i in props){
				if (props[i as Button]){
					const b = i as Button;
					let content
					if (typeof props[i as keyof typeof props] === 'function') {
						const {icon, category} = icons[b]
						content = category === 'interfce' 
							? <IconButton category={category} icon={icon} onClick={props[b] as ObjectStyle["onClick"]}/>
							: <IconButton category={category} icon={icon} onClick={props[b] as ObjectStyle["onClick"]}/>
					}
					else {
						content = <Button onClick={(evt) => (props[b] as ObjectStyle)?.onClick?.(evt)}>{(props[b] as ObjectStyle).content as ReactElement}</Button>
					}
					theButtons.push(<Tooltip key={b} tooltip={`${b[0].toUpperCase()}${b.substring(1)}`}>{content}</Tooltip>)
				}
			}
			return theButtons
		})
	}, [props, props.cancel, props.delete, props.duplicate, props.edit, props.undo])
	return <div className={[style.container, id || '', className || ''].join(' ')}>
		{buttons}
	</div>
}

export default EditButtons