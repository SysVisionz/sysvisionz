import styles from './scss/Links.module.scss'
import Button from './Button'

const Links = () => {
	return <div className={styles.meet}>
		<Button navigate="meet.sysvisionz.com"><h2>Schedule a Meeting</h2></Button>
		<div className={styles.links}>
			Call us at <a href="tel:5417357873">(541) 735-7873</a><br/>
			Email us at <a href="mailto:contact@sysvisionz.com">contact@sysvisionz.com</a>
		</div>
	</div>
}

export default Links;