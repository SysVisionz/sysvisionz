'use client'
import { useEffect, useState, useRef, type FC } from 'react';
import Image from 'next/image';
import style from '~/scss/Testimonials.module.scss';

type Testimonial = {image?: string, title?: string, text: string, name: string}

const Testimonials: FC<{defaultTestimonials?: Testimonial[]}> = ({defaultTestimonials}) => {
	const timer = useRef<NodeJS.Timeout>()
	const [current, setCurrent] = useState<number>(0)
	const [testimonials, setTestimonials] = useState<Testimonial[]> ([])
	useEffect(() => {
		fetch('/api/testimonials').then(res => res.json().then((data: Testimonial[]) => {
			if (data && data.length) {
				setTestimonials(data)
			}
			else {
				setTestimonials(defaultTestimonials || [])
			}
		}).catch(err => Promise.reject(err))).catch(() => {console.warn("failed to retrieve testimonials")})
		timer.current = setTimeout(() => {
			setCurrent((current + 1) % testimonials.length)
		})
		return () => {
			clearTimeout(timer.current)
		}
	}, [])
	return testimonials.length ? <div className={style.container}>{testimonials.map(({image, text, name, title}, i) => {
		return <div key={`${name}-${i}`} className={`${style.testimonial}${i === current ? ' show' : ''}`}>
			{image && <Image src={image} alt={name} fill={true} />}
			<p>{text}</p>
			<p>{`${name}${title ? `, ${title}` : ''}`}</p>
		</div>
	})}</div> : <></>
}

export default Testimonials