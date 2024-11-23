import React from 'react';
import Fader from './Fader';
import colin from '../images/Colin.jpeg';
import renita from '../images/Renita.jpeg';

export const Contact = (props) => {
	return (
		<Fader>
			<div id="contact">
				<div className="titleText">Contact</div>
				<div className="contact-wrapper">
					<div>
						<div className="contact-photo"> 
							<img alt="colin" src={colin} />
						</div>
						<div>
							<div>Colin Brennan: Developer</div>
							<div>Email: colin@sysvisionz.com</div>
						</div>
					</div>
				</div>
			</div>
		</Fader>
	);
}