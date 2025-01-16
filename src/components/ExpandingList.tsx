import { ReactNode, useEffect, useRef, useState } from "react";
import style from './scss/ExpandingList.module.scss'

export default function ExpandingList(props: {
	id: string,
	list: string[],
	box: true,
	onChange: (v: string[]) => void
}): ReactNode
export default function ExpandingList(props: {
	id: string,
	list: string[],
	box?: false,
	onChange: (v: string[]) => void
}): ReactNode
export default function ExpandingList({id, list, onChange, box}: {
	id: string,
	list: string[],
	box?: boolean,
	onChange: (v: string[]) => void
}){
	const [listVals, setListVals] = useState<[string, number, boolean][]>(list.map((v: string, i: number) => [v, i, true]))
	const [editing, setEditing] = useState<number | null>(null)
	const timeouts = useRef<[NodeJS.Timeout, number][]>([])
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
		
	}
	console.log(edit, id, box, editing, add, notEditing, remove)
	useEffect(() => {
		// onChange(listVals.reduce((list: (string|number|boolean)[], v: [string | number | boolean, boolean]) => {
		// 	const [value, active] = v;
		// 	if (active){
		// 		list = [...list, value]
		// 	}
		// 	return list
		// }, [] as string | boolean)[]) as string[] | boolean[])
	}, [listVals])
	return <div className={style.container}>
		
	</div>
}