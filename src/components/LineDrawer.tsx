'use client'
import { FC, ReactNode, useEffect, useState } from 'react'
import style from './scss/LineDrawer.module.scss'
const LineDrawer: FC<{
	width: number,
	size: number,
	color?: string,
	delay?: number,
	direction: 'up' | 'down' | 'left' | 'right',
	position?: {x?: number, y?: number},
	duration?: number
}> = ({width, size = 3, color="#333", direction, delay = 0, position: {x = 0, y = 0} = {}, duration = width*2}) => {
	let content: ReactNode
	const [ready, setReady] = useState<boolean>(false)
	useEffect(() => {
		setTimeout(() => {
			setReady(true)
		}, delay)
	})
	return <div className={style.container} style={{width, height:size}}>
		<div className={`${style.hide} ${style[direction]}${ready ? '' : ` ${style.hidden}`}`} style={{transitionDuration: `${duration}ms`, top: -y, left: x}}>
			<hr className={style.line} color={color} style={{width, height: size}}></hr>
		</div>
	</div>
}
export default LineDrawer