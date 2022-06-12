const express = require('express');
const router = express.Router();
const userController = require('./../controllers/user')

router.post('/signup', userController.create_user)

router.post('/login', userController.login_user)

router.get('/', userController.get_all_users)

router.get('/:userId', userController.get_user_by_id)

router.delete('/:userId', userController.delete_user)
module.exports = router