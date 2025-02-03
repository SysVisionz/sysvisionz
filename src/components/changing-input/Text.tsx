import { FC, useState } from "react";


const Text: FC<{value?: string, editing?: boolean}> = ({value = '', editing = false} = {}) => {
	const [editingVal, setEditing] = useState<boolean>(editing)
	const [val, setVal] = useState<string>(value)
	console.log(editingVal, val, setVal, setEditing)
	return editing ? <input value={value} /> : <p>{value}</p>
}

export default Text