import { ReactNode, RefObject, useEffect, useRef, useState } from "react";
import EditButtons from "./EditButtons";
import style from './scss/Input.module.scss'
import Icon from "./Icon";
// import {Checkbox} from './changingInput'


interface ChangingInputCore <T extends boolean | string | {value?: string, label: string}[] | string[] = string>{
	editing?: boolean,
	value?: T,
	label?: string
	save: (value: T) => void
	className?: string,
	id?: string
	previous?: T
}

function ChangingInput(props: {
	type?: 'text',
	expanding?: never
} & ChangingInputCore<string>): ReactNode
function ChangingInput(props: {
	type: 'textbox',
	expanding?: boolean
} & ChangingInputCore<string>): ReactNode
function ChangingInput(props: {
	expanding?: never
	type?: 'checkbox',
} & ChangingInputCore<boolean>): ReactNode
function ChangingInput({type = 'text', editing, previous, value = "", label, save, className, id, expanding}: {type?: 'checkbox' | 'text' | 'textbox', expanding?: boolean | never} & (ChangingInputCore<boolean> | ChangingInputCore<string>) = {type: 'text', value: '', save: () => {}, }){
	const [editingVal, setEditing] = useState(editing || false)
	const [val, setValue] = useState(value)
	const needsFocus = useRef(false)
	const Router: {
		[K in 'checkbox' | 'text' | 'textbox']: ReactNode
	} = {
		text: <input type="text" value={val as string} onChange={e => setValue(e.target.value)} />,
		checkbox: <input type="checkbox" checked={val as boolean} onChange={e => setValue(e.target.checked)} />,
		textbox: <textarea value={val as string} onChange={e => setValue(e.target.value)} />
	}
	const container = useRef<HTMLDivElement|HTMLFormElement>(null)
	const [isForm, setIsForm] = useState<boolean>()
	// console.log(isForm)
	useEffect(() => {
		const is = container.current?.closest('form')
		if (is !== container.current && isForm !== !!is) {setIsForm(!!is)}
	}, [ isForm])
	useEffect(() => {
		if (editingVal === true){
			const input = container.current?.querySelector('input') as HTMLInputElement
			const textarea = container.current?.querySelector('textarea') as HTMLTextAreaElement
			if (input){
				input.focus()
			} else if (textarea){
				textarea.focus()
			}
			needsFocus.current = false
		}
	}, [editingVal])
	const elem = <div id={id} className={`${style[type || 'text']}${className ? ` ${className}` : ''}${editing ? ` ${style.editing}` : ''}`}>{type !== "text" ? <div><span className={style.label}>{label}</span></div> : null}<div className={style.content}>{type === 'text' ? <span className={style.label}>{label}</span> : null}{
		editingVal 
		? Router[type || 
			typeof value === 'string' 
			? expanding ? 'textbox' : 'text'
			: 'checkbox']
		: typeof value === 'string' ? <p>{value}</p> : <Icon category="interfce" icon={value ? "checkboxCheck" : "checkboxUnchecked"} />
		}</div><div><EditButtons {...(!editingVal ? {
			edit: (evt) => {
				evt.preventDefault()
				setEditing(true)
			},
			...(previous ? {undo: () => setValue(previous)} : {})
		} : {
			save: () => {
				(save as (v: string) => void)(val as string)
				setEditing(false)
			},
			cancel: () => {
				setEditing(false)
				setValue(value)
			}
		})} /></div>
		</div>
	return isForm && !editingVal ? <div className={style.container} ref={container as RefObject<HTMLDivElement>}>{elem}</div> : <form className={style.container} onSubmit={ (evt) => {
		evt.preventDefault();
		(save as (v: string) => void)(val as string)
		setEditing(false)
	}} ref={container as RefObject<HTMLFormElement>}>{elem}</form>
}

export default ChangingInput