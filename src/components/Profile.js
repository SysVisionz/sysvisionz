import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import firebase from 'firebase';
import {userData, 
	sendUserData, 
	updateSite,
	updatePersonal,
	updateCompany} from '../actions';
import Fader from './Fader';
import {Loading} from './Loading';


const mapStateToProps = state => {
	const {
		pAddressActive,
		cAddressActive,
		email,
		displayName,
		photoUrl,
		company,
		personal,
		clientType,
		type,
		website,
		error,
		greeting
	} = state.site;
	return {
		pAddressActive,
		cAddressActive,
		email,
		displayName,
		photoUrl,
		company,
		personal,
		clientType,
		type,
		website,
		error,
		greeting
	};
};

export default connect (mapStateToProps, {userData, sendUserData, updateSite, updateCompany, updatePersonal}) (class Profile extends Component {

	constructor() {
		super()
		this.state={
			edit: undefined,
			pAddressActive:false,
			cAddressActive:false
		}
	}

	componentDidMount() {
		firebase.auth().onAuthStateChanged( () => this.props.userData(firebase.auth().currentUser));
	}

	componentDidUpdate() {
		if (this.state.edit) {document.getElementById(this.state.edit).focus()}
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

	closeClick = (evt, name) => {
		if (evt.target.id !== this.state.edit && evt.target.className !== 'button'){ 
			this.setState({edit: undefined});
			document.removeEventListener('click', this.closeClick)
		}
	}

	buttonClick = (toEdit, isCompany) => {
		const edit = isCompany ? 'c'+toEdit : toEdit;
		document.addEventListener('click', this.closeClick);
		this.setState({edit});
	}

	handleSubmit = (evt, value, isCompany) => {
		this.props.sendUserData(firebase.auth().currentUser, value, evt.target.firstChild.value, isCompany);
		this.setState({edit: undefined});
		evt.preventDefault();
	}

	checkIfOwnValue = (prop) =>  {
		const nonBasic = ['name', 'street', 'city', 'state', 'zip'];
		return nonBasic.indexOf(prop) === -1;
	}

	typeOfUpdate = (prop, value, isCompany) => {
		if (!this.checkIfOwnValue(prop)){
			isCompany ? this.props.updateCompany(prop, value) : this.props.updatePersonal(prop, value);
		}
		else{
			this.props.updateSite(prop, value);
		}
	}

	activateAddress(active, isCompany) {
		this.props.updateSite(isCompany ? 'cAddressActive' : 'pAddressActive', active);
		this.props.sendUserData(firebase.auth().currentUser, isCompany ? 'cAddressActive' : 'pAddressActive', active);
	}

	returnValue = (prop, isCompany) => {
		if(this.checkIfOwnValue(prop)){
			return this.props[prop];
		}
		else{
			return isCompany ? this.props.company[prop] : this.props.personal[prop];
		}
	}

	profileItem = (item, isCompany) => {
		let value;
		if (isCompany) {
			value = this.props.company[item]
		}
		else if ( !this.checkIfOwnValue(item) ) {
			value = this.props.personal[item]
		}
		else {
			value = this.props[item]
		}
		const {returnValue, label, state, typeOfUpdate, handleSubmit} = this;
		const tag = isCompany ? "c"+item : item;
		return (
			<div className="profileItemContainer">
				<form className={state.edit !== tag ? "profileForm hidden" : "profileForm visible"}
					onSubmit={evt => handleSubmit(evt, item, isCompany)}
				>
					<input 
						type='text' 
						id={isCompany ? 'c'+item : item} 
						name={isCompany ? 'c'+item : item} 
						onChange={input => typeOfUpdate(item, input.target.value, isCompany)} 
						value={value}
						placeholder={item}
					/>
					<input 
						type='submit' 
						hidden='true' 
					/>
				</form>
				<div className="profileItem" style={{display: state.edit === tag ? 'none' : ''}}>
					<div className = {this.props[item] ? 'provided' : 'empty'}>{returnValue(item, isCompany)}</div>
				</div>
				<div className="profile-button" >
					<div className = "button" onClick={() => this.buttonClick(item, isCompany)} style={{display: this.state.edit === tag ? 'none': ''}}>{!this.returnValue(item, isCompany) ? 'Add' : 'Change'}</div>
				</div>
			</div>
		)
	}

	mainSpot = () => {
		const companyAddress = (
			<div>
				<div hidden={!this.props.cAddressActive}>
					<div className="profile-item-wrapper"><div className="profileItemTitle">Street: </div>{this.profileItem('street', true)} </div>
					<div className="profile-item-wrapper"><div className="profileItemTitle">City: </div>{this.profileItem('city', true)} </div>
					<div className="profile-item-wrapper"><div className="profileItemTitle">State: </div>{this.profileItem('state', true)} </div>
					<div className="profile-item-wrapper"><div className="profileItemTitle">Zip Code: </div>{this.profileItem('zip', true)} </div>
				</div>
			</div>
			)
		const personalAddress = (
			<div>
				<div hidden={!this.props.pAddressActive}>
					<div className="profile-item-wrapper"><div className="profileItemTitle">Street: </div>{this.profileItem('street')} </div>
					<div className="profile-item-wrapper"><div className="profileItemTitle">City: </div>{this.profileItem('city')} </div>
					<div className="profile-item-wrapper"><div className="profileItemTitle">State: </div>{this.profileItem('state')} </div>
					<div className="profile-item-wrapper"><div className="profileItemTitle">Zip Code: </div>{this.profileItem('zip')} </div>
				</div>
			</div>
		)
		return (
			<Fader key={this.props.key}>
				<div id='profile'>
 					<div className="titleText stretch"><span>Profile</span></div>
					<div id="profileBody">
						<div className="profile-item-wrapper"><div className="profileItemTitle">Email: </div>{this.profileItem('email')} </div>
						<div className="profile-item-wrapper"><div className="profileItemTitle">Display Name:</div> {this.profileItem('displayName')}</div>
						<div className="profile-item-wrapper"><div className="profileItemTitle">Name: </div>{this.profileItem('name')} </div>
						<div className='small-warning'>-PERSONAL ADDRESS OPTIONAL EXCEPT FOR BILLING PURPOSES-</div>
						<div>Add personal Address:
							<input 
								type='checkbox' 
								checked={this.props.pAddressActive}
								value={this.props.pAddressActive}
								onChange={val => this.activateAddress(val.target.checked, false)}
							/>
						</div>
						{personalAddress}
						<div className="profile-item-wrapper"><div className="profileItemTitle">Company: </div>{this.profileItem('name', true)} </div>
						<div className='small-warning'>-COMPANY ADDRESS OPTIONAL EXCEPT FOR BILLING PURPOSES-</div>
						<div> Add Company Address:
							<input 
								type='checkbox' 
								value={this.props.cAddressActive}
								checked={this.props.cAddressActive}
								onChange={val => this.activateAddress(val.target.checked, true)} 
							/>
						</div>
						{companyAddress}
						<div className="profile-item-wrapper"><div className="profileItemTitle">Website: </div>{this.profileItem('website')} </div>
						<div className="profile-item-wrapper"><div className="profileItemTitle">Custom Greeting: </div>{this.profileItem('greeting')} </div>
					</div>
					<div className='adminType'>{this.isAdmin()}</div>
				</div>
			</Fader>
		);
	}

	render() {
		if (firebase.auth().currentUser){
			return this.mainSpot()
		}
		else if (this.props.error==='no user'){
			return <Redirect to='/' />
		}
		else{
			return <Loading />
		}
	}
})