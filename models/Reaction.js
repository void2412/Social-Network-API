const {Schema, Types} = require('mongoose');
const formatTime = require('../utils/formatTime')

const reactionSchema = new Schema(
	{
		reactionId:{
			type: Schema.Types.ObjectId,
			default: () => new Types.ObjectId()
		},
		reactionBody:{
			type: String,
			required: true,
			maxLength: 280
		},
		username:{
			type: String,
			required: true
		},
		createdAt:{
			type: Date,
			default: new Date(),
			get: formatTime
		}
	},
	{
		toJSON: {
			getters: true
		},
		_id: false
		
	}
)

module.exports = reactionSchema