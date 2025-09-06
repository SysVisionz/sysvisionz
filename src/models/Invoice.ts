import mongoose, {Schema, Document, ObjectId, Model} from 'mongoose'

const {Types: {ObjectId: oID}} = mongoose

const invoice= {
	company: {
		type: mongoose.Schema.ObjectId,
		required: true
	},
	project: {
		type: mongoose.Schema.ObjectId,
		required: true
	},
	lineItems: [{
		label: String,
		value: Number,
		quantity: Number
	}],
	paid: Number,
	total: Number
}

export type Invoice = typeof invoice
export type InvoiceUser = {
	user: ObjectId,
	privilege: PrivLevel
	banned: boolean
}

interface InvoiceMethods {
}

interface InvoiceObj extends Document, InvoiceMethods {
	company: ObjectId,
	project: ObjectId,
	lineItems: {
		label: string,
		value: number,
		quantity: number
	}[],
	paid: number
	total: number
}

interface Statics {
	getInvoices: (user: ObjectId) => any
}

interface Virtuals {
	total: number,
	remains: number
}


const InvoiceSchema = new Schema<
InvoiceObj, 
Model<InvoiceObj>,
InvoiceMethods, 
{}, 
Virtuals, 
Statics> ({
	company: {
		type: mongoose.Schema.ObjectId,
		required: true
	},
	project: {
		type: mongoose.Schema.ObjectId,
		required: true
	},
	lineItems: [{
		label: String,
		value: Number,
		quantity: Number
	}],
	paid: Number,
}, {
	virtuals: {
		total: {
			get: function() {
				return this.lineItems?.reduce((acc, item) => acc + (item.value * item.quantity), 0) || 0;
			}
		},
		remains: {
			get: function() {
				return this.total - this.paid;
			}
		}
	},
	methods: {
		toJSON: function() {
			let {company, project, lineItems, paid, total} = this;
			return {company, project, lineItems, paid, total}
		}
	},
	statics: {
		getInvoices(user: ObjectId) {
			return this.find({users: {$elechatmMatch: {users: user}}}).lean()
		}
	},
	timestamps: {createdAt: 'createdAt'}
});
const Invoice = mongoose.model('Invoice', InvoiceSchema);

export default Invoice