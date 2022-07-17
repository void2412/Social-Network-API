const {connect, connection} = require('mongoose')


const connectString = process.env.MONGODB_URI

connect(connectString,{
	useNewUrlParser: true,
	useUnifiedUrlParser: true
})

module.exports = connection