
const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');

//import port and express variable
const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

//Port listening function
db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}!`);
  });
});
