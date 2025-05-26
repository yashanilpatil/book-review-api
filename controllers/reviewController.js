const pool = require("../config/db");

exports.addReview = async (req, res) => {
  const bookId = req.params.id;
  const { rating, comment } = req.body;

  const existing = await pool.query(
    "SELECT * FROM reviews WHERE user_id=$1 AND book_id=$2",
    [req.user.id, bookId]
  );
  if (existing.rows.length > 0)
    return res.status(400).json({ message: "Already reviewed" });

  await pool.query(
    "INSERT INTO reviews (user_id, book_id, rating, comment) VALUES ($1, $2, $3, $4)",
    [req.user.id, bookId, rating, comment]
  );
  res.json({ message: "Review added" });
};

exports.updateReview = async (req, res) => {
  const reviewId = req.params.id;
  const { rating, comment } = req.body;

  const reviewResult = await pool.query("SELECT * FROM reviews WHERE id=$1", [
    reviewId,
  ]);
  const review = reviewResult.rows[0];
  if (!review || review.user_id !== req.user.id)
    return res.status(403).json({ message: "Unauthorized" });

  await pool.query(
    "UPDATE reviews SET rating=$1, comment=$2 WHERE id=$3",
    [rating, comment, reviewId]
  );
  res.json({ message: "Review updated" });
};

exports.deleteReview = async (req, res) => {
  const reviewId = req.params.id;

  const reviewResult = await pool.query("SELECT * FROM reviews WHERE id=$1", [
    reviewId,
  ]);
  const review = reviewResult.rows[0];
  if (!review || review.user_id !== req.user.id)
    return res.status(403).json({ message: "Unauthorized" });

  await pool.query("DELETE FROM reviews WHERE id=$1", [reviewId]);
  res.json({ message: "Review deleted" });
};
