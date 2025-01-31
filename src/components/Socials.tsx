import {socials} from '~/images'
import style from './scss/Socials.module.scss'
import Image from 'next/image'
const Socials = () => {
	return (
		<div className={style.socials}>
			<div>
				<a href="https://www.linkedin.com/company/sysvisionz">
					<Image src={socials.linkedin.src} height={25} width={25} alt="linkedin" />
					LinkedIn
				</a>
			</div>
		</div>
	)
}

export default Socials