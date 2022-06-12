const mongose = require('mongoose')
const taskSchema = mongose.Schema({
    _id :  mongose.Schema.Types.ObjectId,
    task: {type : mongose.Schema.Types.ObjectId, required: true , ref : 'People'},
    task_name: {type: String, required: true}
})
module.exports = mongose.model('Task',taskSchema);