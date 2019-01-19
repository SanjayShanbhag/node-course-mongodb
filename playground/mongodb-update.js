const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if(err) {
    return console.log(err);
  }
  db.collection('Todos').findOneAndUpdate({
    _id: new ObjectID("5c42ca0601b91d0fb8e6e81f")
  }, {
    $set: {
      completed: true
    }
  }, {returnOriginal: false}).then((result) => {
    console.log(result);
  })
});
