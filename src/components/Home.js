import React from 'react';
import Fader from './Fader';
import logo from '../images/largeLogo.png';
import inspire from '../images/inspire.png';
import presenting from '../images/presenting.png';
import mirror from '../images/presentingMirror.png';
//import hurray from '../images/hurray.png';

export const Home = (props) => {
	return (
		<Fader>
			<div id="homeWrapper" >
				<div>
					<img src={logo} alt="SysVisionz" style={{width: '40%', display: 'block', marginLeft: 'auto', marginRight: 'auto'}} />
					<div className='titleText'>Little Company. Big Vision.</div>
				</div>
				<div>
					<div className='titleText'>Hello there, {props.name ? props.name : 'Stranger'}! <br/>Let's get started. </div>
					<div className="imageBoxer">
						<div className="flexImg">
							<img alt="inspire" src={inspire}  />
						</div>
						<div>
							<p>We're here to realize your vision.</p>
							<img alt="inspire" src={inspire} className="smImg leftImg" />
							<p>Whether you want something big, something small, a passion project, a work utility, we make it.</p>
							<p>We are dedicated, and always approach each product with the loving care and attention it deserves.</p>
							<p>Just a few of the services we offer:</p>
						</div>
					</div>
					<div id="midWrapper" className="imageBoxer">
						<div className="flexImg list" >
							<img alt="presenting" src={presenting} className="rightImg presenting"/>
						</div>
						<div id="midList">
							<img alt="presenting" src={mirror} className="smImg"  />
							<ul>
								<p>Web Design</p>
								<p>Server Maintenance</p>
								<p>Backend Design</p>
								<p>Mobile Design</p>
								<p>Project Planning</p>
								<p>Training</p>
							</ul>
							<img alt="presenting" src={mirror} className="smImg flipped"   />
						</div>
						<div className="flexImg list flipped">
							<img alt="presenting" src={presenting} className="leftImg presenting flipped"   />
						</div>
					</div>
					<p>and we're always adding more!</p>
					<div>
						<p>We put in everything you need, and nothing that you don't, making for an experience and a product you won't find anywhere else.</p>
						
						<p>Let us hear your vision, and bring it to life!</p>
					</div>
				</div>
			</div>
		</Fader>	
	)
}