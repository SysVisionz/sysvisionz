const mongoose = require('mongoose');
const {User} = require('./user');
const {Message} = require('./message');
const jwt = require ('jsonwebtoken');

const ChatSchema = new mongoose.Schema({
	users: [{
		type: mongoose.Schema.Types.ObjectId,
		required: true
	}],
	userData: {
		type: Object,
		required: true
	},
	name: {
		type: String,
		minlength: 1
	},
	messages: [{
		type: mongoose.Schema.Types.ObjectId,
		required: true
	}]
});

// ChatSchema.methods.toJSON = function(id) {
// 	const chat = this;
// 	const chatObject = chat.toObject();
// 	return _.pick(chatObject, 'users', 'name', 'messages', 'newTo')
// }

// ChatSchema.methods.myChat = function(id, daysAgo) {
// 	chat = this;
// 	if (chat.users.indexOf(id) === -1){
// 		return Promise.reject({status: 401, message: 'unauthorized for this chat'})
// 	}
// 	let today = new Date;
// 	return Message.find({
// 		chat: chat._id,
// 		user: id
// 	});
// }

// ChatSchema.statics.getMyChats = function(id) {
// 	Chat = this;
// 	return Chat.find({
// 		users: {
// 			$in: [id]
// 		}
// 	})
// }

// ChatSchema.methods.postMessage = function(user, value, connections) {
// 	const chat = this;
// 	let authorized = false;
// 	for (const i in chat.users){

// 	}
// 	if (chat.users.indexOf(user) === -1){
// 		return Promise.reject({status: 401, message: 'unauthorized for this chat'})
// 	}
// 	let newTo = []
// 	for (item of chat.users){
// 		if (item !== user){
// 			newTo.push(item);
// 		}
// 	}
// 	let message = new Message({chat: chat._id, user, value, newTo})
// 	return message.save()
// 	.then(thisMessage => {
// 		chat.messages.push(thisMessage._id)
// 		return chat.save()
// 	})
// }

// ChatSchema.methods.addSocket = function (userId, socketId) {
// 	const chat = this;
// 	const position = chat.userData[userId].sockets.indexOf(socketId);
// 	if (position === -1){
// 		chat.userData[userId].sockets.push(socketId);
// 	}
// 	return chat.save();
// }

// ChatSchema.methods.removeSocket = function (userId, socketId) {
// 	const chat = this;
// 	const position = chat.userData[userId].sockets.indexOf(socketId);
// 	if (position !== -1){
// 		chat.userData[userId].sockets.splice(position, 1);
// 	}
// 	return chat.save();
// }

// ChatSchema.methods.sendMessage = function (userId, socket)

// ChatSchema.methods.opened = function (userId) {
// 	const chat = this;
// 	const delayer = chat.userData[userId].newMessages.length * 10000;
// 	const seenMessages = 
// 	setTimeout(function)
// }

// ChatSchema.methods.deleteMessage = function(id, user) {
// 	chat = this;
// 	target = 'messages.' + id + '.deletedBy.' + user;
// 	return chat.update({
// 		$set: {
// 			[target]: true
// 		}
// 	})
// }

// ChatSchema.methods.removeUser = function(userId, target) {
// 	chat = this;
// 	if (chat.users.indexOf({user, admin:true}) === -1){
// 		return Promise.reject('only admin can remove users')
// 	}
// }

// ChatSchema.methods.promoteUser = function(userId, target) {
// 	chat = this;
// 	userIndex = chat.users.indexOf({user, admin: true})
// 	if (userIndex === -1){
// 		return Promise.reject('only admin can promote users')
// 	}
// }

// ChatSchema.methods.addUser = function(userId, target, admin) {
// 	chat = this;
// 	if (chat.users.indexOf(userId) !== -1){
// 		return Promise.reject('User already has access to this chat');
// 	}
// 	chat.users.push(userId);
// 	chat.userData[userId] = {admin: false, sockets: []}
// }

// ChatSchema.statics.demoteUser = function(userId, target) {
// 	chat = this;
// 	if (chat.users.indexOf({user, admin:true}) === -1){
// 		return Promise.reject('only admin can add users')
// 	}
// }

const Chat = mongoose.model('Chat', ChatSchema);

module.exports = {Chat}