import { ReactNode, FC, useRef, useState, useEffect } from "react";
import style from './scss/ExpandingList.module.scss'
import { classNamer, random } from "~/shared/utils";
import EditButtons from "./EditButtons";
import Button from "./Button";

const Entry: FC<{className?: string, value: string, box?: boolean, 
	save?: (v: string) => void, 
	edit?: () => void, 
	delete?: () => void
	cancel?: () => void,
	duplicate?: () => void,
	undo?: () => void
}> = ({className, value, box, save, edit, delete: del, duplicate, cancel, undo }) => {
	return <div className={className}>
		{box ? <textarea value={value}/> : <input type="text" value={value} />}

		<EditButtons {...{delete: del, save, edit, duplicate, cancel, undo}} />
	</div>
}

export default function ExpandingList(props: {
	id: string,
	label?: string,
	list: string[],
	box: true,
	onChange: (v: string[]) => void
}): ReactNode
export default function ExpandingList(props: {
	id: string,
	label?: string,
	list: string[],
	box?: false,
	onChange: (v: string[]) => void
}): ReactNode
export default function ExpandingList({list, label, onChange, box}: {
	id: string,
	label?: string,
	list: string[],
	box?: boolean,
	onChange: (v: string[]) => void
}){
	const initialState = useRef<{[id: string]: string}>({})
	const [
		/** {id: [value, editing, visible ]} */
		listVals
	, setListVals] = useState<{[id: string]: [string, boolean, boolean]}>({})
	const timeouts = useRef<{[id: string]: number}>({})
	const countdown = useRef<NodeJS.Timeout | null>(null)
	const update = () => {
		onChange(Object.keys(listVals).reduce((list: string[], id: string) => {
			if (listVals[id][2]){
				list.push(listVals[id][0])
			}
			return list
		}, []))
	}
	const add = (value?: string) => {
		listVals[random()] = [value || '', true, true]
		setListVals(listVals)
	}
	const remove = (id: string) => {
		listVals[id][2] = false
		setListVals(listVals)
		timeouts.current[id] = 400;
		update()
		if (!countdown.current){
			countdown.current = setInterval(() => {
				for (const i in timeouts.current){
					timeouts.current[i] -= 40;
					if (timeouts.current[i] <= 0){
						delete timeouts.current[i]
						delete listVals[i]
					}
					if (Object.keys(timeouts.current).length === 0){
						clearInterval(countdown.current as NodeJS.Timeout)
						countdown.current = null
					}
				}
			}, 40)
		}
	}
	const edit = (id: string, active: boolean = !!listVals[id]?.[1]) => {
		if (![undefined, active].includes(listVals[id]?.[1])){
			listVals[id][1] = active
			setListVals(listVals)
		}
	}
	const save = (id: string, value: string) => {
		listVals[id][0] = value
		listVals[id][1] = false
		setListVals(listVals)
		update()
	}
	useEffect(() => {
		for (const i in list){
			const id = random()
			listVals[id] = [list[i], false, true]
			initialState.current[id] = list[i]
		}
	}, [])

	return <div className={style.container}>
		<h3>{label}</h3>
		{Object.entries(listVals).map(([id, [value, editing, visible]]) => <Entry 
			className={classNamer(style.entry, !visible && style.hide)}
			value={value}
			box={box}
			key={id}
			{...(editing ? {
				save: (v: string) => save(id, v),
				cancel: () => edit(id),
				duplicate: () => add(value),
				...(initialState.current[id] === value ? {} : {undo: () => save(id, initialState.current[id])})
			} : {
				delete: () => remove(id),
				edit: () => edit(id)
			})}
		/>)}
		<Button onClick={() => add()}>+ New Entry</Button>
	</div>
}