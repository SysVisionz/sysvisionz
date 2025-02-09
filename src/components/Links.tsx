import styles from './scss/Links.module.scss'
import Button from './Button'
import Icon from './Icon';
import { classNamer } from '~/shared/utils';

const Links = ({className}: {className?: string}) => {
	return <div className={classNamer(styles.meet, className)}>
		<Button className={styles.schedule} navigate="meet.sysvisionz.com"><h2>Schedule a Meeting</h2></Button>
		<div className={styles.links}>
			<div><span>Call Us: </span><a target="_blank" href="tel:5417357873"><Icon category="communication" icon="phone"/></a></div>
			<div><span>Email us: </span><a target="_blank" href="mailto:contact@sysvisionz.com"><Icon category='communication' icon="mail" /></a></div>
		</div>
	</div>
}

export default Links;