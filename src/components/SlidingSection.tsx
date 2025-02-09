'use client';
import { useState, useEffect, useRef, ReactElement, ReactNode } from "react";
import style from './scss/SlidingSection.module.scss';
import { classNamer, useDelay } from "~/shared/utils";
import Image from 'next/image';
function SlidingSection({children, className, image}: {children: ReactNode, className?: string, image?: {src: string, alt: string}}): ReactElement
function SlidingSection({children, className, image}: {children: ReactNode, className?: string, image?: {src: string, alt: string, height: number, width: number}}): ReactElement
function SlidingSection({children, className, image}: {children: ReactNode, className?: string, image?: {src: string, alt: string, fill: boolean}}): ReactElement
function SlidingSection({ children, className, image }: {children: ReactNode, className?: string, image?: {src: string, alt: string, height?: number, width?: number, fill?: boolean}}) {
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
	return <div ref={section} className={classNamer(style.section, show && style.show, className)}>
		<div className={`${style.content}${image ? ` ${style['with-image']}` : ''}`}>
			{image ? <div className={style.image}><Image src={image.src} alt={image.alt} {...(image.height ? {height: image.height, width: image.width} : image.fill !== undefined ? {fill: image.fill} : {fill: true})}/></div> : null}
			<div>{children}</div>
		</div>
	</div>
}

export default SlidingSection;