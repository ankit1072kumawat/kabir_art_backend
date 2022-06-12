const express = require('express');
const mongose = require('mongoose');
const router = express.Router();
const Task = require('./../models/task');
const People = require('../models/people')
const checkAuth = require('./../middleware/check-auth')
const taskController = require('./../controllers/task');

router.get('/', checkAuth, taskController.get_all_tasks)

router.post('/task', checkAuth, taskController.create_task)

router.get('/:task', checkAuth, taskController.get_task_by_id)

// delete is not working
router.delete('/:task', checkAuth, taskController.delete_task)
module.exports = router