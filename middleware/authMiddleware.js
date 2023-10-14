// check username, password in post(login) request
// if exist create new JWT
// send back to front-end
// setup authentication so only the request with JWT can access the dasboard

const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { UnauthenticatedError } = require('../errors');

const authMiddleware = async (req, res, next) => {
  const { authorization: authHeader } = req.headers;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new UnauthenticatedError('No token provided');
  }

  const token = authHeader.split(' ')[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const { userId, name } = payload;

    req.user = { userId, name };
    next();
  } catch (error) {
    throw new UnauthenticatedError('Not authorized to access this route');
  }
};

module.exports = authMiddleware;
