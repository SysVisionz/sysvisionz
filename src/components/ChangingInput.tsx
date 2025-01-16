import { ReactNode, useState } from "react";
// import {Checkbox} from './changingInput'


interface ChangingInputCore <T extends boolean | string | {value?: string, label: string}[] | string[]>{
	editing?: boolean,
	value: T,
	label?: string
	save: (value: T) => void
	className?: string,
	id?: string
}

function ChangingInput(props: {
	type?: 'text',
	expanding?: never
} & ChangingInputCore<string>): ReactNode
function ChangingInput(props: {
	type: 'radio'
	expanding?: never
} & ChangingInputCore<boolean>): ReactNode
function ChangingInput(props: {
	type: 'box',
	expanding?: boolean
} & ChangingInputCore<string>): ReactNode
function ChangingInput(props: {
	expanding?: never
	type?: 'checkbox',
} & ChangingInputCore<boolean>): ReactNode
function ChangingInput(props: {
	expanding?: never
	type: 'radio',
} & ChangingInputCore<boolean>): ReactNode
function ChangingInput({type, editing, value, label, save, className, id, expanding}: {type?: 'checkbox' | 'text' | 'box' | 'radio' | 'group' | 'multi', expanding?: boolean | never} & (ChangingInputCore<boolean> | ChangingInputCore<string>)){
	const theType = type || typeof value === 'boolean' ? 'checkbox' : expanding === undefined ? 'text' : 'box'
	const [val, setValue] = useState<string|boolean>(value)
	const Router: {
		[T in keyof typeof type]: ReactNode
	} = {
		// checkbox: Checkbox
	}
	console.log(editing, label, save, className, id, theType, val, setValue, Router)
	return <div></div>
}

export default ChangingInput