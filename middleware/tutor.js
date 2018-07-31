const {User, Skill, Category, Tutor} = require('../models');

const getTutorData = (req, res) => {
	const token = req.header('x-auth')
	return User.findByToken(token).then(user => {
		if (!user){
			return Promise.reject({status: 401, message: "Not signed in. Create an account."})
		}
		Tutor.find({user: user._id})
		.then( tutor => {
			if (!tutor){
				return Promise.reject({status: 400, message: "No tutoring data for this user."})
			}
			return res.status(200).send(tutor)
		})
	})
	.catch(err => res.status(err.status).send(err.message));
} 

const sendTutorData = (req, res) => {
	const token = req.header('x-auth');
	const body = req.body;
	return User.findByToken(token)
	.then(user => {
		if (!user) {
			return Promise.reject({status: 401, message: "Not signed in. Create an account."})
		}
		Tutor.findOne({user: user._id})
		.then( tutor => {
			if (!tutor) {
				tutor = new Tutor({user: user._id});
			}
			skills = {}
			for (const key in body) {
				skills = {...tutor.skills, [key]: {requested: body[key]}}
			}
			tutor.skills = {...tutor.skills, ...skills}
			return tutor.save().then( result => res.status(200).send(result));
		})
	})
	.catch(err => res.status(err.status).send(err.message))
}

const getTutoringData = (req, res) => {
	Skill.find()
	.then(skills => {
		Category.find()
		.then(categories => {
			res.status(200).send({skills, categories});
		})
	})
}

const addSkillToCategories = (categories, skill) => {
	if (!categories || !categories[0]){
		return true;
	}
	return Category.findOne({_id: categories[0]})
	.then(category => {
		categories.splice(0,1);
		category.skills = category.skills.concat([skill]);
		return category.save().then(addSkillToCategories(categories, skill))
	})
}

const newSkill = (req, res) => {
	const token = req.header('x-auth')
	const body = req.body;
	console.log(body);
	let skill = new Skill({name: body.name, description: body.description});
	skill.save().then(skill => {
		if (body.categories){
			addSkillToCategories(body.categories, skill._id)
		}
		return res.status(200).send(skill);
	})
	.catch(err => res.status(400).send(err))
}

const editSkill = (req, res) => {
	const token = req.header('x-auth')
	const body = req.body;
	return User.findByToken(token)
	.then( user => {
		if (!user || user.type !== 'master'){
			return Promise.reject({status: 401, message: "Only master admin can edit tutoring categories."})
		}
		Skill.findOne({_id: body._id})
		.then(skill => {
			if (!skill) {
				return Promise.reject({status: 400, message: "No skill at that ID"})
			}
			for (const key in body) {
				skill[key] = body[key];
			}
			return skill.save()
			.then(editSkill => res.status(200).send(editSkill))
		})
		.catch(err => res.status(err.status).send(err.message))
	});
}

const editCategory = (req, res) => {
	const token = req.header('x-auth')
	const body = req.body
	return User.findByToken(token).then( user => {
		if (!user || user.type !== 'master'){
			return Promise.reject({status: 401, message: "Only master admin can edit tutoring categories."})
		}
		Category.findOne({_id: body._id})
		.then(category => {
			for (const item in body) {
				if (body[item]){
					category[item] = body[item];
				}
			}
			return category.save()
			.then (newCategory => res.status(200).send(newCategory))
		})
	})
	.catch(err => res.status(err.status).send(err.message))
}

const newCategory = (req, res) => {
	const token = req.header('x-auth')
	const body = req.body
	return User.findByToken(token).then( user => {
		if(!user || user.type !== 'master'){
			return Promise.reject({status: 401, message: "Only master admin can add categories."})
		}
		let category = new Category(body)
		category.save().then(cat => res.status(200).send(cat))
		.catch(err => res.send(err))
	})
	.catch(err => res.status(400).send(err))
}

module.exports.tutor = {
	getTutorData,
	sendTutorData, 
	getTutoringData,
	newSkill,
	newCategory,
	editSkill,
	editCategory
}