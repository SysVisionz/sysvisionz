'use client';
import { FC } from "react"
import Links from "~/Links"
import SlidingSection from "~/SlidingSection"

const Services: FC = () => (<>
		<SlidingSection><h1>Services</h1>
		<p>Our team is ready to help you with your business needs at a moment&apos;s notice. We provide a variety of services
		for you to optimize your business and ensure that you are always ahead of the curve. Our services include:</p>
		</SlidingSection>,
		<SlidingSection left={true}>
			<h2>Web Services:</h2>
		<p>We provide development services that focus on both fixing issues within your current application frontends and building frontends for your greenfield applications. Our front-end expertise includes working with PHP, HTMX, ReactJS, SCSS or simply constructing highly performant sites in root Javascript, CSS, and HTML. Whether your solution requires an update to its existing code, a rescuscitation of a broken code base, or you&apos;re starting fresh, we ensure smooth, responsive, and modern user interfaces with a focus on performance and perfected user experience, not to mention flawless search engine optimization that will put you at the top of the game.</p>
		</SlidingSection>,
		<SlidingSection><h2>Backend Services:</h2>
		<p>Our experienced developers can also provide excellent backends for your existing or greenfield applications as well. We specialize in solutions built with NodeJS or GoLang supported by MongoDB or SQL databases. Whether you need us to optimize, rescue, or create your backend systems, we provide scalable architectures that ensure secure, efficient, and reliable systems that provide every system the smoothest data handling and fastest performance around.</p>
		</SlidingSection>,
		<SlidingSection left={true}><h2>Full Stack Services:</h2>
		<p>Not only do we provide these services individually, we also deliver cohesive, well-rounded full-stack applications as well. We ensure that both the client-side experience and the server-side architecture are seamlessly integrated for optimal functionality and performance that gives your company the best software available.</p>
		</SlidingSection>,
		<SlidingSection><h2>Mentorship:</h2>
		<p>Additionally, the innovative methodologies our team uses that provides optimal delivery and consistently top-tier applications, as well as a long-time policy of prioritization mentorship and growth on our teams has resulted in our offering the additional service of working alongside your existing team in a format designed to help your developers grow, no matter where they are in their career. For new and midlevel developers, we offer personalized career guidance to help them grow and navigate the evolving tech landscape and ensure long term, consistent delivery of the best development in the business. For senior developers, we provide instructional support to build their abilities  leadership development, and guide them in scaling their technical expertise. Whether individually or as part of a team, our mentorship helps developers become more proficient and confident.</p>
		</SlidingSection>,
		<SlidingSection  left={true}><h2>Consulting:</h2>
		<p>Our consulting services offer expert guidance on software architecture, tooling, and optimization. We provide direction on both implementation and strategy for improving performance, scalability, maintainability, as well as marketing and SEO strategies to maximize your project&apos;s ROI. We ensure that you know how to deliver on your business goals consistently and with confidence.</p>
		</SlidingSection>,
		<SlidingSection><h4>Interested? Good. Let&apos;s get  you on the path to your company&apos;s best future, today.</h4>
		<Links />
		</SlidingSection></>)
	

export default Services