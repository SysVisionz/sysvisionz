import React, {Component} from 'react';
import {connect} from 'react-redux';
import {} from '../actions';
import Fader from './Fader';

const mapStateToProps = state => {
	const {
		projects
	} = state.site;
	return {
		projects
	}
}

export default connect (mapStateToProps, null) (class Projects extends Component {
	projectList = () => {
		return <span>coming soon</span>
	}
	render() {
		return (
			<Fader {...this.props}>
				<div>
					<h1>Current Projects</h1>
					{this.projectList}
				</div>
			</Fader>
		)
	}
})