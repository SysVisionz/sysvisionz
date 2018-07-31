const mongoose = require('mongoose');
const _ = require('lodash');

const BlogSchema = new mongoose.Schema({
	createdOn: {
		type: Date,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	edits: [{
		prevTitle: {
			type: String,
			minlength: 1
		},
		prevContent: {
			type: String,
			minlength: 1,
		},
		editor: {
			type: mongoose.Schema.Types.ObjectId
		},
		editedOn: {
			type: Date
		}
	}],
	tags: [{
		type: String
	}],
	_creator: {
		type: mongoose.Schema.Types.ObjectId,
		required: true
	},
	title: {
		type: String,
		required: true,
		minlength: 1
	},
	content: {
		type: String,
		required: true,
		minlength: 1
	}
}, {timestamps: {createdAt:'createdAt'}})

BlogSchema.methods.toJSON = function (id) {
	const blog = this;
	const blogObject = blog.toObject();
	return _.pick(blogObject, ['_id', 'createdOn', 'edited', '_creator', 'content', 'description', 'title'])
}

const Blog = mongoose.model('Blog', BlogSchema);		

module.exports = {Blog};