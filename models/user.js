// const mongose = require('mongoose');
// const userSchema = mongose.Schema({
//     _id : mongose.Schema.Types.ObjectId,
//     name: {type: String, required: true},
//     email: {type: String,
//          required : true,
//         unique: true,
//         match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
//         },
//     password: {type: String, required: true}
// });
// module.exports = mongose.model('user',userSchema);

const mongoose = require('mongoose');
const crypto = require('crypto');
const UserSchema = new mongoose.Schema({

  firstName: {
    type: String,
    trim: true,
    // required: 'fName is required'
  },
  lastName: {
    type: String,
    trim: true,
    // required: 'lName is required'
  },
  email: {
    type: String,
    trim: true,
    unique: 'Email already exists',
    match: [/.+\@.+\..+/, 'Please fill a valid email address'],
    // required: 'Email is required'
  },
//   password: {type: String, required: true}
password: {
    type: String,
    // required: "Password is required"
  },
  updated: Date,
  created: {
    type: Date,
    default: Date.now
  },
  address:{
	type: String,
  },
  shipping_address:{
	type: String,
  },
  primary_number:{
	type: String,
  },

  status:{
	type: String,
  },
  role:{
	type: Number,
  },
  profile_image:{
	type: String,
  },
  state:{
	type: String,
  },
  city:{
	type: String,
  },
  zipcode:{
	type: String,
  },
  street_address:{
    type: String,
  }
})
// UserSchema.plugin(passportLocalMongoose); 

// export default mongoose.model('User', UserSchema)
module.exports = mongoose.model('users',UserSchema);