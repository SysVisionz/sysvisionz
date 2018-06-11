import React, {Component} from 'react'
import {connect} from 'react-redux';
import Dropdown from 'sysvisionz-react-dropdown';
import firebase from 'firebase';
import {Link} from 'react-router-dom';
import menuButton from '../images/MenuButton.png';
import {loginUser, userSignedIn, signUserOut, updateValue, userData, resetSite} from '../actions';

const mapStateToProps = (state) => {
	const {
		email,
		password,
		error,
		loggingIn,
		userChecked,
		newUser,
		user,
	} = state.auth;
	const {
		type,
		greeting,
		personal,
	} = state.site;
	return {
		personal,
		greeting,
		email,
		password,
		error,
		loggingIn,
		userChecked,
		newUser,
		type,
		user
	};
}

export default connect (mapStateToProps, {loginUser, userSignedIn, signUserOut, updateValue, userData, resetSite}) (class AuthBox extends Component {
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

	componentDidMount() {
		this.props.userSignedIn();
		this.props.userData(firebase.auth().currentUser);
		firebase.auth().onAuthStateChanged(user => this.props.userData(firebase.auth().currentUser));
	}

	handleSubmitUser = evt => {
		evt.preventDefault();
		this.props.loginUser(this.props.email, this.props.password);
		this.setState({authMenuOpen: false});
		document.removeEventListener('click', this.closeAuth);
	}

	loginButton = () => {
		if (this.props.loggingIn)
			return <button>logging in...</button>
		else
			return <button onClick={this.handleSubmitUser}>login</button>
	}

	signOut = () => {
		this.setState({authOpen: false, authMenuOpen: false});
		this.props.authState(false);
		this.props.signUserOut();
		this.props.resetSite();
		document.removeEventListener('click', this.closeAuth);
	}

	closeAuth = evt => {
		if (!evt || !this.props.cascadeCheck(evt.target, document.getElementsByClassName('auth')[0])){
			this.setState({authOpen: false, authMenuOpen: false});
			document.removeEventListener('click', this.closeAuth);
		}
	}

	openSignIn = () => {
		this.setState({isVisible: false});
		this.setState({authOpen: true});
		document.addEventListener('click', this.closeAuth);
	}

	clickDiv = () => {
		if (this.props.xSmall && firebase.auth().currentUser) {
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
			signOut,
			buttonToggle,
			linkClick
		} = this
		const {
			type, 
			xSmall,
			loggingIn,
			newUser,
			greeting,
			personal,
			user,
			email,
		} = props;
		const {
			authOpen,
		} = state;
		let classNameOf = "auth";
		classNameOf+= xSmall ? ' xSmall' : '';
		let contents;
		if (user) {
			classNameOf+=" loggedIn";
			let authEntries = []
			switch (type) {
				case 'master':
					authEntries = authEntries.concat({title: 'Promote', action: () => this.setState({promoteOpen: true})});
				case 'client':
					authEntries = authEntries.concat({title: 'New Project', http: '/account/newProject'})
				case 'admin':
					authEntries = authEntries.concat({title: 'Active Projects', http: '/account/projects'});
				case 'student':
					authEntries = authEntries.concat({title: 'Schedule', http: '/account/schedule'});
				default:
					authEntries = authEntries.concat(
						{title: 'Profile', http: '/account/profile'},
						{title: 'Sign Out', action: () => signOut()}
					);
			}
			if (type === 'student' || type === 'client') {authEntries.splice(authEntries.length-2, 0, {title: 'Current Invoices', http: '/account/invoices'})}
			const menuOptions = authEntries.map(entry => {
				return entry.http
					? <Link onClick={() => window.location.pathname === entry.http ? linkClick(true) : linkClick(false)} to={entry.http}>{entry.title}</Link>
					: <div onClick={entry.action}>{entry.title}</div>
			});
			const greetMsg = greeting
				? personal.name ? greeting + ' ' + personal.name : greeting + ' ' + email
				: personal.name ? "Welcome " + personal.name : "Welcome " + email;
			contents = (
				<div>
					<span>{greetMsg}!</span>
					<Dropdown 
						label={<div onClick={buttonToggle}><img alt='+' src={menuButton} /></div>}
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
					<form onSubmit={this.handleSubmitUser}>
						<input disabled={loggingIn || newUser} type ='text' onChange={(input) => this.props.updateValue('email', input.target.value)} className="authInput" placeholder="email" />
						<input disabled={loggingIn || newUser} type ='password' onChange={(input) => this.props.updateValue('password', input.target.value)} className="authInput" placeholder="password" />
					</form>
				<div>{this.state.error}</div>
				{this.loginButton()}
				</div>
			);
		}
		else {
			classNameOf+=' closed';
			contents=<div onClick={this.openSignIn}>Sign In/Sign Up</div>;
		}
			return (<div id='authContainer' className={classNameOf} onClick={() => clickDiv()}>{contents}</div>);
	}
});
