import Image from 'next/image';
import styles from './scss/Logo.module.scss'
import { type FC, useRef } from "react";
import { logo } from '~/images';

const Logo: FC<{
	style?: 'large' | 'small',
	color?: 'gold' | 'blue'
}> = ( {style = 'large', color = 'blue'}) => {
	const lg = useRef<HTMLImageElement>(null)
	const sm = useRef<HTMLImageElement>(null)

	return <div className={styles.container}>
		<Image ref={lg} className={`${styles.large}${style === 'large' ? ` ${styles.show}` : ''}`} src={logo.large[color].src} alt="logo-lg" />
		<Image ref={sm} className={`${styles.small}${style === 'small' ? ` ${styles.show}` : ''}`} src={logo.small[color].src} alt="logo-sm" />
	</div>
}

export default Logo