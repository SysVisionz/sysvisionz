import React, {Component, Modal} from 'react';
import Dropdown from 'sysvisionz-react-dropdown';
import {connect} from 'react-redux';
import {inputChange} from '../actions';
import {Modal} from './common';

mapStateToProps = state => {
	const {currentUser} = state.auth;
	const {inputBlogTitle, inputBlogContent} = state.blog;
	return {currentUser, inputBlogContent, inputBlogTitle};
}


export default connect (mapStateToProps, {inputChange}) (class EntryModal extends Component{
	constructor () {

	}

	render () {
		return (
			<div>
				<input class='blogTitleInput' onChange={input => inputChange('inputBlogTitle', input)}>Title</input>
				<input class='blogContentInput' onChange={input => inputChange('inputBlogContent', input)}></input>
			</div>
		)
	}
});
