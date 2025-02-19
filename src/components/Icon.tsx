import icons, {Icons} from "~/icons"
import Image from "next/image"
import style from './scss/Icon.module.scss'
import { ReactNode } from "react"

function Icon<T extends keyof Icons, I extends keyof Icons[T]>({category, icon, ...props}: {category: T, icon: I, size: 'large' | 'small' |'medium'| 'tiny', alt?: string}): ReactNode
function Icon<T extends keyof Icons, I extends keyof Icons[T]>({category, icon, ...props}: {category: T, icon: I, fill: true, alt?: string}): ReactNode
function Icon<T extends keyof Icons, I extends keyof Icons[T]>({category, icon, ...props}: {category: T, icon: I, height: number, width: number, alt?: string}): ReactNode
function Icon<T extends keyof Icons, I extends keyof Icons[T]>({category, icon, ...props}: {category: T, icon: I}): ReactNode
function Icon<T extends keyof Icons, I extends keyof Icons[T]>({category, icon, ...props}: {category: T, icon: I, size?: 'large' | 'small' |'medium'| 'tiny', fill?: boolean, height?: number, width?: number, alt?: string}) {
	const theIcon = icons[category][icon] as SVGItem
	const {height, width, size, fill, alt = `${category} ${icon as string}`} = props
	return <div className={style.icon}><Image className={style.icon} src={theIcon.src} {...{
		...(height ? {height, width}: size ? {height: {large: 48, small: 32, medium: 40, tiny: 24}[size], width: {large: 48, small: 32, medium: 40, tiny: 24}[size]} : fill ? {fill} : {fill: true})
	 }} alt={alt} /></div>
}

export default Icon