import mongoose, {Schema, Document, ObjectId, Model} from 'mongoose'

const {Types: {ObjectId: oID}} = mongoose

const message= {
	user: {
		type: mongoose.Schema.ObjectId,
		required: true
	},
	value: {
		type: String,
		minLength: 1,
		required: true
	},
	deletedBy: [oID],
	newFor: [oID],
	privileged: String
}

export type Message = Omit<typeof message, 'privileged'> & {
	privileged?: 'admin' | 'mod' | 'user'
}

export type MessageUser = {
	user: ObjectId,
	privilege: 'admin' | 'mod' | 'user'
	banned: boolean
}

interface ChatMethods {
	toJSON: () => {messages: Message[], users: MessageUser[]},
	chunk: ({size, index}: {size?: number, index?: number}) => Message[]
}

interface ChatObj extends Omit<Document, "toJSON">, ChatMethods {
	__nameOf: string,
	name: string | (ObjectId)[],
	messages: Message[],
	users: MessageUser[]
}

interface Statics {
	getChats: (user: ObjectId) => any
}

interface Virtuals {
	name: string | (ObjectId)[]
}


const ChatSchema = new Schema<
ChatObj, 
Model<ChatObj>,
ChatMethods, 
{}, 
Virtuals, 
Statics> ({
	__nameOf: String,
	messages: [message],
	users: [{
		user: oID,
		privilege: String,
		banned: Boolean
	}]

}, {
	virtuals: {
		name: {
			get: function() {
				return this.__nameOf || this.users.map(({user}) => user)
			},
			set: function(name) {
				this.__nameOf = name as string
			}
		}
	},
	methods: {
		toJSON: function() {
			const {messages, users, name} = this.toObject();
			return {
				messages,
				users,
				name,

			}
		},
		chunk ({size = 50, index}: {size?: number, index?: number } = {}) {
			index = index ?? this.messages.length - size
			const chunk = this.messages.slice(index, index + size);
			return chunk;
		}
	},
	statics: {
		getChats(user: ObjectId) {
			return this.find({users: {$elechatmMatch: {users: user}}}).lean()
		}
	},
	timestamps: {createdAt: 'createdAt'}
});
const Chat = mongoose.model('Chat', ChatSchema);

export default Chat