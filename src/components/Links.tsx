import styles from './scss/Links.module.scss'
import Button from './Button'
import Icon from './Icon';
import { classNamer } from '~/shared/FE';

const Links = ({className}: {className?: string}) => {
	return <div className={classNamer(styles.meet, className)}>
		<Button className={styles.schedule} navigate="meet.sysvisionz.com"><h4>Schedule a Meeting</h4></Button>
		<div className={styles.links}>
			<div><a target="_blank" href="tel:5417357873"><Icon category="communication" icon="phone"/><span>Call Us</span></a></div>
			<div><a target="_blank" href="mailto:contact@sysvisionz.com"><Icon category='communication' icon="mail" /><span>Email us</span></a></div>
		</div>
	</div>
}

export default Links;