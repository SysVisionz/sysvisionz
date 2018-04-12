import React, {Component} from 'react';
import {createUser} from '../actions';
import {connect} from 'react-redux';

const mapStateToProps = state => {
	const {
		email,
		password
	} = state.auth;
	return {
		email,
		password
	};
}

export default connect(mapStateToProps, {createUser})(class AuthModal extends Component {
	render() {
		if (!this.props.visible)
			return null;
		return (
			<div className="modal">
				<div className="modalWindow">
					<span>There is not a current account with this email and password.</span>
					<span>Create this account?</span>
					<button onClick={() => this.props.createUser(this.props.email, this.props.password)}>Yes</button>
					<button onClick={this.props.onClose}>No</button>
				</div>
			</div>
		)
	}
});