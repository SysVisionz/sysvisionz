import styles from './scss/Logo.module.scss'
import { useEffectDelay } from "~/shared/utils";
import { type FC, useEffect, useRef, useState } from "react";
import { logo } from '~/images';

const Logo: FC<{
	style?: 'large' | 'small',
	color?: 'gold' | 'blue'
}> = ( {style = 'large', color = 'blue'}) => {
	const [theStyle, setStyle] = useState(style)
	useEffectDelay([typeof window !== 'undefined' && window.scrollY <= 70], 100).start(() => {
		!style && window.scrollY <= 70 
			? theStyle === 'small' && setStyle('large')
			: theStyle === 'large' && setStyle('small')

	})
	const lg = useRef<HTMLImageElement>(null)
	const sm = useRef<HTMLImageElement>(null)

	return <div className={styles.container}>
		<img ref={lg} className={`${styles.large}${theStyle === 'large' ? styles.show : ''}`} src={logo.large[color].src} alt="logo-lg" />
		<img ref={sm} className={`${styles.small}${theStyle === 'large' ? styles.show : ''}`} src={logo.small[color].src} alt="logo-sm" />
	</div>
}

export default Logo