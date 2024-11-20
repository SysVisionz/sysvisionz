import type { FC, ReactElement, ReactNode } from 'react'
import style from './scss/Layout.module.scss'

const Layout: FC<{children: ReactNode | ReactElement[]}> = ({children}) => {
	const content = Array.isArray(children) ? children.map((v: ReactElement, i) => <div key={v.key || i} className={style.content}>{v}</div>) : children
	return <div className={style.layout}>
		{content}
	</div>
}

export default Layout