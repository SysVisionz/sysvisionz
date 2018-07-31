const mongoose = require('mongoose');
const _ = require('lodash');

const SkillSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		minlength: 1,
		unique: true
	},
	description: {
		type: String,
		required: true,
		minlength: 1
	}
})

const CategorySchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		minlength: 1,
		unique: true
	},
	description: {
		type: String,
		required: true,
		minlength:1
	},
	skills: [
		{
			type: mongoose.Schema.Types.ObjectId,
			required: true
		}
	]
})

SkillSchema.methods.toJSON = function (id) {
	const skill = this;
	const skillObject = skill.toObject();
	return _.pick(skillObject, ['_id', 'name', 'description'])
}

CategorySchema.methods.toJSON = function(id) {
	const category = this;
	const categoryObject = category.toObject();
	return _.pick(categoryObject, ['_id', 'name', 'description', 'skills'])
}

CategorySchema.methods.addSkill = function(skill) {
	let category = this;
	category.contains = category.contains.concat([skill]);
	return category.save();
}

const Skill = mongoose.model('Skill', SkillSchema);
const Category = mongoose.model('Category', CategorySchema);

module.exports = {Skill, Category};