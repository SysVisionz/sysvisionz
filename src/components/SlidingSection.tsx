'use client';
import { useState, useEffect, useRef, ReactElement, ReactNode } from "react";
import style from './scss/SlidingSection.module.scss';
import { classNamer, useDelay } from "~/shared/utils";
import Image from 'next/image';
function SlidingSection({children, className, image, title, mobile}: {children: ReactNode, title?: string, mobile?: string, className?: string, image?: {src: string, alt: string}}): ReactElement
function SlidingSection({children, className, image, title, mobile}: {children: ReactNode, title?: string, mobile?: string, className?: string, image?: {src: string, alt: string, height: number, width: number}}): ReactElement
function SlidingSection({children, className, image, title, mobile}: {children: ReactNode, title?: string, mobile?: string, className?: string, image?: {src: string, alt: string, fill: boolean}}): ReactElement
function SlidingSection({ children, className, image, title, mobile }: {children: ReactNode, title?: string, mobile?: string, className?: string, image?: {src: string, alt: string, height?: number, width?: number, fill?: boolean}}) {
	const section = useRef<HTMLDivElement>(null);
	const [show, setShow] = useState<boolean>(false);
	const lastTop = useRef<number>(0);
	const ResizeObserve = useRef<ResizeObserver>()
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
					if (!show && rect.bottom > 0 && rect.top < window.innerHeight - 200) {
						setShow(true);
					}
					else if (show && rect.top > window.innerHeight - 200 || rect.bottom < 0) {
						setShow(false);
					}
				}
				lastTop.current = window.scrollY
			}
		}
	}, 200)
	useEffect(() => {
		const rect = section.current?.getBoundingClientRect();
		if (rect!.top <= window.innerHeight - 200 && rect!.bottom >= 0) {
			setShow(true);
		}
		if (typeof window !== 'undefined') {
			window.addEventListener('scroll', inout)
			ResizeObserve.current = new ResizeObserver(inout)
			return () => window.removeEventListener('scroll', inout)
		}
	}, [inout])
	return <div ref={section} className={classNamer(style.section, show && style.show)}>
		<div className={classNamer(style.content, !!image && style['with-image'], className)}>
			{image ? <div className={style.image}><Image src={image.src} alt={image.alt} {...(image.height ? {height: image.height, width: image.width} : image.fill !== undefined ? {fill: image.fill} : {fill: true})}/></div> : null}
			{title ? <h2>{title}</h2> : null}
			<div {...(mobile ? {className: style.desktop} : {})}>{children}</div>
			{mobile ? <div className={style.mobile}>{mobile}</div> : null}
		</div>
	</div>
}

export default SlidingSection;