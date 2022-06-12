const People = require('../models/people');
const Task = require('../models/task');
const mongoose = require('mongoose');

exports.create_task = (req, res, next) => {
    People.findById(req.body.task)
        .then(people => {
            if (!people) {
                res.status(404).json({
                    message: 'people entry not found'
                })
            }
            const task = new Task({
                _id: new mongoose.Types.ObjectId,
                task: req.body.task,
                task_name: req.body.task_name
            });
            return task.save();
        })
        .then(result => {
            console.log('hello', result)
            res.status(201).json({
                message: 'task is created ',
                data: result
            })
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({
                error: error
            })
        })
}

exports.get_all_tasks = (req, res, next) => {
    console.log('user', process.env.JWT_key)
    Task.find()
        .select("_id task  task_name")
        .populate('task')
        .exec()
        .then(result => {
            console.log(result);
            const response = {
                count: result.length,
                tasks: result
            }
            res.status(200).json({
                message: 'tasks fetched successfully',
                tasks: response
            })
        })
        .catch(error => {
            res.status(500).json({
                error: error
            })
        })
}
exports.get_task_by_id = (req, res, next) => {
    console.log('user', process.env.JWT_key)
    const id = req.params.task
    Task.findById(id)
        .populate('task', 'name')
        .select("_id task task_name")
        .exec()
        .then(
            result => {
                if (!result) {
                    res.status(404).json({
                        message: "Task is not found"
                    })
                }
                res.status(200).json({
                    message: "Task fetched successfully",
                    task: result
                })
            }
        )
        .catch(error => {
            res.status(500).json({
                error: error
            })
        })
}

exports.delete_task = (req, res) => {
    const id = req.params.task
    Task.remove({ _id: id })
        .exec()
        .then(result => {
            res.status(200).json({
                // message: "Task deleted successfully",
                data: result
            })
        })
        .catch(error => {
            res.status(500).json({
                error: error
            })
        })
    return res.status(200).json({
        message: 'Deleted'
    })
}