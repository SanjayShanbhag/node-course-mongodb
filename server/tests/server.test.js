const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server.js');
const {User} = require('./../models/users.js');
const{Todo} = require('./../models/todos.js');

beforeEach((done) => {
  Todo.remove({}).then(() => {
    done();
  });
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

        Todo.find().then((res) => {
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
          expect(res.length).toBe(0);
          done();
        }).catch((err) => {
          done(err);
        });
      });
  });
});
