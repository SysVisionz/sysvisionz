import React, {Component} from 'react';
import {connect} from 'react-redux';
import {createUser, closeModal} from '../actions';
import {Modal} from './common';

const mapStateToProps = state => {
	const {email, password, persist} = state.auth;
	return {
		email,
		password,
		persist
	};
}

export default connect(mapStateToProps, {createUser, closeModal})(class AuthModal extends Component {
	render() {
		return (
			<Modal open={this.props.open} closeModal={() => this.props.closeModal()}>
				<div>
					<p>There is not a current account with the email {this.props.email}.</p>
					<p>Create this account?</p>
				</div>
				<div>
					<div onClick={() => this.props.createUser(this.props.email, this.props.password, this.props.persist)} className="yes-no button">Yes</div>
					<div onClick={() => this.props.closeModal()} className="yes-no button">No</div>
				</div>
			</Modal>
		)
	}
});