const Test = require("../models/Test");
const CustomAPIError = require("../errors/customError");

const getAllTests = async (req, res) => {
  const tests = await Test.find({});
  res.status(200).json({ tests });
};

const postTests = async (req, res) => {
  const test = await Test.create(req.body);
  res.status(201).json({ test });
};

const getTested = async (req, res) => {
  const { id: testID } = req.params;
  const test = await Test.findOne({ _id: testID });

  if (!test) {
    throw new CustomAPIError(`No test with id: ${testID}`, 404);
  }
  res.status(200).json({ test });
};

const deleteTested = async (req, res) => {
  const { id: testID } = req.params;
  const test = await Test.findOneAndDelete({ _id: testID });

  if (!test) {
    throw new CustomAPIError(`No test with id: ${testID}`, 404);
  }

  res.status(200).json({ test, status: "Successfully Removed" });
};

const patchTested = async (req, res) => {
  const { id: testID } = req.params;

  // params: filter, update, options
  const test = await Test.findOneAndUpdate({ _id: testID }, req.body, {
    new: true,
  });

  if (!test) {
    throw new CustomAPIError(`No test with id: ${testID}`, 404);
  }

  res.status(200).json({ test });
};

module.exports = {
  postTests,
  getAllTests,
  getTested,
  patchTested,
  deleteTested,
};
