const express = require('express');
const {
  // getAllJobs,
  getAllJobsByOwner,
  getJob,
  createJob,
  updateJob,
  deleteJob,
} = require('../controllers/jobs');

const router = express.Router();

router.route('/').get(getAllJobsByOwner).post(createJob);
router.route('/:id').get(getJob).patch(updateJob).delete(deleteJob);

module.exports = router;
