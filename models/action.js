const mongoose = require('mongoose');
const _ = require('lodash');

const ActionSchema = new mongoose.Schema({
	timeStamp: {
		type: Date,
		required: true
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		required: true
	},
	type: {
		type: String,
		required: true,
		minlength: 1
	},
	description: {
		type: String,
		required: true,
		minlength: 1
	}
})

const Action = mongoose.model('Action', ActionSchema);		

module.exports = {Action};