import mongoose, {Schema, Document, ObjectId, Model, mongo} from 'mongoose'

export interface MeetingDetails {
	user: ObjectId | {
		firstName: string,
		lastName: string,
		location: string,
		timezone: string,
	},
	guests: (ObjectId | {
		email: string
	})[],
	representatives: {
		id: ObjectId,
		status: "tentative" | "accepted" | "declined"
	},
	external: {
		service: "google" | "zoom" | "discord"
		id: string
	}
	priority: 1 | 2 | 3 | 4,
}

interface MeetingMethods {
	make: (user: MeetingDetails["user"], representatives: MeetingDetails["representatives"],) => Promise<boolean>
	edit: (details: Partial<Omit<MeetingDetails, 'external'>>) => Promise<boolean>
}

interface Statics {
	getMeetings: (user: ObjectId) => any
}

interface Virtuals {
	name: string | (ObjectId)[]
}

const MeetingSchema = new Schema<
MeetingDetails, 
Model<MeetingDetails>,
MeetingMethods, 
{}, 
Virtuals, 
Statics> ({
	user: Schema.Types.ObjectId,
	guests: [Schema.Types.Mixed],
	representatives: [Schema.Types.ObjectId],
	external: {
		service: String,
		id: String
	},
	priority: Schema.Types.Int32
}, {
	methods: {
		make: function(){ return new Promise((res, rej) => {
				res(false)
			})
		},
		edit: function(details){
			return new Promise((res, rej) => {
				res(false)
			})
		}
	},
	statics: {
		getMeetings(user: ObjectId) {
			return this.find({users: {$elechatmMatch: {users: user}}}).lean()
		}
	},
	timestamps: {createdAt: 'createdAt'}
});
const Meeting = mongoose.model('Meeting', MeetingSchema);

export default Meeting