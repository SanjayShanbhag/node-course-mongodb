const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server.js');
const {User} = require('./../models/users.js');
const{Todo} = require('./../models/todos.js');

const todos = [{
  _id: new ObjectID(),
  text: 'Some text one'
}, {
  _id: new ObjectID(),
  text: 'Some text two'
}];

beforeEach((done) => {
  Todo.remove({}).then(() => {
    return Todo.insertMany(todos)
  }).then(() => done());
});

describe('Todos /POST', () => {
  it('should add to the database', (done) => {
    request(app)
      .post('/todos')
      .send({
        text: 'Something To Do'
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.text).toBe('Something To Do');
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todo.find({text: 'Something To Do'}).then((res) => {
          expect(res.length).toBe(1);
          expect(res[0].text).toBe('Something To Do');
          done();
        }).catch((e) => {
          done(e);
        });
      });
  });

  it('should not add to the database', (done) => {
    request(app)
      .post('/todos')
      .send({})
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todo.find().then((res) => {
          expect(res.length).toBe(2);
          done();
        }).catch((err) => {
          done(err);
        });
      });
  });
});

describe('GET /todos', () => {
  it('should return all todos', (done) => {
    request(app)
      .get('/todos')
      .expect(200)
      .expect((res) => {
        expect(res.body.todos.length).toBe(2);
      })
      .end(done);
  });
});

describe('GET /todos:id', () => {
  it('should return the todo', (done) => {
    request(app)
    .get(`/todos/${todos[0]._id.toHexString()}`)
    .expect(200)
    .expect((res) => {
      expect(res.body.todo.text).toBe(todos[0].text);
    })
    .end(done);
  });

  it('should return 404', (done) => {
    id = new ObjectID().toHexString();
    request(app)
    .get(`/todos/${id}`)
    .expect(404)
    .end(done);
  });

  it('should return 404', (done) => {
    id = 43
    request(app)
    .get(`/todos/${id}`)
    .expect(404)
    .end(done);
  });
});


describe('DELETE /todos:id', () => {
  it('should delete the todo', (done) => {
    var hexId = todos[0]._id.toHexString();

    request(app)
      .delete(`/todos/${hexId}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo._id).toBe(hexId);
      })
      .end((err, res) => {
        if (err) {
          done(err);
        }

        Todo.findById(hexId).then((todo1) => {
          if (!todo1) {
            done();
          }
        });
      });
  });

  it('should return 404 for invalid id', (done) => {
    request(app)
      .delete('/todos/123')
      .expect(404)
      .end(done);
  });

  it('should return 404 for non-existing id', (done) => {
    var newID = new ObjectID();

    request(app)
      .delete(`/todos/${newID}`)
      .expect(404)
      .end(done);
  });
});
