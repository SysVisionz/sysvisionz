import Image from 'next/image';
import styles from './scss/Logo.module.scss'
import { useEffect, useState, type FC } from "react";
import { logo } from '~/images';
// import icons from '~/icons'

const Logo: FC<{
	color?: 'gold' | 'blue'
}> = ( settings ) => {
	const [theColor, setColor] = useState<Required<typeof settings.color>>()
	useEffect(() => {
		const {color= "blue"} = settings
		setColor(color)
	}, [settings.color])
	return <div className={styles.container}>
		{
			(Object.entries(logo) as [keyof typeof logo, ((typeof logo)[keyof typeof logo])][]).reduce((full, [color, {src, width, height}]) => {
					return full.concat(<Image 
						key={`logo-${color}`}
						width={width} 
						height={height}
						className={`${styles.large}${color === theColor ? ` ${styles.show}` : ` ${styles.hide}`}`} 
						src={src}
						alt={`logo-${color}`}
						
					/>)
				}, [] as JSX.Element[])
		}
		
	</div>
}

export default Logo