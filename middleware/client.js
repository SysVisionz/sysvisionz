const _ = require('lodash');
const {User} = require('../models');

const sendMessage = (user, message, chat) => {
	const {id} = user;
	//push data to chat websocket. Push data to user's chat record.
}

const getMessages = user => {
	const {id} = user;
	//receive all chat messages for current user. Do not alter central message record.
}

const getUserData = user => {
	const {id} = user;
	//retrieve current user's email, personal information (name, photo, email, address, greeting, website), company information (company name, logo, address, website)
}

const sendUserData = (user, data) => {
	//edit current user's data.
}

const getTutorData = user => {
	const {id} = user;
	//retrieve categories active, make those skills active, then retrieve all tutor skills active
	//if all skills in a category are active, label category as active and remove skills from record
}

const sendTutorData = (user, data) => {
	//check if skills activated and deactivated make for a category completed or make a category incomplete.
	//deactivate or activate category appropriately, add or remove individual skills otherwise.
}

const promote = (user, target, category) => {
	//promote target to category, record who took action.
}

const demote = (user, target, category) => {
	//demote target to category, record who took action.
}

const returnUsers = user => {
	//ereturn users list.
}

const newBlog = (user, blogName, blogContents) => {
	//submit blog entry.
}

const editBlog = (user, blogName, blogContents) => {
	//edit blog entry.
}

const getBlogs = () => {
	//retrieve blogs.
}

const getProjects = user => {
	//get project data for this user.
}

const getProjectData = (user, project) => {
	//retrieve project.
}

const getInvoices = user => {
	//retrieve invoices index for user.
}

const getInvoiceData = (user, invoice) => {
	//retrieve invoice.
}

module.exports.data = {}