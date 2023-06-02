//import required modules
const { Schema, model, Types } = require("mongoose");
const dayjs = require("dayjs");

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
      default: () => dayjs().add(7, "day").toDate(),
      get: (timestamp) => {
        return dayjs(timestamp).format("DD-MM-YYYY");
      },
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
      default: () => dayjs().add(7, "day").toDate(),
      get: (timestamp) => {
        return dayjs(timestamp).format("DD-MM-YYYY");
      },
    },
    //username
    username: {
      type: Schema.Types.ObjectId,
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
