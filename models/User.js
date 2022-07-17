const {Schema, model} = require('mongoose')


const userSchema= new Schema(
	{
		username: {
			type: String,
			required: true,
			unique: true,
			trim: true
		},
		email:{
			type: String,
			required: true,
			unique: true,
			match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/, 'Please fill in valid email address']
		},
		thoughts:[{
			type: Schema.Types.ObjectId,
			ref: 'Thought'
		}],
		friends:[{
			type: Schema.Types.ObjectId,
			ref: 'User'
		}]
	},
	{
		toJSON: {
			virtuals:true
		},
		id: false
	}
)

const User = model('User', userSchema)

module.exports = User