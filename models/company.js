const mongoose = require('mongoose');
const _ = require('lodash');

const CompanySchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		minlength: 1
	},
	tags: [{
		type: String,
		minlength: 1
	}],
	details: {
		address: {
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
		employees: {
			type: Number
		},

	},
	contractSigned: {
		signatory: {
			type: mongoose.Schema.Types.ObjectId
		},
		stored: {
			type: String
		},
		timeStamp: {
			type: Date
		}
	},
	address: {
		type: String,
		minlength: 1
	},
	representative: {
		name: {
			type: String,
			minlength: 1
		},
		account: {
			type: mongoose.Schema.Types.ObjectId
		}
	},
	billing: {
		period: {
			type: Date
		},
		startDate: {
			type: Date
		},
		address: {
			type: String,
			minlength: 1
		}
	},
	users: [{
		account: {
			type: mongoose.Schema.Types.ObjectId,
			required: true
		},
		privileges: {
			type: Number
		}
	}],
	privilegeCategories: [{
		level: {
			type: Number
		},
		description: {
			type: String,
			minlength: 1
		},
		read: {
			type: Boolean
		},
		write: {
			type: Boolean
		}
	}]
})

CompanySchema.methods.toJSON = function (id) {
	const company = this;
	const companyObject = company.toObject();
	return _.pick(companyObject, ['_id', 'name', 'details', 'contractSigned', 'representative', 'billing', 'users', 'privilegeCategories'])
}

CompanySchema.statics.findByIdentifiers = function (name, tags, location) {

}

const Company = mongoose.model('Company', CompanySchema);		

module.exports = {Company};