const Test = require("../models/Test");
const asyncWrapper = require("../middleware/async");
const { createCustomError } = require("../errors/customError");

const getAllTests = asyncWrapper(async (req, res) => {
  const tests = await Test.find({});
  res.status(200).json({ tests });
});

const postTests = asyncWrapper(async (req, res) => {
  const test = await Test.create(req.body);
  res.status(201).json({ test });
});

const getTested = asyncWrapper(async (req, res) => {
  const { id: testID } = req.params;
  const test = await Test.findOne({ _id: testID });

  if (!test) {
    return next(createCustomError(`No test with id: ${testID}`, 404));
  }
  res.status(200).json({ test });
});

const deleteTested = asyncWrapper(async (req, res) => {
  const { id: testID } = req.params;
  const test = await Test.findOneAndDelete({ _id: testID });

  if (!test) {
    return next(createCustomError(`No test with id: ${testID}`, 404));
  }

  res.status(200).json({ test, status: "Successfully Removed" });
});

const patchTested = asyncWrapper(async (req, res) => {
  const { id: testID } = req.params;

  // params: filter, update, options
  const test = await Test.findOneAndUpdate({ _id: testID }, req.body, {
    new: true,
  });

  if (!test) {
    return next(createCustomError(`No test with id: ${testID}`, 404));
  }

  res.status(200).json({ test });
});

module.exports = {
  postTests,
  getAllTests,
  getTested,
  patchTested,
  deleteTested,
};
