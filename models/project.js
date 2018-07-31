const mongoose = require('mongoose');
const _ = require('lodash');
const {User} = require('./user');

const ProjectSchema = new mongoose.Schema({
	timeStamp: {
		type: Date,
		required: true
	},
	users: [{
		type: mongoose.Schema.Types.ObjectId,
		required: true
	}],
	type: {
		type: String,
		required: true,
		minlength: 1
	},
	description: {
		type: String,
		required: true,
		minlength: 1
	},
	events: {
		expected: {
			type: Date
		},
		completed: {
			type: Date
		},
		title: {
			type: String,
			minlength: 1
		},
		description: {
			type: String
		}
	},
	invoices: [{
		type: mongoose.Schema.Types.ObjectId
	}]
})

ProjectSchema.methods.toJSON = function (id) {
	const project = this;
	const projectObject = project.toObject();
	return _.pick(projectObject, ['_id', 'timeStamp', 'user', 'type', 'description'])
}

const notifyList = (userList) => {
	if (!userList[0]){
		return true;
	}
	const user = userList.splice(0,1);
	return User.find({_id: user})
	.then(user => {
		user.attentions.projects = true;
		return user.save().then(() => notifyList(userList));
	})
}

ProjectSchema.pre('save', function(next) {
	var project = this;
	if (project.isModified('events')){
		notifyList(project.users);
	}
	next();
})

const Project = mongoose.model('Project', ProjectSchema);

module.exports = {Project};