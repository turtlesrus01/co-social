//import connection, models 
const connection = require('../config/connection')
const { User, Thought } = require('../models');

//handle error on execution
connection.on('error', (err) => err)

connection.once('open', async () => {
  console.log('Connected.');
  //Drop existing users
  await User.deleteMany({});
  //Drop existing thoughts
  await Thought.deleteMany({});

  try {
    //Create an array of user data
    const userData = [
      {
        username: 'user1',
        email: 'user1@example.com',
        thoughts: [],
        friends: [],
      },
      {
        username: 'user2',
        email: 'user2@example.com',
        thoughts: [],
        friends: [],
      },
      {
        username: 'user3',
        email: 'user3@example.com',
        thoughts: [],
        friends: [],
      },
      {
        username: 'user4',
        email: 'user4@example.com',
        thoughts: [],
        friends: [],
      },
      {
        username: 'user5',
        email: 'user5@example.com',
        thoughts: [],
        friends: [],
      },
    ];
    //Insert users into collection then log success
    const createdUsers = await User.insertMany(userData);
    console.log('Users seeded successfully!', createdUsers);

    //Pull user ids to assign thoughts
    const userIds = createdUsers.map(user => user._id);

    //Create an array of thoughts
    const thoughts = [
      {
        thoughtText: 'Thought 1',
        username: userIds[0],
      },
      {
        thoughtText: 'Thought 2',
        username: userIds[1],
      },
      {
        thoughtText: 'Thought 3',
        username: userIds[2],
      },
    ];

    //Insert users into collection then log success
    const createdThoughts = await Thought.create(thoughts);
    console.log('Users seeded successfully!', createdThoughts);

    //Exit connection
    process.exit(0);
  } catch (err) {
    console.log('Error seeding users and/or thoughts!', err);
  }

});
