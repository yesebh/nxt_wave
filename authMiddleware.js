// authMiddleware.js
const jwt = require('jsonwebtoken');

function authenticateUser(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized: No token provided' });
  }

  jwt.verify(token, process.env["JWT_SECRET_KEY"], (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Unauthorized: Invalid token' });
    }

    req.user = decoded;
    next();
  });
}

// Middleware to restrict access based on user role
function authorizeUser(role) {
  return (req, res, next) => {
    if (req.user.role !== role) {
      return res.status(403).json({ error: 'Forbidden: You do not have permission to access this resource' });
    }
    next();
  };
}

module.exports = { authenticateUser, authorizeUser };
