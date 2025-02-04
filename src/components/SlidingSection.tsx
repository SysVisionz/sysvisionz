'use client';
import { useState, useEffect, useRef } from "react";
import style from './scss/SlidingSection.module.scss';
import { classNamer, useDelay } from "~/shared/utils";
const SlidingSection: FCWC<{left?: boolean, className?: string}> = ({ children, left, className }) => {
	const section = useRef<HTMLDivElement>(null);
	const [show, setShow] = useState<boolean>(false);
	const lastTop = useRef<number>(0);
	const inout = useDelay({
		onEnd: () => {
			const rect = section.current?.getBoundingClientRect();
			if (typeof window !== 'undefined' && rect){
				if (lastTop.current < window.scrollY) {
					// scrolling down
					if (show && rect.bottom < 200 || rect.top > window.innerHeight - 180) {
						setShow(false);
					}
					else if (!show && rect.top < window.innerHeight - 180 && rect.bottom > 200) {
						setShow(true);
					}
				}
				else if (lastTop.current > window.scrollY) {
					// scrolling up
					if (!show && rect.bottom > 60 && rect.top < window.innerHeight - 250) {
						setShow(true);
					}
					else if (show && rect.top > window.innerHeight - 250 || rect.bottom < 60) {
						setShow(false);
					}
				}
				lastTop.current = window.scrollY
			}
		}
	}, 200)
	useEffect(() => {
		const rect = section.current?.getBoundingClientRect();
		if (rect!.top < window.innerHeight - 180 && rect!.bottom > 60) {
			setShow(true);
		}
		if (typeof window !== 'undefined') {
			window.addEventListener('scroll', inout)
			return () => window.removeEventListener('scroll', inout)
		}
	}, [inout])
	return <div ref={section} className={classNamer(style.section, left && style.left, show && style.show, className)}><div className={style.content}>{children}</div></div>
}

export default SlidingSection;