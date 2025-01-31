import styles from '~/scss/Footer.module.scss'
import Links from './Links'
import Socials from './Socials'
import Testimonials from './Testimonials'

const Footer = () => {
	return (
		<footer className={styles.footer}>
			<div className={styles.content} >
				<Links />
				<Socials />
				<Testimonials />
			</div>
			<div className={styles.attributions}>
				<span> &copy; 2025</span>
				<span>built with icons by <a href="https://www.flaticon.com/authors/riajulislam">riajulislam</a> and images by <a href="https://www.freepik.com/author/harryarts">harryarts</a> and <a href="https://www.freepik.com/author/pressfoto">pressfoto</a></span>
			</div>
		</footer>
	)
}

export default Footer