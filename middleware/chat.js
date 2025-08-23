"use strict";
// import User from '../models/User';
// import { Err } from './utils';
// import Chat, {Message} from '../models/Chat';
// export const sendMessage = (user,message) => {
// 	const {token, chat, value} = message
// 	return User.findByToken(token)
// 	.then(user => {
// 		return Chat.find({_id: chat})
// 		.then(thisChat => {
// 			if (thisChat.users.indexOf(user.id) === -1){
// 				Promise.reject({status: 401, message: 'User does not have access to this chat.'})
// 			}
// 		})
// 	})
// 	.catch(err => err)
// }
// const processMessages, (user: typeof User, messages) => {
// 	for (const i in messages){
// 	}
// }
// const constructChat = (user, messages, construct) => {
// 	if (!construct){
// 		construct = [];
// 	}
// 	if (!message[0]){
// 		return construct;
// 	}
// 	const messageId = messages.splice(0,1);
// 	return Message.findOne({
// 		_id : messageId
// 	}).then( message => {
// 		if (message.deletedBy.indexOf(user._id) === -1){
// 			const isNew = message.newFor.user._id;
// 			const {createdAt, value} = message;
// 			const {displayName} = user
// 			construct.push({displayName, createdAt, value, isNew })
// 			return constructChat(user, messages, construct)
// 		}
// 	})
// }
// export const getChat = (req, res) => {
// 	const token = req.header('x-auth');
// 	return User.findByToken(token)
// 	.then(user => {
// 		return Chat.findOne({
// 			_id: req.body._id
// 		})
// 		.then(chat => {
// 			return constructChat(user, chat.messages)
// 			.then( retChat => {
// 				res.status(200).send(retChat)
// 			})
// 		})
// 	})
// }
// export const getChats = (req, res) => {
// 	const token = req.header('x-auth');
// 	return User.findByToken(token)
// 	.then (user => {
// 		return Chat.getChats(user._id)
// 		.then(chats => {
// 			retVal = [];
// 			for (i in chats) {
// 				retVal.push({id: chats[i]._id, name: chats[i].name})
// 			}
// 			return retVal;
// 		})
// 	});
// }
