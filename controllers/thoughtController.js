const error = require('mongoose/lib/error')
const {User, Thought} = require('../models')

function getAllThought(req, res){
	Thought.find()
	.then((user) => res.json(user))
	.catch((err) => res.status(500).json(err))
}

function getSingleThought(req, res){
	Thought.findOne({_id: req.params.thoughtId})
	.select('-__v')
	.then((thought)=>{
		!thought
		 ? res.status(404).json({error: 'Thought not found'})
		 : res.json(thought)
	}
	)
	.catch((err) => res.status(500).json(err))
}

async function addThought(req, res){
	try{
	var user = await User.findOne({_id: req.body.userId})
	if(!user){
			res.status(404).json({error: 'User not found'})
			return
	}
	var thought = await Thought.create({
		thoughtText: req.body.thoughtText,
		username: req.body.username
	})
	var userUpdated = await User.findOneAndUpdate(
			{_id: req.body.userId},
			{$addToSet: {thoughts: thought._id}},
			{runValidators: true, new:true}
		)

	res.status(200).json(userUpdated)
	}
	catch(err){
		res.status(500).json(err)
        return
	}
}

function editThought(req, res){
	Thought.findOneAndUpdate(
		{_id: req.params.thoughtId},
		{$set: req.body},
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

async function removeThought(req, res){
	try{
	var thoughtDeleted = await Thought.findOneAndDelete({_id: req.params.thoughtId})
	if (!thoughtDeleted){
		res.status(404).json({error:'Thought not found'})
		return
	}
	var userUpdated = await User.findOneAndUpdate(
		{username: thoughtDeleted.username},
		{$pull: {thoughts: thoughtDeleted._id}},
		{runValidators: true, new: true},
		)
	if(userUpdated){
		res.status(200).json({message:'thought deleted'})
		return
	}
	else{
		res.status(404).json({error:'User not found'})
		return
	}
	}
	catch(err){
		res.status(500).json(err)
        return
	}
}

function addReaction(req, res){
	Thought.findOneAndUpdate(
		{_id: req.params.thoughtId},
		{$addToSet: {reactions: req.body}},
		{runValidators: true, new: true}
	)
	.then((thought)=>{
		!thought
		 ? res.status(404).json({error: 'Thought not found'})
		 : res.json(thought)
	})
	.catch((err) => res.status(500).json(err))
}

function removeReaction(req, res){
	Thought.findOneAndUpdate(
        {_id: req.params.thoughtId},
		{$pull: {reactions: req.body}},
		{runValidators: true, new: true}
	)
	.then((thought)=>{
		!thought
		 ? res.status(404).json({error: 'Thought not found'})
		 : res.json(thought)
	})
	.catch((err) => res.status(500).json(err))
}

module.exports = {getAllThought, getSingleThought, addThought, editThought, removeThought, addReaction, removeReaction}