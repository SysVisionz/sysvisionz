import validator from 'validator';
import mongoose, {Schema, Document, Model, ObjectId, FlatRecord } from 'mongoose';
import jwt, { JwtPayload } from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { hashTag } from '../db/dataConfig';

export interface CompanyObj extends Document{
	_id: ObjectId,
	name: string,
	phone: string,
	email: string,
	address: Address,
	website: string,
	logo: string,
	industry: string,
	description: string,
	size: number,
	users: [{
		id: ObjectId,
		accounts?: boolean,
		privilege: PrivLevel
		banned: boolean
	}],
	invited: [{
		email: string,
		token: string,
		privilege: string
	}],
	
	
}
interface CompanyMethods {
	userHasAtLeast: (user: ObjectId, priv: PrivLevel) => boolean,
}

interface QueryHelpers {
}

const CompanySchema = new Schema<
	CompanyObj,
	Model<CompanyObj>,
	CompanyMethods,
	{},
	{
		hasAtLeast: {[P in PrivLevel]: boolean}
	},
	QueryHelpers
>  (
	{
		name: {
			type: String,
			required: true,
			unique: true,
		},
		email: {
			type: String,
			required: true,
			trim: true,
			validate: {
				validator: (value: string) => validator.isEmail(value),
				message: '{VALUE} is not a valid email'
			}
		},
		phone: {
			type: String,
			required: true,
			trim: true,
			validate: {
				validator: (value: string) => validator.isMobilePhone(value, 'any', {strictMode: false}),
				message: '{VALUE} is not a valid phone number'
			}
		},
		address: {
			street: {
				type: String,
				required: true,
				trim: true
			},
			city: {
				type: String,
				required: true,
				trim: true
			},
			state: {
				type: String,
				required: true,
				trim: true
			},
			zip: {
				type: String,
				required: true,
				trim: true
			},
			country: {
				type: String,
				required: true,
				trim: true
			}
		},
		website: {
			type: String,
			trim: true,
		},
		logo: {
			type: String,
			trim: true,
		},
		industry: {
			type: String,
			trim: true,
		},
		description: String,
		size: Number,
		users: [{
			id: {
				type: mongoose.Schema.ObjectId,
				required: true
			},
			accounts: {
				type: Boolean,
				default: false
			},
			privilege: {
				type: String,
				enum: {values: ["admin", "accounts", "mod", "user"], message: "only admin, accounts, mod, and user are acceptable privilege levels."}
			},
			banned: {
				type: Boolean,
				default: false
			}
		}],
		invited: [{
			email: {
				type: String,
				required: true,
				trim: true,
				validate: {
					validator: (value: string) => validator.isEmail(value),
					message: '{VALUE} is not a valid email'
				}
			},
			token: {
				type: String,
				required: true
			},
			privilege: {
				type: String,
				enum: {values: ["admin", "mod", "user"], message: "only admin, accounts, mod, and user are acceptable privilege levels."}
			}
		}]
	}, {
		methods: {
			userHasAtLeast: function (user: ObjectId, priv: PrivLevel) {
				const userObj = this.users.find((u) => u.id.toString() === user.toString());
				if (!userObj) return false;
				const userPriv = ['user', 'mod', 'admin'].indexOf(userObj.privilege as string) as 0|1|2;
				const requiredPriv = ['user', 'mod', 'admin'].indexOf(priv as string) as 0|1|2;
				return userPriv >= requiredPriv;
			},
			userHasAccounts: function (user: ObjectId) {
				return !!this.users.find((u: CompanyObj["users"][number]) => u.id.toString() === user.toString())?.accounts;
			},
			sendInvite: function (email: string, token: string, privilege: PrivLevel) {
				this.invited.push({email, token, privilege});
				return this.save();
			}
		},
		statics: {
		},
		timestamps: true
	}
)

const Company = mongoose.model('Company', CompanySchema);

export default Company;