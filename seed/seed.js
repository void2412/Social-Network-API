const connection = require('../config/connection')
const {User, Thought} = require('../models')

const data = require('./data.json')

connection.on('error', (err)=> console.error(err))

connection.once('open', async()=>{
	console.log('connected')

	await User.deleteMany({})
	await Thought.deleteMany({})

	await User.collection.insertMany(data)

	console.info('Finished seeding')
	process.exit()
})