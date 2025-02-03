import { ReactNode } from "react"

function Checkbox(props: {label: string}): ReactNode
function Checkbox(props: {label: string}){
	console.log(props)
	return <div></div>
}

export default Checkbox