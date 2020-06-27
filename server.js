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

function sendResponse(res, err, data) {
  if (err) {
    res.json({
      success: false,
      message: err
    })
  } else if (!data) {
    res.json({
      success: false,
      message: "Not Found"
    })
  } else {
    res.json({
      success: true,
      data: data
    })
  }
}

// CREATE >> creates an ID 
app.route('/users')
  .get((req, res) => {
    User.find(
      (err, data) => sendResponse(res, err, data)
    )
  })
  .post((req, res) => {
    User.create(
      { ...req.body.newData },
      (err, data) => sendResponse(res, err, data)
    )
  })

app.route('/users/:id')
  // READ
  .get((req, res) => {
    User.findById(
      req.params.id, (err, data) => sendResponse(res, err, data)
    )
  })
  // UPDATE
  .put((req, res) => {
    User.findByIdAndUpdate(
      req.params.id,
      { ...req.body.newData },
      {
        new: true
      },
      (err, data) => sendResponse(res, err, data)
    )
  })
  // DELETE
  .delete((req, res) => {
    User.findByIdAndDelete(
      req.params.id,
      (err, data) => {
        if (err) {
          res.json({
            success: false,
            message: err
          })
        } else if (!data) {
          res.json({
            success: false,
            message: "Not Found"
          })
        } else {
          res.json({
            success: true,
            data: data
          })
        }
      }
    )
  })