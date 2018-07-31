const mongoose = require('mongoose');
const validator = require('validator');
const {Ability} = require('ability');

const MonsterSchema = new mongoose.Schema({
	name: {
		type: String,
		minlength: 1,
		required: true,
		unique: true,
	},
	description: {
		type: String,
		minlength: 1,
		required: true,
		unique: true
	}
	thumbnail: {
		type: String,
		minlength: 1,
		required: true,
		unique: true,
		validate: {
			validator: validator.isURL
			message: "{VALUE} is not a valid URL"
		}
	},
	thumbnail: {
		type: String,
		minlength: 1,
		required: true,
		unique: true,
		validate: {
			validator: validator.isURL
			message: "{VALUE} is not a valid URL"
		}
	},
	baseStats: {
		element1: {
			type: String,
			minlength: 1,
			required: true
		},
		element2: {
			type: String,
			minlength: 1
		},
		strength: {
			type: Number,
			required: true
		},
		intelligence: {
			type: Number,
			required: true
		},
		defense: {
			type: Number,
			required: true
		}
	},
	abilities: [{
		ability: {
			type: mongoose.Schema.Types.ObjectId,
			required: true
		},
		level: {
			type: Number,
			required: true
		}
	}],

})