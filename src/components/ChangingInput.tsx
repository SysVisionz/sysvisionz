import { ReactNode, RefObject, useMemo, useRef, useState } from "react";
import Image from 'next/image';
import icons from "~/icons";
import EditButtons from "./EditButtons";
// import {Checkbox} from './changingInput'


interface ChangingInputCore <T extends boolean | string | {value?: string, label: string}[] | string[]>{
	editing?: boolean,
	value: T,
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
	type: 'box',
	expanding?: boolean
} & ChangingInputCore<string>): ReactNode
function ChangingInput(props: {
	expanding?: never
	type?: 'checkbox',
} & ChangingInputCore<boolean>): ReactNode
function ChangingInput({type, editing, previous, value, label, save, className, id, expanding}: {type?: 'checkbox' | 'text' | 'box', expanding?: boolean | never} & (ChangingInputCore<boolean> | ChangingInputCore<string>)){
	const [editingVal, setEditing] = useState(editing || false)
	const [val, setValue] = useState<string|boolean>(value)
	const Router: {
		[K in 'checkbox' | 'text' | 'box']: ReactNode
	} = {
		text: <input type="text" value={val as string} onChange={e => setValue(e.target.value)} />,
		checkbox: <input type="checkbox" checked={val as boolean} onChange={e => setValue(e.target.checked)} />,
		box: <textarea value={val as string} onChange={e => setValue(e.target.value)} />
	}
	const container = useRef<HTMLDivElement|HTMLFormElement>(null)
	const isForm = useMemo(() => {
		if (typeof window !== 'undefined'){
			return container.current?.closest('form') !== null
		}
	}, [typeof window])
	const elem = <><div><span>{label}</span></div><div>{
		editing 
		? Router[type || 
			typeof value === 'string' 
			? expanding ? 'box' : 'text'
			: 'checkbox']
		: typeof value === 'string' ? <p>{value}</p> : <Image alt={value?'checked' : 'unchecked'} src={value ? icons.interfce.checkboxCheck.src : icons.interfce.checkboxUnchecked.src} />
		}</div><div><EditButtons {...(editingVal ? {
			edit: () => {
				setEditing(true)
			},
			...(previous ? {undo: () => setValue(previous)} : {})
		} : {
			cancel: () => {
				setEditing(false)
				setValue(value)
			}
		})} /></div>
		</>
	return isForm ? <div ref={container as RefObject<HTMLDivElement>}>{elem}</div> : <form ref={container as RefObject<HTMLFormElement>}>{elem}</form>
}

export default ChangingInput