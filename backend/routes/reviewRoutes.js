const express = require("express");
const router = express.Router();

const {
  authenticateUser,
} = require("../middleware/authentication");

const {
  createReview,
  getAllReviews,
  getSingleReview,
  updateReview,
  deleteReview,
} = require("../controllers/reviewController");

router.route('/').post(authenticateUser, createReview).get(getAllReviews)
router
  .route("/:id")
  .patch(authenticateUser, updateReview)
  .get(getSingleReview)
  .delete(authenticateUser,deleteReview);



module.exports = router
