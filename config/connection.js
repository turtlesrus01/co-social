const { connect, connection } = require('mongoose');

//connection URI
const connectionString = 'mongodb://127.0.0.1:27017/co-socialDB';

//connect to mongoDB
connect(connectionString);

//export this file
module.exports = connection;