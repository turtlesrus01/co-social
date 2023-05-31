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

  //Array of user data
  try {
    // Create an array of user data
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

    const createdUsers = await User.insertMany(userData);
    
    console.log('Users seeded successfully!', createdUsers);
    console.table(createdUsers)
    process.exit(0);
  } catch (err) {
    console.log('Error seeding users!', err);
  }

})
