const express = require('express');
const router = express.Router();
const connection = require('../db');
const { authenticateUser, authorizeUser } = require('../authMiddleware');

// Create a new task
router.post('/createTask', authenticateUser, authorizeUser('admin'), (req, res) => {
  const { title, description, completed } = req.body;
  const sql = 'INSERT INTO tasks (title, description, completed) VALUES (?, ?, ?)';
  connection.query(sql, [title, description, completed], (err, result) => {
    if (err) {
      console.error('Error creating task: ', err);
      res.status(500).json({ error: 'Error creating task' });
      return;
    }
    res.status(201).json({ message: 'Task created successfully', id: result.insertId });
  });
});


// Retrieve all tasks
router.get('/', authenticateUser, authorizeUser('admin'), (req, res) => {
  const sql = 'SELECT * FROM tasks';
  connection.query(sql, (err, results) => {
    if (err) {
      console.error('Error retrieving tasks: ', err);
      res.status(500).json({ error: 'Error retrieving tasks' });
      return;
    }
    res.json(results);
  });
});


// Update a task
router.put('/:id', authenticateUser, authorizeUser('admin'), (req, res) => {
  const id = req.params.id;
  const { title, description, completed } = req.body;
  const sql = 'UPDATE tasks SET title = ?, description = ?, completed = ? WHERE id = ?';
  connection.query(sql, [title, description, completed, id], (err, result) => {
    if (err) {
      console.error('Error updating task: ', err);
      res.status(500).json({ error: 'Error updating task' });
      return;
    }
    res.json({ message: 'Task updated successfully' });
  });
});


// Delete a task
router.delete('/:id', authenticateUser, authorizeUser('admin'), (req, res) => {
  const id = req.params.id;
  const sql = 'DELETE FROM tasks WHERE id = ?';
  connection.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Error deleting task: ', err);
      res.status(500).json({ error: 'Error deleting task' });
      return;
    }
    res.json({ message: 'Task deleted successfully' });
  });
});


// Update a task based on its ID
router.put('/:id', authenticateUser, authorizeUser('admin'), (req, res) => {
  const taskId = req.params.id;
  const { title, description, completed } = req.body;

  const sql = 'UPDATE tasks SET title = ?, description = ?, completed = ? WHERE id = ?';
  connection.query(sql, [title, description, completed, taskId], (err, result) => {
    if (err) {
      console.error('Error updating task: ', err);
      res.status(500).json({ error: 'Error updating task' });
      return;
    }
    res.json({ message: 'Task updated successfully' });
  });
});

module.exports = router;
