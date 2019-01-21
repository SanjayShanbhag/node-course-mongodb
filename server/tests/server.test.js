const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server.js');
const {User} = require('./../models/users.js');
const{Todo} = require('./../models/todos.js');

const todos = [{
  text: 'Some text one'
}, {
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
