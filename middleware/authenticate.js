const _ = require('lodash');
const {User, Company} = require('../models');

const authByToken = (req, res) => {
	var token = req.header('x-auth');
	if (!token) {
		return res.status(400).send('no token provided');
	}
	User.findByToken(token).then(user => {
		if (!user) {
			return Promise.reject({status: 401, message: 'no user found'});
		}
		req.user = user;
		req.token = token;
		res.send(user);
	})
	.catch(err => {
		return res.status(err.status).send(err.message)
	});
}

const login = (req, res) => {
	const body = _.pick (req.body, ['email', 'password', 'persist']);
	User.findByCredentials(body.email, body.password).then( user => {
		user.persist = body.persist;
		return user.generateAuthToken().then(token => {
			return res.header('x-auth', token).send(user);
		})
	}).catch(err => res.status(err.status).send());
}

const byDisplayName = (req, res) => {
	const token = req.header('x-auth');
	const displayName = req.header('target');
	return User.findByDisplayName(displayName, token)
	.then(userId => res.status(200).header('target', userId).send())
	.catch(err => res.status(err.status).send());
}

const userList = (req, res) => {
	userList = User.find()
	.then (list => {
		let retVal = [];
	})
}

const returnUsers = (req, res) => {
	const body = _.pick(req.body, ['displayName', 'personal', 'type', 'company', 'contractSigned'])
	if (!Object.keys(body)[0]){
		return User.find()
		.then(list => res.status(200).send(list))
		.catch(err => res.status(400).send('no users exist'));
	}
	let searchTerm = {};
	if (Object.keys(body)[0] === 'personal') {
		if (Object.keys(body.personal)[0] === 'name'){
			searchTerm = {'personal.name': body.personal.name}
			delete body.personal.name;
		}
		else {
			value = Object.keys(body.personal.address)[0]
			searchTerm = {['personal.address'+value] : body.personal.address[value]};
			delete body.personal.address[value];
		}
	}
	else {
		value = Object.keys(body)[0]
		searchTerm = {[value]: body.value}
		delete body[value]
	}
	return User.find({
		searchTerm
	})
	.then(list => {
		for (let i = 0; i < list.length; i++) {
			for (const key in body) {
				if (key === 'personal'){
					for (const addressKey in body.personal.address){
						if (list[i].personal.address[keyIn] !== body.personal.address[keyIn]){
							list.splice(i, 1);
							i--;
						}
					}
				}
				if (list[i][key] !== body[key]){
					list.splice(i, 1);
					i--;
				}
			}
		}
		if (!list[0]){
			return Promise.reject({status: 400, message: 'No users found that fit search'});
		}
		let retVal = [];
		for (user in list){
			retVal.push(user._id);
		}
		return res.status(200).send(retVal);
	})
	.catch(err => res.status(err.status).send(err.message) )
}

const demoteUser = (req, res) => {
	const token = req.header('x-auth');
	const displayName = _.pick(req.body, ['target']);
	//find current user by their token
	return User.findByToken(token).then(user => {
		if (!user){
			return Promise.reject({status: 400});
		}
		//only master admin can promote users.
		if (user.type !== 'master' ){
			return Promise.reject({status: 401});
		}
		//find target user by their displayName
		return User.findByDisplayName(displayName, token)
		.then(targetUser => {
			if (!targetUser) {
				return Promise.reject({status: 400});
			}
			if(targetUser.type === 'admin'){
				return User.findOneAndUpdate({_id: targetUser._id}, {$set: {type: 'guest'}}, {new: true}).then(user => res.status(200).send(user.displayName));
			}
		})
		.catch(err => res.status(err.status).send(err.message));
	}).catch(err => res.status(err.status).send(err.message));
}

const promoteUser = (req, res) => {
	const token = req.header('x-auth');
	const displayName = _.pick(req.body, ['target']);
	//find current user by their token
	return User.findByToken(token).then(user => {
		if (!user){
			return Promise.reject({status: 400});
		}
		//only master admin can promote users.
		if (user.type !== 'master' ){
			return Promise.reject({status: 401});
		}
		//find target user by their displayName
		return User.findOne({_id: target})
		.then(targetUser => {
			if (!targetUser) {
				return Promise.reject({status: 400});
			}
			switch(targetUser.type) { 
				//admin can be promoted to master admin
				case 'admin':
					return User.findOneAndUpdate({_id: targetUser._id}, {$set: {type: 'master'}}, {new: true}).then(user => res.status(200).send(user.displayName));
				//master admin cannot be promoted. 
				case 'master':
					return Promise.reject({status: 400, message: 'Cannot promote master admin any higher'});
				//clients cannot be promoted to admin.
				case 'client':
					return Promise.reject({status: 400, message: 'Cannot promote clients to admin. Make a new account for admin duties for this user.'});
				//students and "guests" can be promoted to admin.
				case 'student':
				case 'guest':
					return User.findOneAndUpdate({_id: targetUser._id}, {$set: {type: 'admin'}}, {new: true}).then(() => res.status(200).send(user.displayName));
				//this covers all legitimate types.
				default:
					return Promise.reject({status: 400, message: 'invalid user type!'})
			}
		})
		.catch(err => res.status(err.status).send(err.message));
	})
	.catch(err => res.status(err.status).send(err.message));
}

const updateClass = (req, res) => {
	const body = _.pick(req.body, ['target', 'targetClass']);
	const token = req.header('x-auth');
	User.findByToken(token).then(user => {
		if (user.type !== 'admin' && user.type !== 'master') {
			return Promise.reject({status: 401, message: 'invalid privileges to edit user types.'});
		}
		if (targetClass === 'admin' || targetClass === 'master') {
			return Promise.reject({status: 400, message: 'cannot promote users through this method.'});
		}
		User.findOne({_id: target}).then(targetUser => {

		})
	})
}

const updateUser = (req, res) => {
	const body = _.pick(req.body, ['target', 'displayName', 'email', 'company', 'website', 'personal']);
	var token = req.header('x-auth');
	return User.findByToken(token)
	.then(user => {
		if (!user) {
			return Promise.reject({status: 401, message: "no such user"});
		}
		//if target selected, go into target alteration;
		if (body.target){
			return User.findOne({_id:body.target})
			.then(target => {
				if(!target){
					Promise.reject({status: 400, message: "no such target"})
				}
				//only master admin may use this method.
				if (user.type !== 'master')
				{
					Promise.reject({status: 401, message: "insufficient privileges"});
				}
				//personal is an object, so overwriting it will delete original values, even if they aren't changed.
				//... use to prevent this.
				target.personal = {...target.personal, ...body.personal}
				delete body.personal;
				delete body.target;
				for (const key in body) {
					target[key] = body[key];
				}
				target.save()
				.then(() => res.status(200).send(target))
				.catch(err => res.status(401).send(err.message));
			})
		}
		//if there is no target, we're altering the user themselves.
		user.personal = {...user.personal, ...body.personal}
		delete body.personal;
		for (const key in body) {
			user[key] = body[key];
		}
		return user.save()
		.then(() => res.status(200).send(user))
		.catch(err => res.status(401).send(err.message))
	})
	.catch(e => {
		if (e.status){
			res.status(e.status).send(e.message);
		}
		else{
			res.status(401).send(e);
		}
	})
}

module.exports.authenticate = {demoteUser, authByToken, login, updateUser, promoteUser, byDisplayName, returnUsers};