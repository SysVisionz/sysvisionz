const _ = require('lodash');
const {Blog, User} = require('../models');

const newBlog = (req, res) => {
	let body = _.pick(req.body, ['content', 'title', 'description']);
	var token = req.header('x-auth');
	User.findByToken(token).then(user => {
		if (!user || (user.type !== 'master' && user.type !== 'admin')) {
			return Promise.reject({status: 401, message: 'Insufficient privileges to post blog'});
		}
		body.createdOn = new Date;
		body._creator = user;
		const blog = new Blog(body);
		blog.save()
		.then(() => {
			res.status(200).send();
		}).catch(e => {
			res.status(400).send(e);
		});
	}).catch(e => res.status(e.status).send(e.message));
}

const editBlog = (req, res) => {
	const token = req.header('x-auth');
	let body = _.pick(req.body, ['_id', 'content', 'title', 'description']);
	User.findByToken(token)
	.then(user => {
		if (!user || (user.type !== 'master' && user.type !== 'admin')){
			Promise.reject({status: 401, message: 'Insufficient privileges to edit blog.'})
		}
		Blog.findOne({_id: body._id})
		.then(blog => {
			blog= {...blog, content: body.content, title: body.title, description: body.description};
			return blog.save().then(editedBlog => res.status(200).send(editedBlog))
		})
	})
	.catch(err => res.status(err.status).send(err.message));
}

const getBlogList = (req, res) => {
	const body = _.pick(req.body, ['searchString', 'searchTags', 'searchStartDate', 'searchEndDate', 'inContent']);
	if (!body[0]){
		return Blog.find().then(ret => {
			let retVal = []
			for (item of ret){
				retVal.push({_id: item._id, title: item.title, description: item.description})
			}
			return res.status(200).send(retVal);
		})
	}
	const titleSearch = body.searchString;
	const contentSearch = body.inContent ? body.searchString : undefined;
	return Blog.find()
	.where('title').search(titleSearch)
	.where('content').search(contentSearch)
	.where('createdAt').gt(body.searchStartDate).lt(body.searchEndDate)
	.where('tags').in(body.tags)
	.then(ret => {
		let retVal = []
		for (item of ret){
			retVal.push({_id: item._id, title: item.title, description: item.description})
		}
		return res.status(200).send(retVal);
	});
}

const overlap = (tags, arr, matchAll) => {
	for (tag of tags) {
		if (!matchAll && arr.indexOf(tag) !== -1) {
			return true;
		}
		if (matchAll && arr.indexOf(tag) === -1){
			return false;
		}
	}
	return matchAll ? true : false;
}

const getBlog = (req, res) => {
	const _id = req.header('_id');
	Blog.findOne({_id}).then( blogFound => {
		if (!blogFound) {
			return Promise.reject({status: 400, message: "No such Blog"})
		}
		return res.status(200).send(blogFound);
	}).catch( err => res.send(err) );
}

module.exports.blog = {newBlog, editBlog, getBlogList, getBlog}