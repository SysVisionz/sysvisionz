import React, {Component} from 'react'
import {connect} from 'react-redux';
import Dropdown from 'sysvisionz-react-dropdown';
import {Link} from 'react-router-dom';
import {loginUser, userSignedIn, signUserOut, updateValue} from '../actions';

const mapStateToProps = (state) => {
	const {
		name,
		greeting,
		email,
		password,
		error,
		user,
		loggingIn,
		userChecked,
		newUser
	} = state.auth;
	return {
		name,
		greeting,
		email,
		password,
		error,
		user,
		loggingIn,
		userChecked,
		newUser
	};
}

export default connect (mapStateToProps, {loginUser, userSignedIn, signUserOut, updateValue}) (class AuthBox extends Component {
	constructor () {
		super();
		this.state={
			authOpen: false,
			authMenuOpen: false
		};
	}

	componentDidMount() {
		this.props.userSignedIn();
	}

	handleSubmitUser = evt => {
		this.props.loginUser(this.props.email, this.props.password);
		this.setState({authMenuOpen: false});
		document.removeEventListener('click', this.closeAuth)
		evt.preventDefault()
	}

	loginButton = () => {
		if (this.props.loggingIn)
			return <button>logging in...</button>
		else
			return <button onClick={this.handleSubmitUser}>login</button>
	}

	signOut = () => {
		this.setState({authOpen: false});
		this.props.signUserOut();
	}

	closeAuth = evt => {
		if (!this.props.cascadeCheck(evt.target, 'auth')){
			this.setState({authOpen: false});
			document.removeEventListener('click', this.closeAuth);
		}
	}

	openSignIn = () => {
		this.setState({authOpen: true});
		document.addEventListener('click', this.closeAuth);
	}
	
	render() {
		if (!this.props.userChecked) {
			return <div className='inactive'></div>
		}
		if (this.props.user) {
			const authEntries = [
				{title: 'Active Projects', http: '/account/projects'},
				{title: 'New Project', http: '/account/newProject'},
				{title: 'Current Invoices', http: '/account/invoices'},
				{title: 'Profile', http: '/account/profile'}
			]
			const menuOptions = authEntries.map(entry => <Link className = "authButton" onClick={() => this.props.returnToTop()} to={entry.http}>{entry.title}</Link>)
			let classNameOf = this.state.authMenuOpen ? 'auth loggedIn menuOpen' : 'auth loggedIn';
			if (this.props.xSmall)
				classNameOf = classNameOf.concat(' xSmall');
			return (
				<div className={classNameOf} >
					<span>Welcome, {this.props.user.name ? this.props.user.name : this.props.user.email}!</span>
					<Dropdown 
						label={this.props.xSmall ? '...' : '+'}
						entries={[...menuOptions, (<div><span className="authButton" onClick={() => this.signOut()}>Sign Out</span></div>)]}
						className={'optionButton'}
						dropDirection="down"
						orientation={this.props.xSmall ? 'center' : 'left'}
						listVisible = {this.state.authMenuOpen}
						onToggle={() => this.setState({authMenuOpen: !this.state.authMenuOpen})}
						id="authMenu"
					/>
				</div>
			)
		}
		else if (this.state.authOpen) {
			return (
				<form className = {this.props.xSmall ? "auth open xSmall" : 'auth open'} onSubmit={this.handleSubmitUser}>
					<input disabled={this.props.loggingIn || this.props.newUser} type ='text' onChange={(input) => this.props.updateValue('email', input.target.value)} value={this.props.email} className="authInput" placeholder="email" />
					<input disabled={this.props.loggingIn || this.props.newUser} type ='password' onChange={(input) => this.props.updateValue('password', input.target.value)} value={this.props.password} className="authInput" placeholder="password" />
			<div>{this.state.error}</div>
			{this.loginButton()}
				</form>
			);
		}
		else {
			return (<div className={this.props.xSmall ? "auth closed xSmall" : 'auth closed'} onClick={this.openSignIn}>Sign In</div>);
		}
	}
})