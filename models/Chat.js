import mongoose, { Schema } from 'mongoose';
const { Types: { ObjectId: oID } } = mongoose;
const message = {
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
};
const ChatSchema = new Schema({
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
            get: function () {
                return this.__nameOf || this.users.map(({ user }) => user);
            },
            set: function (name) {
                this.__nameOf = name;
            }
        }
    },
    methods: {
        toJSON: function () {
            const { messages, users, name } = this.toObject();
            return {
                messages,
                users,
                name,
            };
        },
        chunk({ size = 50, index } = {}) {
            index = index ?? this.messages.length - size;
            const chunk = this.messages.slice(index, index + size);
            return chunk;
        }
    },
    statics: {
        getChats(user) {
            return this.find({ users: { $elechatmMatch: { users: user } } }).lean();
        }
    },
    timestamps: { createdAt: 'createdAt' }
});
const Chat = mongoose.model('Chat', ChatSchema);
export default Chat;
