const mongoose = require('mongoose');
const postsSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    // user: {type : mongoose.Schema.Types.ObjectId, required: true , ref : 'People'},
    user: {type: String, required: true},
    title: { type: String, required: true },
    description: String,
    category: { type: String, required: true },
    keyword: [],
    created_at:  String,
    image: { type: String },
});
module.exports = mongoose.model('Posts', postsSchema);