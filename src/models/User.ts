
import mongoose, { models, model } from 'mongoose';

const userSchema = new mongoose.Schema({

name: {
    type: String,
    required: [true, "Provide name"]
},
email: {
    type: String,
    required: [true, "provide email"],
    unique: true
},
password: {
    type: String,
    required: [true, "provide password"]
},
role: {
  type: String,
  enum: ['ADMIN', "USER"],
  default: "USER"
}

});

const User = models.Userlist || model('Userlist', userSchema);

export default User;