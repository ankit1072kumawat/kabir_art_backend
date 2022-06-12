const mongoose = require('mongoose');
const peopleSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userId: {type: Number},
    name: { type: String, required: true },
    mobile: String,
    email: { type: String, required: true },
    address: String,
    image: { type: String },
});
module.exports = mongoose.model('People', peopleSchema);