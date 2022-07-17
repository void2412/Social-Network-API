const connection = require('../config/connection')
const {User, Thought} = require('../models')

const userData = require('./userData.json')
const thoughtData = require('./thoughtData.json')
const reactionData = require('./reactionData.json')

connection.on('error', (err)=> console.error(err))

connection.once('open', async()=>{
	console.log('connected')

	await User.deleteMany({})
	await Thought.deleteMany({})

	await User.collection.insertMany(userData)

	var user = await User.find()
	
	// add owner of thought to thoughtData
	thoughtData.forEach((thought)=>
	{
		var userIndex = Math.floor(Math.random()*user.length)
		thought.username = user[userIndex].username
		let numOfReaction = Math.floor(Math.random() * 6)
		let reactionList = []
		for (let i=0; i<numOfReaction; i++){
			let reaction = {
				reactionBody: reactionData[Math.floor(Math.random()* reactionData.length)].reactionBody,
				username: user[Math.floor(Math.random()* user.length)].username
			}
			reactionList.push(reaction)
		}
		thought.reactions = reactionList
	})

	Thought.collection.insertMany(thoughtData)

	var thoughtsData = await Thought.find()

	thoughtsData.forEach(async (thought)=>{
		// adding thought to user using username
		await User.findOneAndUpdate(
			{username: thought.username},
			{$addToSet: {thoughts: thought._id}}
			)
	})

	thoughts = await Thought.find()
	console.log(thoughts)


	console.info('Finished seeding')
	process.exit()
})