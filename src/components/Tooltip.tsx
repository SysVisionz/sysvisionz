'use client';
import { type ReactNode, type FC, useRef, useEffect, useState } from "react";
import style from './scss/Tooltip.module.scss'

type TooltipProps = {
	children: React.ReactNode;
	tooltip: ReactNode;
	className?: string;
}
 
const Tooltip: FC<TooltipProps> = ({
	children,
	tooltip,
	className
}) => {
	const intersect = useRef<IntersectionObserver>()
	const [active, setActive] = useState<[boolean,boolean]>([false, false])
	const [orientation, setOrientation] = useState<{x: string, y: string}>()
	console.log(setOrientation)
	useEffect(() => {
		if (!intersect.current){
			intersect.current = new IntersectionObserver((entries) => {
				console.log(entries)
			})
		}
		if (content.current){
			intersect.current.observe(content.current)
			const [con, int] = [content.current, intersect.current]
			return () => {
				if (con) int.unobserve(con)
			}
		}
	}, [])
	const content = useRef<HTMLDivElement>(null)
	const {x = style.right, y = style.down} = orientation || {};
	const classVal = [style.tooltip, active && 'is-active', x, y,  className].filter(a => a).join(' ')
	 return (
		<div className={classVal} onMouseOver={() => {setActive([true, active[1]])}} onMouseOut={() => {setActive([false, active[1]])}}>
			{children}
			<div className={style.content} ref={content} onMouseOver={() => {setActive([active[0], true])}} onMouseOut={() => {setActive([active[0], false])}}>
				{tooltip}
			</div>
		</div>
	);
}
export default Tooltip;