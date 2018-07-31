const mongoose = require('mongoose');
const _ = require('lodash');

const TutorSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		required: true
	},
	skills: {
		type: Object,
		required: true
	}
})

TutorSchema.methods.toJSON = function (id) {
	const tutor = this;
	const tutorObject = tutor.toObject();
	return _.pick(tutorObject, ['_id', 'user', 'skills'])
}

const Tutor = mongoose.model('Tutor', TutorSchema);

module.exports = {Tutor};