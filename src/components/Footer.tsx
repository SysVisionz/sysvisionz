import styles from '~/scss/Footer.module.scss'
import Links from './Links'

const Footer = () => {
	return (
		<footer className={styles.footer}>
			<div className={styles.content} >
				<Links />
				<div className={styles.socials}></div>
				<div className={styles.testimonials}></div>
			</div>
		</footer>
	)
}

export default Footer