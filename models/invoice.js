const mongoose = require('mongoose');
const _ = require('lodash');

const InvoiceSchema = new mongoose.Schema({
	company: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		minlength: 1
	},
	time: {
		start: {
			type: Date,
			required: true
		},
		finish: {
			type: Date,
			required: true
		}
	},
	total: {
		type: Number,
		required: true
	},
	taskList: [{
		name: {
			type: String,
			minlength: 1
		},
		hours: {
			type: Number
		},
		rate: {
			type: Number
		},
		value: {
			type: Number
		},
		discounts: {
			flat: {
				type: Number
			},
			percent: {
				type: Number
			}
		}
	}],
	remainingBalance: {
		type: Number,
		required: true
	},
	paid: {
		type: Boolean,
		required: true
	},
	comments: [{
		type: String
	}],
	discounts: {
		flat: {
			type: Number
		},
		percent: {
			type: Number
		}
	}
})

InvoiceSchema.statics.findByTimestamp = function (startDate, endDate) {
	const Invoice = this;
	let applicableList;
}

const Invoice = mongoose.model('Invoice', InvoiceSchema);		

module.exports = {Invoice};