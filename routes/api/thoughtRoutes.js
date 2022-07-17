const router = require('express').Router()

const {
	getAllThought,
	getSingleThought,
	addThought,
	editThought,
	removeThought,
	addReaction,
	removeReaction
} = require('../../controllers/thoughtController')
const { remove } = require('../../models/Reaction')


router.route('/').get(getAllThought).post(addThought)
router.route('/:thoughtId').get(getSingleThought).put(editThought).delete(removeThought)

router.route('/:thoughtId/reactions').post(addReaction).delete(removeReaction)
module.exports = router