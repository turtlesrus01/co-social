//import required modules
const { Schema, model, Types, mongoose } = require('mongoose');

//user schema
const userSchema = new Schema(
  {
    //username 
    username: {
      type: String,
      unique: true,
      required: true,
      trimmed: true
    },
    //email
    email: {
      type: String,
      unique: true,
      required: true,
      validate: {
        validator: (value) => {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        },
        message: 'Email validation failed.'
      }
    },
    //thoughts (referencing thought model)
    thoughts: [{
      type: Types.ObjectId,
      ref: 'Thought'
    }],
    //friends (self-reference)
    friends: [{
      type: Types.ObjectId,
      ref: 'User'
    }],
    //toJSON 
    }, 
    {
      toJSON: {
        getters: true,
      },
    }
);

//Create model
const User = model('User', userSchema);

//export User model
module.exports = User;