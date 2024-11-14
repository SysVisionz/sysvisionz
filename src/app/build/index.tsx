"use client"
import {build, rocket} from '~/images';

export const Build = (props) => {
	return (
			<div id="build">
				<div className="titleText">Realizing Your Vision</div>
				<div className="imageBoxer">
					<div className="flexImg">
						<img alt="build" src={build}  />
					</div>
					<div>
						<p>We are dedicated, first and foremost, to hearing you; what you see, what you need, and what your vision for your software or website is.</p>
						<img alt="build" src={build} className="smImg leftImg" onLoad={() => props.itemLoaded} />
						<p>We don't build a tacked on copy of every other business site you've seen before. We tailor it to you, every time.</p>
						<p>Our work comes with a money-back guarantee, and a six month technical warranty; if you encounter bugs or imperfections in your site, we will fix it, free of charge. We have that much confidence in our work; made right, the first time.</p>
					</div>
				</div>
				<div className="imageBoxer" >
					<div>
						<p>If that's not convincing enough, keep in mind that we're willing to work with you on what platform you want your site made in.</p> 
						<img alt="rocket" src={rocket} className="smImg rightImg" />
						<p>Have some new bells and whistles you dreamed up? We'll make it happen.</p>
						<p>Want a mobile app to go along with your site? We're on it.</p>
						<p>Need someone to set up your server for you? We can do it.</p>
						<p>Want to host your own email? Done and done.</p>
					</div>
					<div className="flexImg"> 
						<img alt="rocket" src={rocket}  />
					</div>
				</div>
				<div>
					<p>With SysVisionz, you can rest easy knowing you get what you pay for, and then some.</p>
					<div className="button" onClick={props.returnToTop}><Link to='/contact'>Become a Client</Link></div>
				</div>
			</div>
	)
}