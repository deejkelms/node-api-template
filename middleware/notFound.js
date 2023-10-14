const { StatusCodes } = require('http-status-codes');

const notFound = (req, res) =>
  res
    .status(StatusCodes.NOT_FOUND)
    .send(`${StatusCodes.NOT_FOUND} | Page not found`);

module.exports = notFound;
