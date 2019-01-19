const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  db.collection('Users').find({name: 'Sanjay Shanbhag'}).count().then((count) => {
    console.log(count);
  });
});
