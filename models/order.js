const mongoose = require('mongoose');
const _ = require('lodash');

const OrderSchema = new mongoose.Schema({
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

OrderSchema.methods.toJSON = function (id) {
	const order = this;
	const orderObject = order.toObject();
	return _.pick(orderObject, ['_id', 'timeStamp', 'user', 'type', 'description'])
}

const Order = mongoose.model('Order', OrderSchema);		

module.exports = {Order};