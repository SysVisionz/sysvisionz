'use client';
import { FC } from "react"
import Links from "~/Links"
import SlidingSection from "~/SlidingSection"
import style from './Services.module.scss'
import { fe, fs, be, mentor, consult, letsGo} from "~/images";

const Services: FC = () => <>
	<SlidingSection
		image={{src: fe.src, alt: 'services'}}
	>
		<h2>Frontend Development</h2>
		<p>We provide development services that focus on both fixing issues within your current application front-ends and building them from the ground up. Our areas of expertise include PHP, HTMX, ReactJS, SCSS or building highly performant sites in root Javascript, CSS, and HTML. Whether your solution requires an update to existing code, a rescuscitation of a broken code base, or you&apos;re starting fresh, we ensure smooth, responsive, and modern user interfaces with a focus on performance, perfected user experience, and flawless search engine optimization that will put you at the top of the game.</p>
	</SlidingSection><SlidingSection
		image={{
			src: be.src,
			alt: 'backend'
		}}
	>
		<h2>Backend Services</h2>
		<p>Our experienced developers can also provide excellent backends for your existing or greenfield applications as well. We specialize in solutions built with NodeJS or GoLang supported by MongoDB or SQL databases. Whether you need us to optimize, rescue, or create your backend systems, we build scalable architectures that ensure secure, efficient, and reliable systems that provide every system the smoothest data handling and fastest performance around.</p>
	</SlidingSection><SlidingSection
		image={{src: fs.src, alt: 'full stack'}}
	>
		<h2>Full Stack Services</h2>
		<p>Not only do we provide these services individually, we also deliver cohesive full-stack service. Both the client-side experience and the server-side architecture will be seamlessly integrated for optimal functionality and performance, giving your company the best applications available.</p>
	</SlidingSection><SlidingSection 
		image={{
			src: mentor.src,
			alt: 'mentorship'
		}}
	>
		<h2>Mentorship</h2>
		<p>Additionally, the innovative methodologies our team uses to provide consistently top-tier applications and growth mindset on our teams allows us to offer the service of working alongside your team to help your developers grow. For new and midlevel developers, we offer personalized guidance to navigate the evolving tech landscape and guarantee consistent delivery of the best development in the business. For seniors, we build leadership and development skills, expanding their technical expertise. Our mentorship builds proficient and confident developers, equipped to make your company flourish.</p>
	</SlidingSection><SlidingSection
		image={{src: consult.src, alt: 'consulting'}}
	>
		<h2>Consulting</h2>
		<p>Our consulting services offer expert guidance on software architecture, tooling, and optimization. We provide direction on both implementation and strategy for improving performance, scalability, maintainability, as well as marketing and SEO strategies to maximize your project&apos;s ROI. We ensure that you know how to deliver on your business goals consistently and with confidence.</p>
	</SlidingSection><SlidingSection
		image={{src: letsGo.src, alt: 'let\'s go!'}} className={style.interested}
	>
		<h4>Interested? Good. Let&apos;s get  you on the path to your company&apos;s best future, today.</h4>
		<Links />
	</SlidingSection>
</>
	

export default Services