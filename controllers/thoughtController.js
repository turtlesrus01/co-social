//import models
const { Thought } = require('../models');

//export thought functions
module.exports = { 
  //GET all thoughts
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  //GET one thought by its ID
  async getThought(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.thoughtId })
        .select("-__v")

      if (!user) {
        return res.status(404).json({ message: "No thought exists with that ID" });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  //CREATE a thought
  //UPDATE a thought by its ID
  //DELETE a thought by its ID
  
  //reactions
  //CREATE a reaction
  //DELETE a reaction
}
