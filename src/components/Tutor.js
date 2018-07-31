import React from 'react';
import Fader from './Fader';
import {Link} from 'react-router-dom';
import TutorModal from './TutorModal';
import AnimBox from './common/AnimBox';
import gamerImg from '../images/wizard_attack.gif';
import codeImg from '../images/code.gif'
import docImg from '../images/documents.gif';
import shortImg from '../images/shortcut.gif';
import computer from '../images/laptop.png';
export const Tutor = (props) => {

	const recommendationList = [
		{
			entry: 'code',
			content: 'Javascript, HTML, CSS, PHP, ReactJS, React Native, Java, C++, C#, and more.'
		},
		{
			entry: 'shortcuts',
			content: 'AutoHotkey, Java, C#, Chrome and Firefox extensions, Bash, and more'
		},
		{
			entry: 'docs',
			content: "Microsoft Office, Google Suite, Apache OpenOffice, LibreOffice, and more."
		},
		{
			entry: 'games',
			content: "Java, C++, C#, React Native, Unity, Android Studio, PHP, and more."
		}
	]

	const recMap = recommendationList.map( (entry, index) => <div key = {'recMap' + index} className = {'recEntry'.concat(props.recommendation[entry.entry] ? ' open' : ' closed')}>{entry.content}</div>)
	return (
		<Fader>
			<div id="tutor">
				<div className ='titleText stretch'>Tutoring Opportunities</div>
				<div className='imageBoxer'>
					<div className="flexImg">
						<img alt="computer" src={computer}  />
					</div>
					<div>
						<p>You're looking for a new skill, trying to put yourself at the top of the pack</p>
						<img alt="computer" src={computer} className="smImg leftImg"  />
						<p>There's a thousand things to learn, with only so many places to learn them.</p>
						<p>Few skills are more in demand than software design, and that demand is only growing over time.</p>
						<p>So what are you waiting for?</p>
					</div>
				</div>
				<div>
					<div className ='titleText'><p>What do you want to make?</p></div>
					<div id='boxList' className = {props.topBar ? 'large' : props.xSmall ? 'xSmall' : 'small'}>
						<div className='animGrouper'>
							<AnimBox 
								id="animBox1"
								delay={200} 
								className='animBox up' 
								midClass='animBox mid'
								cover={<img alt="codeImg" src = {codeImg} />}
								isUp={props.isUp}
								identity='code'
								clicked={props.clicked}
								clickedUp={props.clickedUp}
							>
								<div>Code your dream programs and apps to your own specifications!</div>
							</AnimBox>
							<AnimBox 
								id="animBox2"
								delay={200} 
								className='animBox up' 
								midClass='animBox mid'
								cover={<img alt="shortImg" src = {shortImg}  />}
								isUp={props.isUp}
								identity='shortcuts'
								clicked={props.clicked}
								clickedUp={props.clickedUp}
							>
								<div>Master computer tricks increase your productivity!</div>
							</AnimBox>
						</div>
						<div className='animGrouper'>
							<AnimBox 
								id="animBox3"
								delay={200} 
								className='animBox up' 
								midClass='animBox mid'
								cover={<img alt="docImg" src = {docImg}  />}
								isUp={props.isUp}
								identity='docs'
								clicked={props.clicked}
								clickedUp={props.clickedUp}
							>
								<div>Learn the ins and outs of popular programs and Office Suites!</div>
							</AnimBox>
							<AnimBox 
								id="animBox4"
								delay={200} 
								className='animBox up' 
								midClass='animBox mid'
								cover={<img alt="gameImg" src = {gamerImg}  />}
								isUp={props.isUp}
								identity='games'
								clicked={props.clicked}
								clickedUp={props.clickedUp}
							>
								<div>Make your perfect web or mobile game, your own way!</div>
							</AnimBox>
						</div>
					</div>
					<div>
						<div className ='titleText'>What you'll learn:</div>
						<div className ='contentText' id="recDiv">
							{recMap}
						</div>
						<div className="button" onClick={props.returnToTop}><Link to="/contact">Become a Student!</Link></div>
					</div>
				</div>
				<TutorModal visible={props.tutorModalVisible} />
			</div>
		</Fader>
	)
}