const mongoose = require('mongoose');
const {User} = require('./user')
const jwt = require ('jsonwebtoken');

const MessageSchema = new mongoose.Schema({
	chat: {
		type: mongoose.Schema.Types.ObjectId,
		required: true
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		required: true
	},
	value: {
		type: String,
		required: true
	},
	deletedBy: [{
		type: mongoose.Schema.Types.ObjectId
	}],
	newFor: [{
		type: mongoose.Schema.Types.ObjectId
	}]
}, {timestamps: {createdAt: 'createdAt'}});

MessageSchema.methods.toJSON = function(id) {
	const message = this;
	const messageObject = chat.toObject();
	return _.pick(messageObject, '_id', 'user', 'value', 'deletedBy', 'newFor')
}

const Message = mongoose.model('Message', MessageSchema);

module.exports = {Message}