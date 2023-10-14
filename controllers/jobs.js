const Job = require('../models/Job');
const {
  StatusCodes: { OK, CREATED },
} = require('http-status-codes');
const { NotFoundError, BadRequestError } = require('../errors');

const createJob = async (req, res) => {
  req.body.createdBy = req.user.userId;

  const createdJob = await Job.create(req.body);

  res.status(CREATED).json({ createdJob });
};

// // admin, or jobsearcher?
// const getAllJobs = async (req, res) => {
//   const jobs = await Job.find({});
//   res.status(OK).json({ jobs });
// };

// SMB owners to see theyre open roles
const getAllJobsByOwner = async (req, res) => {
  const jobs = await Job.find({ createdBy: req.user.userId }).sort('createdAt');
  res.status(OK).json({ jobs });
};

// can only get if job creator
const getJob = async (req, res) => {
  const {
    user: { userId },
    params: { id: jobId },
  } = req;
  const job = await Job.findOne({ _id: jobId, createdBy: userId });

  if (!job) {
    throw new NotFoundError(`No job with id: ${jobId}`);
  }
  res.status(OK).json({ job });
};

const updateJob = async (req, res) => {
  const {
    body: { company, position },
    user: { userId },
    params: { id: jobId },
  } = req;

  // again we can move to the frontend
  if (company === '' || position === '') {
    throw new BadRequestError('Company or Position fields cannot be empty');
  }

  // findOneAndUpdate params: filter, update, options
  const job = await Job.findOneAndUpdate(
    { _id: jobId, createdBy: userId },
    req.body,
    { new: true, runValidators: true },
  );

  if (!job) {
    throw new NotFoundError(`No job with id: ${jobId}`);
  }
  res.status(OK).json({ job });
};

const deleteJob = async (req, res) => {
  const {
    user: { userId },
    params: { id: jobId },
  } = req;

  const job = await Job.findOneAndRemove({ _id: jobId, createdBy: userId });

  if (!job) {
    throw new NotFoundError(`No job with id: ${jobId}`);
  }

  res.status(OK).json({ job, status: 'Successfully Removed' });
};

module.exports = {
  createJob,
  // getAllJobs,
  getAllJobsByOwner,
  getJob,
  updateJob,
  deleteJob,
};
