import icons, {Icons} from "~/icons"
import Image from "next/image"

const Icon = <T extends keyof Icons, I extends keyof Icons[T]>({category, icon, ...props}: {category: T, icon: I, height?: number, width?: number, alt?: string}) => {
	const theIcon = icons[category][icon] as SVGItem
	const {height = theIcon.height, width = theIcon.width, alt = `${category} ${icon as string}`} = props
	return <Image src={theIcon.src} height={height} width={width} alt={alt} />
}

export default Icon