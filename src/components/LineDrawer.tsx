'use client'
import { FC, ReactNode, useEffect, useState } from 'react'
import style from './scss/LineDrawer.module.scss'

type Directions = "up" | "down" | "left" | "right"

interface DirectionSet <D extends Directions = "up" | "down" | "left" | "right", F extends Exclude<Directions, D> = Exclude<Directions, D>, T extends Exclude<Directions, D extends "up" ? "down" : D extends "down" ? "up" : D extends "right" ? "left" : D extends "left" ? "right" : never> = Exclude<Directions, D extends "up" ? "down" : D extends "down" ? "up" : D extends "right" ? "left" : D extends "left" ? "right" : never>> {
	direction: D,
	from?: F,
	to?: T,
}

const LineDrawer: FC<{
	width: number,
	size: number,
	color?: string,
	delay?: number,
	className?: string
	position?: {x?: number, y?: number},
	duration?: number
} & DirectionSet> =({className, width, size = 3, color="#333", direction, from, to, delay = 0, position: {x = 0, y = 0} = {}, duration = width*2}) => {
	let content: ReactNode
	const [ready, setReady] = useState<boolean>(false)
	const border = [0, 0, 0, 0]
	if (from){
		switch (from){
			case "up":
				if (direction === "left"){
						border[2] = size
				} else if (direction === "right"){
						border[0] = size
				}
				break
			case "down":
				if (direction === "left"){
					border[3] = size
				} else if (direction === "right"){
					border[1] = size
				}
				break
			case "left":
				if (direction === "down"){
					border[0] = size
				} else if (direction === "up"){
					border[2] = size
				}
				break
			case "right":
				if (direction === "down"){
					border[0] = size
				} else if (direction === "up"){
					border[1] = size
				}
			break
		}
	}
	useEffect(() => {
		setTimeout(() => {
			setReady(true)
		}, delay)
	})
	return <div className={style.container} style={{width, height:size}}>
		<div className={`${style.hide} ${style[direction]}${ready ? '' : ` ${style.hidden}`}`} style={{transitionDuration: `${duration}ms`, top: -y, left: x}}>
			<hr className={`${style.line}${className ? ` ${className}` : ''}`} color={color} style={{width, height: size}}></hr>
		</div>
	</div>
}
export default LineDrawer