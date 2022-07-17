require('dotenv').config()

const {connect, connection} = require('mongoose')


const connectString = process.env.MONGODB_URI || process.env.local_uri

connect(connectString,{
	useNewUrlParser: true,
	useUnifiedUrlParser: true
})

module.exports = connection