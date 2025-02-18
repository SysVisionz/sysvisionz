import style from './scss/Socials.module.scss'
import Icon from './Icon'
import { FC } from 'react'
import { classNamer } from '~/shared/utils'
const Socials: FC<{className?: string}> = ({className}) => {
	return (
		<div className={classNamer(style.socials, className)}>
			<div>
				<a href="https://www.linkedin.com/company/sysvisionz">
					<Icon category='social' icon="linkedin" />
				</a>
				<a href="tel:5417357873"><Icon category='communication' icon='phone' /></a>
				<a href="mailto:contact@sysvisionz.com"><Icon category='communication' icon="mail" /></a>
			</div>
		</div>
	)
}

export default Socials