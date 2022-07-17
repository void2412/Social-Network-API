const router = require('express').Router()

const {
	getAllUser,
	getSingleUser,
	addUser,
	editUser,
	deleteUser,
	addFriend,
	removeFriend
} = require('../../controllers/userController')

router.route('/').get(getAllUser).post(addUser)

router.route('/:userId').get(getSingleUser).delete(deleteUser).put(editUser)

router.route('/:userId/friends/:friendId').delete(removeFriend).post(addFriend)

module.exports = router