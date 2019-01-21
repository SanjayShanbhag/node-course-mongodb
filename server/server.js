const express = require('express');
const bodyParser = require('body-parser');

const {mongoose} = require('./db/mongoose.js');
const {User} = require('./models/users.js');
const {Todo} = require('./models/todos.js');

var app = express();
app.use(bodyParser.json());

app.post('/todos', (req,res) => {
  var todo = new Todo({
    text: req.body.text
  });

  todo.save().then((docs) => {
    res.send(docs);
  }, (e) => {
    res.status(400).send(e);
  });
});


app.get('/todos', (req, res) => {
  Todo.find().then((todos) => {
    res.send({todos});
  }, (err) => {
    res.status(400).send(err);
  });
});

app.listen('3000', () => {
  console.log('The server is up on port 3000');
});

module.exports = {
  app
}
