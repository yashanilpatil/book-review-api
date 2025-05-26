const express = require("express");
const router = express.Router();
const {
  addBook,
  getBooks,
  getBookDetails,
  searchBooks,
} = require("../controllers/bookcontroller");
const { authenticateToken } = require("../middlewares/authMiddleware");

router.post("/books", authenticateToken, addBook);
router.get("/books", getBooks);
router.get("/books/:id", getBookDetails);
router.get("/search", searchBooks);

module.exports = router;
