// authRoutes.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const router = express.Router();
const connection = require('../db');

// User Authentication
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Check if username exists
  connection.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
    if (err) {
      console.error('Error retrieving user: ', err);
      res.status(500).json({ error: 'Error retrieving user' });
      return;
    }

    if (results.length === 0) {
      res.status(401).json({ error: 'Invalid username or password' });
      return;
    }

    const user = results[0];

    // Check password
    bcrypt.compare(password, user.password, (err, result) => {
      if (err) {
        console.error('Error comparing passwords: ', err);
        res.status(500).json({ error: 'Error comparing passwords' });
        return;
      }

      if (!result) {
        res.status(401).json({ error: 'Invalid username or password' });
        return;
      }

      // Generate JWT
      const token = jwt.sign({ userId: user.id, username: user.username }, process.env["JWT_SECRET_KEY"], { expiresIn: '1h' });
      res.json({ token });
    });
  });
});

module.exports = router;
