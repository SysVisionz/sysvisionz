import React, {Component} from 'react';
import {connect} from 'react-redux';
import firebase from 'firebase';
import {userData, sendUserData, updateSite} from '../actions';
import Fader from './Fader';
import {Loading} from './Loading';


const mapStateToProps = state => {
	const {
		user,
		email,
		company,
		name,
		displayName,
		type,
		website,
		error
	} = state.site;
	return {
		user,
		email,
		company,
		name,
		displayName,
		type,
		website,
		error
	};
};

export default connect (mapStateToProps, {userData, sendUserData, updateSite}) (class Profile extends Component {

	constructor() {
		super()
		this.state={
			editName: false,
			editDisplayName: false,
			editEmail: false,
			editCompany: false,
			editPhoto: false,
			editWebsite: false,
			editing: null,
			editElem: null
		}
	}

	componentDidMount() {
		firebase.auth().onAuthStateChanged( user => this.props.userData(user));
	}

	componentDidUpdate() {
		if (this.state.editName && this.state.editing !== 'editName'){
			document.addEventListener('click', this.closeClick)
			this.setState({editing: 'editName', editElem: document.getElementById('name')})
		}
		if (this.state.editDisplayName && this.state.editing !== 'editDisplayName'){
			document.addEventListener('click', this.closeClick)
			this.setState({editing: 'editDisplayName', editElem: document.getElementById('displayName')})
		}
		if (this.state.editCompany && this.state.editing !== 'editCompany'){
			document.addEventListener('click', this.closeClick)
			this.setState({editing: 'editCompany', editElem: document.getElementById('company')})
		}
		if (this.state.editEmail && this.state.editing !== 'editEmail'){
			document.addEventListener('click', this.closeClick)
			this.setState({editing: 'editEmail', editElem: document.getElementById('email')})
		}
	}

	isAdmin = () => {
		switch(this.props.type){ 
			case 'master':
				return 'Master Administrator';
			case 'admin':
				return 'Administrator';
			case 'client':
				return 'Client';
			default:
				return 'Guest';
		}
	}

	closeClick = evt => {
		if (evt.target ? evt.target !== this.state.editElem : evt !== this.state.editing){
			this.setState({[this.state.editing]: false});
		} 
		document.removeEventListener('click', this.closeClick)
	}

	buttonClick = edit => {
		this.setState({[edit]: true});
		this.closeClick(edit);
	}

	handleSubmit = (submitVal, evt) => {
		switch (submitVal) {
			case 'name':
				this.setState({editName: false});
				break;
			case 'email':
				this.setState({editEmail: false});
				break;
			case 'company':
				this.setState({editCompany: false});
				break;
			case 'displayName':
				this.setState({editDisplayName: false});
				break;
			case 'website':
				this.setState({editWebsite: false});
				break;
			default:
				break;
		}
		this.props.sendUserData(submitVal, evt.target.firstChild.value);
		evt.preventDefault();
	}

	inputChange = (prop, value) => {
		this.props.updateSite(prop, value)	
	}

	profileItem = item => {
		const {email, displayName, company, website} = this.props;
		switch (item){
			case 'name':
				if (this.state.editName){
					return (
						<form 
							className="profileForm" 
							onSubmit={evt => this.handleSubmit('name', evt)}
						>
							<input 
								type='text' 
								id='name' 
								name='name' 
								onChange={input => this.inputChange('name', input.target.value)} 
								value={this.props.name} 
								placeholder="name" 
							/>
							<input 
								type='submit' 
								hidden='true' 
							/>
						</form>
					)
				}
				else{
					return (
						<div className="profileItem">
							<div className = {this.props.name ? 'provided' : 'empty'}>{this.props.name}</div>
							<button onClick={() => this.buttonClick('editName')}>{!this.props.name ? 'Add' : 'Edit'}</button>
						</div>
					)
				}
			case 'displayName':
				if (this.state.editDisplayName){
					return (
						<form 
							className="profileForm" 
							onSubmit={evt => this.handleSubmit('displayName', evt)}
						>
							<input 
								type = 'text' 
								id='displayName' 
								name='displayName' 
								onChange={input => this.inputChange('displayName', input.target.value)} 
								value={displayName} 
								placeholder="Display Name" 
							/>
							<input type='submit' hidden='true' />
						</form>
					)
				}
				else{
					return (
						<div className="profileItem">
							<div className={displayName ? 'provided' : 'empty'}>{displayName}</div>
							<button onClick={() => this.buttonClick('editDisplayName')}>{!displayName ? 'Add' : 'Edit'}</button>
						</div>
					)
				}
			case 'email':
				if (this.state.editEmail){
					return (
						<form className="profileForm" onSubmit={evt => this.handleSubmit('email', evt)}>
							<input type = 'text' 
							id='email' 
							name='email' 
							onChange={input => this.inputChange('email', input.target.value)} 
							value={email} 
							placeholder="email" />
							<input type='submit' hidden='true' />
						</form>
					)
				}
				else{
					return (
						<div className="profileItem">
							<div className={email ? 'provided' : 'empty'}>{email}</div>
							<button onClick={() => this.buttonClick('editEmail')}>{!email ? 'Add' : 'Edit'}</button>
						</div>
					)
				}
			case 'company':
				if (this.state.editCompany){
					return (
						<form 
							className="profileForm" 
							onSubmit={evt => this.handleSubmit('company', evt)}
						>
							<input type = 'text' 
							id='company' 
							name='company' 
							onChange={input => this.inputChange('company', input.target.value)} 
							value={company} 
							placeholder="company" />
							<input type='submit' hidden='true' />
						</form>
					)
				}
				else{
					return (
						<div className="profileItem">
							<div className={company ? 'provided' : 'empty'}>{company}</div>
							<button onClick={() => this.buttonClick('editCompany')}>{!company ? 'Add' : 'Edit'}</button>
						</div>
					)
				}
			case 'website':
				if (this.state.editWebsite){
					return (
						<form className="profileForm" onSubmit={evt => this.handleSubmit('website', evt)}>
							<input type = 'text' 
							id='website' 
							name='website' 
							onChange={input => this.inputChange('website', input.target.value)} 
							value={website} 
							placeholder="website" />
							<input type='submit' hidden='true' />
						</form>
					)
				}
				else{
					return (
						<div className="profileItem">
							<div className={website ? 'provided' : 'empty'}>{website}</div>
							<button onClick={() => this.buttonClick('editWebsite')}>{!website ? 'Add' : 'Edit'}</button>
						</div>
					)
				}
			default:
				return <div>error</div>
		}
	}

	mainSpot = () => {
		return (
			<Fader key={this.props.key}>
				<div>
					<h1>Profile</h1>
					<div>Email: {this.profileItem('email')} </div>
					<div>Display Name: {this.profileItem('displayName')}</div>
					<div>Name: {this.profileItem('name')} </div>
					<div>Company: {this.profileItem('company')} </div>
					<div>Website: {this.profileItem('website')} </div>
					<div>Account Type: {this.isAdmin()}</div>
					<div>{this.props.error}</div>
				</div>
			</Fader>
		);
	}

	render() {
		if (this.props.user)
			return this.mainSpot()
		else
			return <Loading />
	}
})