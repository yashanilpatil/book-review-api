const express = require("express");
const router = express.Router();
const {
  addReview,
  updateReview,
  deleteReview,
} = require("../controllers/reviewController");
const { authenticateToken } = require("../middlewares/authMiddleware");

router.post("/books/:id/reviews", authenticateToken, addReview);
router.put("/reviews/:id", authenticateToken, updateReview);
router.delete("/reviews/:id", authenticateToken, deleteReview);

module.exports = router;
