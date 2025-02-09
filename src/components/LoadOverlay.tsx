'use client'
import Loading from "./Loading";
import { FC, useEffect, useState } from "react";
import style from "./scss/LoadOverlay.module.scss";

const LoadOverlay: FC<{timer?: number}> = ({timer = 1000}) => {
	const [loaded, setLoaded] = useState<boolean[]>([false])
	const [current, setCurrent] = useState(0)
	const at = {
		100: () => {
			loaded[0] = true;
			setLoaded([...loaded])
		}
	}
	useEffect(() => {
		setCurrent(0)
		let total = timer;
		const timers = Array(4).fill(0).map((_, i) => {
			const step = Math.random() * total / (5 - i)
			total -= step;
			return step;
		}).map((step, i) => {
			return () => setTimeout(() => {
				setCurrent(c => c+step)
				timers[i + 1]()
			}, step/100 * timer)
		}).concat(() => setTimeout(() => {
			setCurrent(100)
		}, total/100 * timer))
		timers[0]()
	}, [timer])
	return (
		<div className={`${style.overlay}${loaded.every(v => v) ? ` ${style.hidden}` : ''}`}>
			<Loading percent={current} at={at} />
		</div>
	)
}

export default LoadOverlay;