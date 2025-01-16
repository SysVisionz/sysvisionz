'use client'
import Loading from "./Loading";
import { useEffect, useState } from "react";
import style from "./scss/LoadOverlay.module.scss";

const LoadOverlay = () => {
	const [loaded, setLoaded] = useState<boolean[]>([false])
	const [current, setCurrent] = useState(0)
	const at = {
		100: () => {
			loaded[0] = true;
			setLoaded([...loaded])
		}
	}
	useEffect(() => {
		setCurrent(100)
		let total = 100;
		const timers = Array(4).fill(0).map((_, i) => {
			const step = Math.random() * total / (5 - i)
			total -= step;
			return step;
		}).map((step, i) => {
			return () => setTimeout(() => {
				setCurrent((current) => {
					if (current + step >= 100) {
						return 100;
					}
					return current + step;
				})
				timers[i + 1]()
			}, 100/step * 1000)
		})
		timers.push(() => setTimeout(() => {
			setCurrent(100)
		}, 100/total * 1000))
	}, [])
	return (
		<div className={`${style.overlay}${loaded.every(v => v) ? ` ${style.hidden}` : ''}`}>
			<Loading percent={current} at={at} />
		</div>
	)
}

export default LoadOverlay;