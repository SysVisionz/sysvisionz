const validator = require ('validator');
const mongoose = require('mongoose');
const jwt = require ('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

const ContractSchema = new mongoose.Schema({
	company: {
		type: mongoose.Schema.Types.ObjectId,
		required: true
	},
	signatory: {
		type: mongoose.Schema.Types.ObjectId,
		required: true
	},
	masterTimestamp: {
		type: Date
	}
	clientTimestamp: {
		type: Date,
		required: true
	},
	IP: {
		type: String,
		required: true
	}
})

ContractSchema.methods.sign = function (token, company, IP) {

}

ContractSchema.methods.masterSign = function (token) {

}

ContractSchema.pre('save', function (next) {

})

const Contract = mongoose.model('Contract', ContractSchema);		

module.exports = {Contract};