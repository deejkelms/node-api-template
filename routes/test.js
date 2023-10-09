const express = require("express");
const {
  getAllTests,
  getTested,
  postTests,
  patchTested,
  deleteTested,
} = require("../controllers/test");

const router = express.Router();

router.route("/test").get(getAllTests).post(postTests);

router
  .route("/test/:id")
  .get(getTested)
  .patch(patchTested)
  .delete(deleteTested);

module.exports = router;
