import React { Component, View } from 'react';

class TopBar extends Component {
	render(props) {
		const entries = props.entries;
		return(
			<View>
				<DropList/>
			</View>
		)
	}
}