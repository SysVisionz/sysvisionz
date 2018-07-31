const validator = require ('validator');
const mongoose = require('mongoose');
const jwt = require ('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');
const {hashTag} = require ('../db/dataConfig')

const UserSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
		trim: true,
		minlength: 1,
		unique: true,
		validate: {
			validator: 	validator.isEmail,
			message: '{VALUE} is not a valid email.'
		},
	},
	persist: {
		type: Boolean,
	},
	password: {
		type: String,
		required: true,
		minlength: 6
	},
	displayName: {
		type: String,
		minlength: 1,
		unique: true
	},
	photoUrl: {
		type: String,
		validate: {
			validator: validator.isURL,
			message: '{VALUE} is not a valid image file.'
		}
	},
	personal: {
		name: {
			type: String
		},
		greeting: {
			type: String
		},
		street: {
			type: String,
			minlength: 1
		},
		city: {
			type: String,
			minlength: 1
		},
		state: {
			type: String,
			minlength: 1
		},
		zip: {
			type: String,
			minlength: 1
		}
	},
	type: {
		type: String,
		required: true
	},
	contractSigned: {
		type: mongoose.Schema.Types.ObjectId
	},
	company: {
		type: mongoose.Schema.Types.ObjectId
	},
	website: {
		type: String,
		minlength: 1,
		validate: {
			validator: validator.isURL,
			message: '{VALUE} is not a valid URL'
		}
	},
	tokens: [{
		access: {
			type: String,
			required: true
		},
		token: {
			type: String,
			required: true
		}
	}],
	attentions: {
		projects: {
			type: Boolean
		},
		schedule: {
			type: Boolean
		},
		chats: [{
			message: {
				type: mongoose.Schema.Types.ObjectId
			},
			chat: {
				type: mongoose.Schema.Types.ObjectId
			}
		}],
		invoices: {
			type: Boolean
		}
	},
	skills: [
		{
			type: mongoose.Schema.Types.ObjectId
		}
	]
});

UserSchema.methods.toJSON = function () {
	var user = this;
	var userObject = user.toObject();
	return _.pick(userObject, ['_id', 'email', 'personal', 'company', 'website', 'type', 'contractSigned', 'displayName', 'attentions'])
}

UserSchema.methods.generateAuthToken = function () {
	let user = this;
	var access = 'auth';
	var token = jwt.sign({_id: user._id.toHexString(), access}, hashTag).toString();

	user.tokens = user.tokens.concat([{access, token}]);
	return user.save().then(() => token);
}

UserSchema.statics.findByToken = function (token) {
	const User = this;
	let decoded;

	try {
		decoded = jwt.verify(token, hashTag)
	}
	catch (e) {
		return Promise.reject({status: 403, message: 'Invalid token provided'});
	}

	return User.findOne({
		'_id': decoded._id,
		'tokens.token': token,
		'tokens.access': 'auth'
	})
}

UserSchema.methods.removeToken = function (token) {
	var user = this;
	return user.update({
		$pull: {
			tokens: {token}
		}
	})
}

UserSchema.methods.attention = function (attention, value) {
	var user = this;
	target = 'attentions.'+attention
	return user.update({
		$set: {
			[target]: value
		}
	})
}

UserSchema.statics.findByCredentials = function (email, password) {
	const User = this;
	return User.findOne({email}).then( user => {
		if (!user) {
			return Promise.reject({status: 400});
		}
		return new Promise((resolve, reject) => {
			bcrypt.compare(password, user.password, (err, res) => {
				if (res){
					resolve (user);
				}
				else {
					reject({status: 403});
				}
			})
		})
	});
}

UserSchema.statics.findByDisplayName = function ( displayName, token ) {
	const User = this;
	let decoded;

	try {
		decoded = jwt.verify(token, hashTag)
	}
	catch (e) {
		return Promise.reject({status: 403});
	}

	return User.findOne({
		'_id': decoded._id,
		'tokens.token': token,
		'tokens.access': 'auth'
	}).then(currentUser => {
		if (!currentUser) {
			return Promise.reject({status: 400});
		}
		return User.findOne({
			displayName
		})
		.then( targetUser => {
			if (!targetUser) {
				return Promise.reject({status: 400});
			}
			return targetUser._id;
		})
	});
}

UserSchema.pre('save', function (next) {
	var user = this;
	if (user.isModified('password')) {
		bcrypt.genSalt(10, (err, salt) => {
			bcrypt.hash(user.password, salt, (err, hash) => {
				user.password = hash;
				next();
			}); 
		});
	}
	else {
		next();
	}
})

const User = mongoose.model('User', UserSchema);		

module.exports = {User};