import { ReactNode, useEffect, useRef, useState } from "react";
import style from './scss/ExpandingList.module.scss'

export default function ExpandingList(props: {
	id: string,
	label?: string,
	list: string[],
	box: true,
	onChange: (v: (string|number|boolean)[]) => void
}): ReactNode;
export default function ExpandingList(props: {
	id: string,
	label?: string,
	list: string[],
	box?: false,
	onChange: (v: (string|number|boolean)[]) => void
}): ReactNode;
export default function ExpandingList({list,onChange}: {
	id: string,
	label?: string,
	list: string[],
	box?: boolean,
	onChange: (v: (string|number|boolean)[]) => void
}){
	const [
		/** listVals is a list containing each entry with a series consisting of the value, current id, and whether it's been deleted. */
		listVals
	, setListVals] = useState<[string, number, boolean][]>(list.map((v: string, i: number) => [v, i, true]))
	const [editing, setEditing] = useState<number | null>(null)
	const timeouts = useRef<[NodeJS.Timeout, number][]>([])
	console.log(editing)
	const add = () => {
		setEditing(listVals.length)
		setListVals(listVals.concat([['', listVals[listVals.length - 1][1] + 1, true]]))
	}
	const notEditing = (v: [string | boolean, boolean] ) => {
		const [value, active] = v;
		return <div className={`${style.input}${active ? ` ${style.active}` : '' }`}>
			<div><span>{value}</span></div><div></div></div>
	}
	const remove = (i: number) => {
		const act = timeouts.current.findIndex(v => v[1] === i)
		if (act){
			clearTimeout(timeouts.current[act][0])
			delete timeouts.current[act]
		}
		listVals[i][2] = false
		setListVals([...listVals])
		timeouts.current.push([setTimeout(() => {
			listVals.splice(i, 1)
		}, 400), listVals[i][1]])
	}
	const edit = (v: string, i: number) => {
		console.log(v, i)
	}
	console.log(edit, remove, notEditing, add)
	useEffect(() => {
		const newList = (listVals as [string|number|boolean, number, boolean][]).reduce((list: (string|number|boolean)[], [value, index, active]: [string | number | boolean, number, boolean]) => {
			if (active){
				list[index] = value
			}
			return list
		}, [] as (string | number | boolean)[])
		onChange(newList)
	}, [listVals])
	return <div className={style.container}>
		
	</div>
}