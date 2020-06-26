const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const port = 8000;
const app = express();

//model user
const User = require('./models/User');
//connects us to a local mongoDB database called: userData.
mongoose.connect('mongodb://localhost/userData');

app.use(bodyParser.json());

app.listen(port, () => {
  console.log(`server is listening on port:${port}`)
})

// CREATE >> creates an ID 
app.post('/users', (req, res) => {
  // User.create()
})

app.route('/users/:id')
  // READ
  .get((req, res) => {
    // User.findById()
  })
  // UPDATE
  .put((req, res) => {
    // User.findByIdAndUpdate()
  })
  // DELETE
  .delete((req, res) => {
    // User.findByIdAndDelete()
  })