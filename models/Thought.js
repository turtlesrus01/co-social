//import required modules
const { Schema, model, Types } = require("mongoose");

//reaction schema
const reactionSchema = new Schema(
  {
    //reactionId
    reactionId: {
      type: Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    //reactionBody
    reactionBody: {
      type: String,
      required: true,
      max_length: 280,
    },
    //username
    username: {
      type: String,
      required: true,
    },
    //createdAt
    createdAt: {
      type: Date,
      default: function () {
        return new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
      },
      get: (timestamp) => dateFormat(timestamp),
    },
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

//thought schema
const thoughtSchema = new Schema(
  {
    //thoughtText
    thoughtText: {
      type: String,
      required: true,
      min_length: 1,
      max_length: 280,
    },
    //createdAt
    createdAt: {
      type: Date,
      default: function () {
        return new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
      },
      get: (timestamp) => dateFormat(timestamp),
    },
    //username
    username: {
      type:Types.ObjectId,
      ref: "User",
    },
    //reactions (created with reactionSchema)
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

//Create model
const Thought = model("Thought", thoughtSchema);

//export User model
module.exports = Thought;
