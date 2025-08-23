import validator from 'validator';
import mongoose, {Schema, Document, Model, ObjectId, FlatRecord } from 'mongoose';
import jwt, { JwtPayload } from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { hashTag } from '../db/dataConfig';

export interface ProjectObj extends Document{
	_id: ObjectId,
	name: string,
	company?: ObjectId,
	description: string,
	stage?: string,
	alert?: boolean,
	users?: {
		admin: ObjectId[],
		accounts: ObjectId[],
		moderator: ObjectId[],
		user: ObjectId[]
	}
	estimate?: Date,
	projects?: ObjectId[]
	invoices?: ObjectId[]
}
interface ProjectMethods {
}

type QueryReturn = Promise<
  (Document<ObjectId, {}, FlatRecord<ProjectObj>> &
    FlatRecord<ProjectObj> &
    Required<{ _id: ObjectId }> & { __v?: number | undefined })[]
>;


const ProjectSchema = new Schema<
	ProjectObj, 
	Model<ProjectObj>,
	ProjectMethods,
	{},
	{}
>  (
	{
		name: {type: String, required: true},
		company: Schema.Types.ObjectId,
		description: {type: String, required: true},
		stage: String,
		alert: Boolean,
		users: {
			admin: [Schema.Types.ObjectId],
			accounts: [Schema.Types.ObjectId],
			moderator: [Schema.Types.ObjectId],
			user: [Schema.Types.ObjectId]
		},
		estimate: Date,
		projects: [Schema.Types.ObjectId],
		invoices: [Schema.Types.ObjectId]
	}, {
		virtuals: {
		},
		methods: {
			toJSON: function() {
			},
		},
		statics: {
			findByCompany: function(company: ObjectId){ return this.find({company})},
			findByUser: function(user: ObjectId){ return this.find({user})}
		}
	}
)

const ProjectModel = mongoose.model('Project', ProjectSchema);

export default ProjectModel;