const pool = require("../config/db");

exports.addBook = async (req, res) => {
  const { title, author, genre } = req.body;
  await pool.query(
    "INSERT INTO books (title, author, genre, created_by) VALUES ($1, $2, $3, $4)",
    [title, author, genre, req.user.id]
  );
  res.json({ message: "Book added" });
};

exports.getBooks = async (req, res) => {
  const { page = 1, limit = 5, author, genre } = req.query;
  const offset = (page - 1) * limit;

  let query = "SELECT * FROM books WHERE 1=1";
  const params = [];

  if (author) {
    params.push(`%${author}%`);
    query += ` AND author ILIKE $${params.length}`;
  }
  if (genre) {
    params.push(`%${genre}%`);
    query += ` AND genre ILIKE $${params.length}`;
  }

  query += ` LIMIT $${params.length + 1} OFFSET $${params.length + 2}`;
  params.push(limit, offset);

  const result = await pool.query(query, params);
  res.json(result.rows);
};

exports.getBookDetails = async (req, res) => {
  const bookId = req.params.id;
  const bookResult = await pool.query("SELECT * FROM books WHERE id=$1", [
    bookId,
  ]);
  const book = bookResult.rows[0];
  if (!book) return res.status(404).json({ message: "Book not found" });

  const ratingResult = await pool.query(
    "SELECT AVG(rating) FROM reviews WHERE book_id=$1",
    [bookId]
  );
  const averageRating = ratingResult.rows[0].avg;

  const reviewsResult = await pool.query(
    "SELECT * FROM reviews WHERE book_id=$1",
    [bookId]
  );

  res.json({ book, averageRating, reviews: reviewsResult.rows });
};

exports.searchBooks = async (req, res) => {
  const { query: searchText } = req.query;
  const result = await pool.query(
    "SELECT * FROM books WHERE title ILIKE $1 OR author ILIKE $1",
    [`%${searchText}%`]
  );
  res.json(result.rows);
};
