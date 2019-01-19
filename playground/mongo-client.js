const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if(err) {
    return console.log('There was an error');
  }
  console.log('The connection to MongoDB was successsfully established!');

  var obj = new ObjectID();
  console.log(obj);
  // db.collection('Todos').insertOne({
  //   text: 'Something to do',
  //   completed: false
  // }, (err, result) => {
  //   if(err) {
  //     return console.log('There was some error: ', err);
  //   }
  //
  //   console.log(JSON.stringify(result.ops, undefined, 2));
  // });
  //
  // db.collection('Users').insertOne({
  //   name: 'Sanjay Shanbhag',
  //   age: 21,
  //   location: 'Bangalore'
  // }, (err, result) => {
  //   if(err) {
  //     return console.log('There was some error ', err);
  //   }
  //
  //   console.log(JSON.stringify(result.ops, undefined, 2));
  // });
  db.close();
});
