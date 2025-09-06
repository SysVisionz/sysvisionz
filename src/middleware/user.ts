import UserModel, {levelFromPriv} from '../models/User';
import { Err, authenticate } from './utils';
import { NextApiRequest, NextApiResponse } from 'next';

const login: Middleware = async (req: NextApiRequest, res: NextApiResponse) => {
	const {email, displayName, password, persist} = req.body;
	if (!((email|| displayName) || password)){
		res.status(400).send("Email or Display Name and Password required.")
	}
	const error = new Err(res)
	UserModel.findByCredentials({email, displayName}, password).then( user => {
		if (!user){
			throw Error("User does not exist")
		}
		else {
			user.persist = persist;
			return user.generateAuthToken().then(token => {
				return res.setHeader('x-auth', token).send(user);
			}).catch(({message}) => error.send({status: 400, message}));
		}
	}).catch(({message}) => error.send({status: 402, message}));
}

const invite = (req: NextApiRequest, res: NextApiResponse) => {
	const {email, user, company, privs = 'client'} = req.body;
	
}


const oAuthLogin: Middleware = async (req, res) => {
	const {type = "google", token, persist}: {type: 'google', token: string, persist: boolean} = req.body;
	const error = new Err(res)
	return new Promise<void>(() => {
		return oAuthRouting[type](token).then(({email}) => {
			return UserModel.findOne({email}).then( user => {
				if (!user){
					throw {message: "User with this email does not exist in the database.", status: 401}
				}
				user.persist = persist
				return user.generateAuthToken().then(token => {
					return res.header('x-auth', token).send(user)
				}).catch(err => error.send(err))
			}).catch(err => error.send(err))
		}).catch(err => error.send(err))
	}).catch(err => error.send(err))
}

const oAuthRouting = new Proxy({} as {[K in 'google']: (token: string) => Promise<{email: string}>}, {
	get: (t: {[K in 'google']: (token: string) => Promise<{email: string}>}, p: 'google') => {
		return new Promise((resolve, reject) =>{
			switch (p){
				case 'google':
					resolve({email: ''})
				default: 
					reject("Invalid OAuth type.")
			}
		})
	},
	set: () => {
		throw "read only"
	}
})

const resetPassword = (req: NextApiRequest, res: NextApiResponse) => {
	// todo: we're going to use this to create an email.
	const {EMAIL: email} = process.env
}

const register = (req: NextApiRequest, res: NextApiResponse) => {
	const {email, displayName, password, persist} = req.body
	const error = new Err(res)
	UserModel.findOne({$or: [{email}, {displayName}]}).then(existing => {
		if (existing){
			res.status(401).send(`user with this ${email === existing.email ? "email" : "display name"} already exists.`)
			return;
		}
		const user = new UserModel({email, displayName, password, persist, privs: "user"})
		user.save().then(() => {
			res.send("User registration successful!")
		}).catch(() => error.send())
	}).catch(() => error.send())
}

export {login, register};