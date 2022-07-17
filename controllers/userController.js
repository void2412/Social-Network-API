const {User, Thought} = require('../models')

function getAllUser(req, res){
	User.find()
	.then((user) => res.json(user))
	.catch((err) => res.status(500).json(err))
}

function getSingleUser(req, res){
	User.findOne({_id: req.params.userId})
	.select('-__v')
	.populate('thoughts friends')
	.then((user)=>{
		!user
		? res.status(404).json({error: 'User not found'})
		: res.json(user)
	})
	.catch((err) => res.status(500).json(err))
}

function addUser(req, res){
	User.create(req.body)
	.then((user) => res.json(user))
	.catch((err) => res.status(500).json(err))
}

function editUser(req, res){
	User.findOneAndUpdate(
		{ _id: req.params.userId},
		{...req.body},
		{new: true},
		(err, result) => {
			if(result){
				res.status(200).json(result)
			}
			else{
				res.status(500).json(err)
			}
		}
	)
}

function deleteUser(req, res){
	User.findOneAndDelete({_id: req.params.userId})
	.then((user) => {
		!user
		 ? res.status(404).json({error: 'User not found'})
		 : Thought.deleteMany({_id: {$in: user.thoughts}})
	})
	.then(()=> res.json({message: 'User and its thoughts deleted'}))
	.catch((err) => res.status(500).json(err))
}

module.exports = {getAllUser, getSingleUser, addUser, editUser, deleteUser}