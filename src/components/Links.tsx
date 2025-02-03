import styles from './scss/Links.module.scss'
import Button from './Button'
import Icon from './Icon';

const Links = () => {
	return <div className={styles.meet}>
		<Button navigate="meet.sysvisionz.com"><h2>Schedule a Meeting</h2></Button>
		<div className={styles.links}>
			<span>Call Us: <a target="_blank" href="tel:5417357873"><Icon category="communication" icon="phone"/></a></span>
			<span>Email us: <a target="_blank" href="mailto:contact@sysvisionz.com"><Icon category='communication' icon="mail" /></a></span>
		</div>
	</div>
}

export default Links;