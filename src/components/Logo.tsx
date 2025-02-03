import Image from 'next/image';
import styles from './scss/Logo.module.scss'
import type { FC } from "react";
import { logo } from '~/images';
// import icons from '~/icons'

const Logo: FC<{
	style?: 'large' | 'small',
	color?: 'gold' | 'blue'
}> = ( {style = 'large', color = 'gold'}) => {
	return <div className={styles.container}>
		{
			(Object.entries(logo) as [keyof typeof logo, ((typeof logo)[keyof typeof logo])][]).reduce((full, [size, value]) => {
				return full.concat(Object.entries(value).reduce((full, [theColor, {src, width, height}]) => {
					return full.concat(<Image 
						key={`${size}-${theColor}`}
						width={width} 
						height={height}
						className={`${styles.large}${style === size && theColor === color ? ` ${styles.show}` : ''}`} 
						src={src}
						alt={`logo-${size}-${theColor}`}
						
					/>)
				}, [] as JSX.Element[]))
			}, [] as JSX.Element[])
		}
		
	</div>
}

export default Logo