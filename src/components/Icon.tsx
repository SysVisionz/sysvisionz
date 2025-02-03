import icons, {Icons} from "~/icons"
import Image from "next/image"
import stylef from './scss/Icon.module.scss'
import { useState } from "react"

const Icon = <T extends keyof Icons, I extends keyof Icons[T]>({category, icon, size, ...props}: {category: T, icon: I, size?: 'large' | 'small' |'medium'| 'tiny', height?: number, width?: number, alt?: string}) => {
	const theIcon = icons[category][icon] as SVGItem
	let {alt = `${category} ${icon as string}`} = props
	const height = props.height || {large: 48, small: 32, medium: 40, tiny: 24}[size || 'medium'] || 40
	const width = props.width || {large: 48, small: 32, medium: 40, tiny: 24}[size || 'medium'] || 40
	return <Image className={stylef.icon} src={theIcon.src} height={height} width={width} alt={alt} />
}

export default Icon