//import models
const { Thought, User } = require("../models");

//export thought functions
module.exports = {
  //GET all thoughts
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },
  //GET one thought by its ID
  async getThought(req, res) {
    try {
      //Find specific thought
      const thought = await Thought.findOne({
        _id: req.params.thoughtId,
      }).select("-__v");
      //Check if valid thought
      if (!thought) {
        return res
          .status(404)
          .json({ message: "No thought exists with that ID" });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  //CREATE a thought
  async createThought(req, res) {
    try {
      //Create thought
      const thought = await Thought.create(req.body);
      //Find appropriate user
      const user = await User.findById(req.body.userId);
      //Check if valid user
      if (!user) {
        return res.status(404).json({ message: "No user exists with that ID" });
      }
      //Save thought to specific user
      user.thoughts.push(thought._id);
      await user.save();

      res.json(thought);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  //UPDATE a thought by its ID
  async updateThought(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!thought) {
        return res
          .status(404)
          .json({ message: "No thought exists with that ID" });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  //DELETE a thought by its ID
  async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndDelete({
        _id: req.params.thoughtId,
      });

      if (!thought) {
        return res
          .status(404)
          .json({ message: "No thought exists with that ID" });
      }

      res.json({ message: "Thought deleted." });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  //reactions
  //CREATE a reaction
  async createReaction(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId });

      if (!thought) {
        return res
          .status(404)
          .json({ message: "No thought exists with that ID" });
      }

      thought.reactions.push(req.body);
      await thought.save();

      res.json(thought);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  //DELETE a reaction
  async deleteReaction(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId });

      if (!thought) {
        return res
          .status(404)
          .json({ message: "No thought exists with that ID" });
      }

      const reactionIndex = thought.reactions.findIndex(
        (reactions) => reactionIndex.reactionId === req.params.reactionId
      );

      if (reactionIndex === -1) {
        return res
          .status(404)
          .json({ message: "No reaction exists with that ID" });
      }

      thought.reactions.splice(reactionIndex, 1);
      await thought.save();

      res.json({ message: "Reaction deleted." });
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
