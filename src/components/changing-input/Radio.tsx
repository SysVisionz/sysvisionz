import Image from "next/image"
import { ChangeEvent, Dispatch, FC, SetStateAction } from "react"
import icons from "~/icons"

const Radio: FC<{value: boolean, label: string, onChange?: (evt: ChangeEvent & {target: ChangeEvent["target"] & {checked: boolean}}) => void, editing?: boolean, className?: string, id?: string}> = ({value, onChange, editing}) => {
	return <div></div>
	// return <><span>{label}:</span>{editing ? <input type="radio" value={value} onChange={onChange} /> : <Image src={ value ? icons.interfce.checkboxCheck. : icons.interfce.checkboxUnchecked} /> />}</>
}

export default Radio