const socketIO = require ('socket.io');
const http = require ('http');
const express = require ('express');
const _ = require ('lodash');
const {MongoClient} = require ('mongodb');
const bodyParser = require ('body-parser');
const jwt = require ('jsonwebtoken');
const {mongoose, hashTag} = require ('./db/dataConfig');
const {authenticate, blog, tutor, chat} = require('./middleware');
const {User, Blog} = require('./models');

var app = express();
var server = http.createServer(app);
var io = socketIO.listen(server);

const token = input => jwt.sign(input, hashTag);

var mongoclient = new MongoClient("localhost", 27017);

app.use(express.static('build'));

app.use(bodyParser.json());

let connectionsEnding = {};

let connectedUsers = {};

io.on('connection', socket => {
	socket.on('signIn', userToken => {
		if (connectedUsers[userToken]){
			connectedUsers[userToken].push(socket.id);
		}
		else {
			connectedUsers[userToken] = [socket.id];
		}
		socket.userToken = userToken;
		if (connectionsEnding[socket.userToken]){
			clearTimeout(connectionsEnding[socket.userToken]);
			connectionsEnding[socket.userToken] = undefined;
		}
	})
	socket.on('disconnect', () => {
		User.findByToken(socket.userToken)
		.then (user => {
			if (!user.persist){
				connectionsEnding[socket.userToken] = setTimeout( () => {
					user.removeToken(socket.userToken)
					.then(() => console.log('user removed token'));
				}, 10000);
			}
		})
		if (connectedUsers[socket.userToken]){
			connectedUsers[socket.userToken].splice(connectedUsers[socket.userToken].indexOf(socket.id), 1);
		}
	})
	// socket.on('chatPost', message => {
	// 	User.findByToken(socket.userToken)
	// 	.then(user => {
	// 		Chat.find({_id: message.chat})
	// 		.then (chat => {
	// 			chat.postMessage(user._id, message.value)
	// 		})
	// 	})
	// })
	// socket.on('chatEdit', message => {
	// 	User.findByToken(socket.)
	// })
})

app.get('/chat/get', chat.getChat)

app.get('/chat/list', chat.getChats)

app.post('/users', (req, res) => {
	let body = _.pick(req.body, ['email', 'password', 'persist'])
	console.log(body);
	body.displayName =body.email.substr(0, body.email.indexOf('@'))
	body.type = "guest";
	let user = new User (body);
	user.generateAuthToken()
	.then(token => res.status(200).header('x-auth', token).send(user))
	.catch(e => res.status(400).send({mongoCode: e}));
});

app.get('/users/me', authenticate.authByToken)

app.get('/users/byDisplay', authenticate.byDisplayName)

app.post('/users/promote', authenticate.promoteUser);

app.delete('/users/logout', (req, res) => {
	User.findByToken(req.header('x-auth'))
	.then( user => {
		user.removeToken(req.header('x-auth'))
		.then(() => {
			res.status(200).send();
		}, err => {
			res.status(400).send();
		});
	})
});

app.post('/users/search', authenticate.returnUsers)	

app.post('/users/demote', authenticate.demoteUser)

app.post('/users/login', authenticate.login)

app.post('/users/update', authenticate.updateUser)

app.post('/blog/submit', blog.newBlog);

app.post('/blog/edit', blog.editBlog)

app.post('/blog/list', blog.getBlogList);

app.get('/blog/get', blog.getBlog);

app.post('/tutor/skill', tutor.newSkill);

app.post('/tutor/category', tutor.newCategory);

app.get('/tutor/me', tutor.getTutorData);

app.get('/tutor/data', tutor.getTutoringData);

app.post('/tutor/submit', tutor.sendTutorData);

app.post('/tutor/edit/skill', tutor.editSkill);

app.post('/tutor/edit/category', tutor.editCategory);

server.listen(8080, () => console.log('server up on port 8080'));