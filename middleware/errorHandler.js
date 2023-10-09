const { CustomAPIError } = require("../errors/customError");

const errorHandler = (err, req, res, next) => {
  if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({ msg: err.message });
  }
  return res
    .status(500)
    .json({ status: "Something went wrong, please try again", msg: err });
};

module.exports = errorHandler;
