import React, { Component } from 'react'
import { connect } from 'react-redux';
import Dropdown from 'sysvisionz-react-dropdown';
import { Link } from 'react-router-dom';
import io from 'socket.io-client';
import AuthModal from './AuthModal';
import { Attention, Modal } from './common';
import menuButton from '../images/MenuButton.png';
import { loginUser, userSignedIn, signUserOut, updateValue, userData, resetSite, loginClick } from '../actions';

const mapStateToProps = (state) => {
	const {
		password,
		error,
		loggingIn,
		userChecked,
		newUser,
		_id,
		email,
		persist,
		token,
		displayName,
		type,
		attentions,
		personal,
	} = state.auth;
	return {
		personal,
		email,
		password,
		error,
		loggingIn,
		userChecked,
		newUser,
		type,
		_id,
		attentions,
		persist,
		token,
		displayName
	};
}

export default connect (mapStateToProps, {loginClick, loginUser, userSignedIn, signUserOut, updateValue, userData, resetSite }) (class AuthBox extends Component {
	constructor () {
		super();
		this.state={
			authOpen: false,
			authMenuOpen: false,
			isVisible: true
		};
		window.onresize= () => {
			if (this.state.authOpen || this.state.authMenuOpen){this.closeAuth()}
		}
	}

	handleSubmitUser = evt => {
		evt.preventDefault();
		this.props.loginClick();
		this.props.loginUser(this.props.email, this.props.password, this.props.persist, this.props.socket);
		this.setState({authMenuOpen: false});
		document.removeEventListener('click', this.closeAuth);
	}

	loginButton = () => {
		if (this.props.loggingIn)
			return <input type="submit" className="login button" value="logging in..." />
		else
			return <input type="submit" className="login button" value="login" />
	}

	signOut = () => {
		this.setState({authOpen: false, authMenuOpen: false});
		this.props.authState(false);
		this.props.signUserOut(localStorage.getItem('sysv-user-token'));
		this.props.resetSite();
		document.removeEventListener('click', this.closeAuth);
	}

	closeAuth = evt => {
		if (!evt || !this.props.cascadeCheck(evt.target, document.getElementsByClassName('auth')[0])){
			this.setState({authOpen: false, authMenuOpen: false});
			document.removeEventListener('click', this.closeAuth);
		}
	}

	authEntries = type => {
		const {signOut, props} = this
		const {attentions} = props;
		switch (type) {
			case 'master':
				return [
					{title: <Attention on={attentions.promote}>Promote</Attention>, action: () => this.setState({promoteOpen: true})},
					{title: <Attention on={attentions.newProject}>New Project</Attention>, http: '/account/newProject'},
					{title: <Attention on={attentions.projects}>Active Projects</Attention>, http: '/account/projects'},
					{title: <Attention on={attentions.schedule}>Schedule</Attention>, http: '/account/schedule'},
					{title: <Attention on={attentions.profile}>Profile</Attention>, http: '/account/profile'},
					{title: 'Sign Out', action: () => signOut()}
				];
			case 'client':
				return [
					{title: <Attention on={attentions.newProject}>New Project</Attention>, http: '/account/newProject'},
					{title: <Attention on={attentions.projects}>Active Projects</Attention>, http: '/account/projects'},
					{title: <Attention on={attentions.schedule}>Schedule</Attention>, http: '/account/schedule'},
					{title: <Attention on={attentions.invoices}>Current Invoices</Attention>, http: '/account/invoices'},
					{title: <Attention on={attentions.profile}>Profile</Attention>, http: '/account/profile'},
					{title: 'Sign Out', action: () => signOut()}
				];
			case 'admin':
				return [
					{title: <Attention on={attentions.projects}>Active Projects</Attention>, http: '/account/projects'},
					{title: <Attention on={attentions.schedule}>Schedule</Attention>, http: '/account/schedule'},
					{title: <Attention on={attentions.profile}>Profile</Attention>, http: '/account/profile'},
					{title: 'Sign Out', action: () => signOut()}
				];
			case 'student':
				return [
					{title: <Attention on={attentions.schedule}>Schedule</Attention>, http: '/account/schedule'},
					{title: <Attention on={attentions.profile}>Profile</Attention>, http: '/account/profile'},
					{title: 'Sign Out', action: () => signOut()}
				];
			default:
				return [
					{title: <Attention on={attentions.profile}>Profile</Attention>, http: '/account/profile'},
					{title: 'Sign Out', action: () => signOut()}
				];
		}
	}

	openSignIn = () => {
		this.setState({isVisible: false});
		this.setState({authOpen: true});
		document.addEventListener('click', this.closeAuth);
	}

	clickDiv = () => {
		if (this.props.xSmall && this.props._id) {
			if (!this.state.authMenuOpen) {document.addEventListener('click', this.closeAuth)}
			this.setState({authMenuOpen: !this.state.authMenuOpen})
		}
	}

	buttonToggle = () => {
		if (!this.props.xSmall){
			this.setState({authMenuOpen: !this.state.authMenuOpen});
			document.addEventListener('click', this.closeAuth);
		}
	}

	linkClick = (isSame) => {
		this.props.returnToTop(isSame);
		this.setState({authMenuOpen: false});
		document.removeEventListener('click', this.closeAuth);
	}
	
	render() {
		const {
			state,
			props,
			clickDiv,
			buttonToggle,
			linkClick,
			authEntries
		} = this
		const {
			type, 
			xSmall,
			loggingIn,
			personal,
			_id,
			email,
			newUser,
			attentions,
			error,
			persist,
			password,
			token,
			displayName
		} = props;
		const {
			authOpen,
		} = state;
		let classNameOf = "auth";	
		let contents;
		if (_id) {
			if ( token && localStorage.getItem('sysv-user-token') !== token){
				localStorage.setItem('sysv-user-token', token)
			}
			const mainAttention = attentions && Object.values(attentions).indexOf(true) !== -1;
			classNameOf+=" loggedIn";
			const menuOptions = authEntries(type).map(entry => {
				return entry.http
					? <Link onClick={() => window.location.pathname === entry.http ? linkClick(true) : linkClick(false)} to={entry.http}>{entry.title}</Link>
					: <div onClick={entry.action}>{entry.title}</div>
			});
			const greetMsg = () => {
				if (personal) {
					return personal.greeting
					? personal.name ? personal.greeting + ' ' + personal.name : personal.greeting + ' ' + displayName
					: personal.name ? "Welcome, " + personal.name : "Welcome, " + displayName;
				}
				else {
					return "Welcome, " + displayName
				}
			}

			contents = (
				<div>
					<span className="greet-span">{greetMsg()}!</span>
					<Dropdown 
						label={<Attention on={mainAttention && !this.state.authMenuOpen}><div onClick={buttonToggle}><img alt='+' src={menuButton} /></div></Attention>}
						entries={menuOptions}
						controlled
						delay={200}
						isOpen={this.state.authMenuOpen}
						orientation={'left'}
						onOpen={() => this.props.authState(true)}
						onClose={() => this.props.authState(false)}
						id="authMenu"
						buttonId="authActivate"
						menuId="subAuth"
						menuClass={'menu'}
						menuStyle={window.innerWidth > 600 ? {width: document.getElementById('authContainer').clientWidth} : ''}
						listClass="button authType"
					/>
				</div>
			);
		}
		else if (authOpen) {
			contents = (
				<div>
					<form id ="signInForm" onSubmit={this.handleSubmitUser}>
						<input disabled={loggingIn || newUser} type ='text' onChange={(input) => this.props.updateValue('email', input.target.value)} className="authInput" placeholder="email" />
						<input disabled={loggingIn || newUser} type ='password' onChange={(input) => this.props.updateValue('password', input.target.value)} className="authInput" placeholder="password" />
						<span>keep logged in:</span><input disabled={loggingIn || newUser} type = 'checkBox' onChange={input => this.props.updateValue('persist', input.target.checked)} checked={this.props.persist} />
						{this.loginButton()}
					</form>
					<Modal id="signInModal" open={!newUser} closeModal={() => this.setState({authOpen: false})}>
						<form onSubmit={this.handleSubmitUser}>
							<input disabled={loggingIn || newUser} type ='text' onChange={(input) => this.props.updateValue('email', input.target.value)} className="authInput" placeholder="email" />
							<input disabled={loggingIn || newUser} type ='password' onChange={(input) => this.props.updateValue('password', input.target.value)} className="authInput" placeholder="password" />
							<span>stay logged in:</span><input disabled={loggingIn || newUser} type = 'checkBox' onChange={input => this.props.updateValue('persist', input.target.checked)} checked={this.props.persist} />
							{this.loginButton()}
						</form>
					</Modal>
				<div className={this.props.error ? 'error-box' : "error-box-hidden"}>{this.props.error}</div>
				</div>
			);
		}
		else {
			classNameOf+=' closed';
			contents=<div onClick={this.openSignIn}>Sign In/Register</div>;
		}
		return (
			<div id='authContainer' 
				className={classNameOf} 
				onClick={() => clickDiv()}
			>
				{contents}
				<AuthModal 
					open={newUser} 
					email={email} 
					password={password} 
					persist={persist} 
				/>
			</div>); }
});