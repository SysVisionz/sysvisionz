import React from 'react';
import Fader from './Fader';

export const MakeApp = (props) => {
	return (
		<Fader in={props.in} mountFunct={props.mountFunct} unMountFunct={props.unMountFunct}>
			<div>App</div>
		</Fader>
	)
}