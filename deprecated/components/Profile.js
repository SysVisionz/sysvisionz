import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import cookies from 'js-cookie';
import {
	userData, 
	sendUserData, 
	updateValue,
	updatePersonal,
	updateCompany} from '../actions';
import Fader from './Fader';
import {Loading} from './common/Loading';


const mapStateToProps = state => {
	const {
		addressActive,
		email,
		displayName,
		photoUrl,
		company,
		personal,
		clientType,
		type,
		website,
		error,
		currentEdit
	} = state.auth;
	return {
		addressActive,
		email,
		displayName,
		photoUrl,
		company,
		personal,
		clientType,
		type,
		website,
		error,
		currentEdit
	};
};

export default connect (mapStateToProps, {userData, sendUserData, updateValue}) (class Profile extends Component {

	componentDidUpdate() {
		if (this.props.currentEdit) {document.getElementById(this.props.currentEdit).focus()}
	}

	isAdmin = () => {
		switch(this.props.type){ 
			case 'master':
				return 'Master Administrator';
			case 'admin':
				return 'Administrator';
			case 'client':
				return 'Client';
			case 'student':
				return 'Student';
			default:
				return 'Guest';
		}
	}

	closeClick = (evt, name) => {
		if (evt.target.id !== this.props.currentEdit && evt.target.className !== 'button'){ 
			this.props.updateValue('currentEdit', undefined)
			document.removeEventListener('click', this.closeClick)
		}
	}

	buttonClick = (edit) => {
		document.addEventListener('click', this.closeClick);
		this.props.updateValue('currentEdit', edit);
	}

	handleSubmit = (evt, edit) => {
		evt.preventDefault();
		const value = evt.target[edit].value;
		const prefix = !this.checkIfOwnValue(edit) ? 'personal' : undefined
		this.props.sendUserData(localStorage.getItem('sysv-user-token'), edit, value, prefix);
	}

	currentVal = (prop) => {
		return this.checkIfOwnValue(prop) ? this.props[prop] : this.props.personal[prop]
	}

	checkIfOwnValue = (prop) =>  {
		const nonBasic = ['greeting', 'name', 'street', 'city', 'state', 'zip'];
		return nonBasic.indexOf(prop) === -1;
	}

	typeOfUpdate = (prop, value) => {
		if (!this.checkIfOwnValue(prop)){
			value = {...this.props.personal, [prop]: value}
			this.props.updateValue("personal", value);
		}
		else{
			this.props.updateValue(prop, value);
		}
	}

	activateAddress(active) {
		this.props.updateSite('addressActive', active);
		this.props.sendUserData(localStorage.getItem('sysv-user-token'),'addressActive', active);
	}

	returnValue = (prop) => {
		if(this.checkIfOwnValue(prop)){
			return this.props[prop];
		}
		else{
			return this.props.personal[prop];
		}
	}

	fromCamel = string => {
		string = string.split('');
	    for (let i = 0; i < string.length; i++) {
			if (string[i].toUpperCase() === string[i]){
				string.splice(i, 0, ' ')
				i++;
	        }
	    }
		string[0] = string[0].toUpperCase();
		string = string.join('');
		return string;
	}

	profileItem = (item) => {
		const value = this.currentVal(item);
		const {returnValue, label, state, typeOfUpdate, handleSubmit} = this;
		const textOf = this.fromCamel(item);
		return (
			<div className="profile-item-wrapper">
				<div className="profileItemTitle">
					{textOf}:
				</div>
				<div className="profileItemContainer">
					<form className={this.props.currentEdit !== item ? "profileForm hidden" : "profileForm visible"}
						onSubmit={evt => handleSubmit(evt, item)}
					>
						<label>
							<input 
								type='text' 
								id={item} 
								name={item} 
								onChange={input => typeOfUpdate(item, input.target.value)} 
								value={this.currentVal(item)}
								placeholder={item}
							/>
							<input 
								type='submit' 
								hidden='true' 
							/>
						</label>
					</form>
					<div className="profileItem" style={{display: this.props.currentEdit === item ? 'none' : ''}}>
						<div className = {this.props[item] ? 'provided' : 'empty'}>{returnValue(item)}</div>
					</div>
					<div className="profile-button" >
						<div className = "button" onClick={() => this.buttonClick(item)} style={{display: this.props.currentEdit === item ? 'none': ''}}>{!this.returnValue(item) ? 'Add' : 'Change'}</div>
					</div>
				</div>
			</div>
		)
	}

	mainSpot = () => {
		const listOfItems = ['email', 'displayName','name','greeting']
		return (
			<Fader key={this.props.key}>
				<div id='profile'>
 					<div className="titleText stretch"><span>Profile</span></div>
					<div id="profileBody">
						{listOfItems.map(item => this.profileItem(item))}
					</div>
					<div className='adminType'>{this.isAdmin()}</div>
				</div>
			</Fader>
		);
	}

	render() {
		if (this.props.displayName){
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