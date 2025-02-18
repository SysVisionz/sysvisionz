import User, {levelFromPriv} from '../models/User';
import { Request, Response } from 'express';
import { Err, authenticate } from './utils';

const login: Middleware = async (req: Request, res: Response) => {
	const {email, displayName, password, persist} = req.body;
	if (!((email|| displayName) || password)){
		res.status(400).send("Email or Display Name and Password required.")
	}
	User.findByCredentials({email, displayName}, password).then( user => {
		user.persist = persist;
		return user.generateAuthToken().then(token => {
			return res.header('x-auth', token).send(user);
		}).catch(err => Err(err, res));
	}).catch(err => Err(err, res));
}

const oAuthLogin: Middleware = async (req, res) => {
	const {type = "google", token, persist}: {type: 'google', token: string, persist: boolean} = req.body;
	return new Promise<void>(() => {
		return oAuthRouting[type](token).then(({email}) => {
			return User.findOne({email}).then( user => {
				if (!user){
					throw {message: "User with this email does not exist in the database.", status: 401}
				}
				user.persist = persist
				return user.generateAuthToken().then(token => {
					return res.header('x-auth', token).send(user)
				}).catch(err => Err(err, res))
			}).catch(err => Err(err, res))
		}).catch(err => Err(err, res))
	}).catch(err => Err(err, res))
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

const resetPassword = (req: Request, res: Response) => {
	// todo: we're going to use this to create an email.
	const {EMAIL: email} = process.env
}

const register = (req: Request, res: Response) => {
	const {email, displayName, password, persist} = req.body
	User.findOne({$or: [{email}, {displayName}]}).then(existing => {
		if (existing){
			res.status(401).send(`user with this ${email === existing.email ? "email" : "display name"} already exists.`)
			return;
		}
		const user = new User({email, displayName, password, persist, privs: "user"})
		user.save().then(() => {
			res.send("User registration successful!")
		})
	})
}

export {login, register};