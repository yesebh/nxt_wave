const request = require('supertest');
const assert = require('chai').assert;
const app = require('../app');
const connection = require('../db');

describe('Task API Routes', () => {

  describe('POST /api/tasks', () => {
    it('should create a new task', (done) => {
      request(app)
        .post('/api/tasks')
        .send({ title: 'Test Task', description: 'Test Description', completed: false })
        .expect(201)
        .end((err, res) => {
          if (err) return done(err);
          assert.exists(res.body.id);
          done();
        });
    });
  });

  describe('GET /api/tasks', () => {
    it('should retrieve all tasks', (done) => {
      request(app)
        .get('/api/tasks')
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          assert.isArray(res.body);
          done();
        });
    });
  });

  describe('PUT /api/tasks/:id', () => {
    it('should update a task', (done) => {
      request(app)
        .put('/api/tasks/1')
        .send({ title: 'Updated Task', description: 'Updated Description', completed: true })
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          assert.equal(res.body.message, 'Task updated successfully');
          done();
        });
    });
  });

  describe('DELETE /api/tasks/:id', () => {
    it('should delete a task', (done) => {
      request(app)
        .delete('/api/tasks/1')
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          assert.equal(res.body.message, 'Task deleted successfully');
          done();
        });
    });
  });
});
