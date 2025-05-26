# 📚 Book Review API

A RESTful API built with **Node.js**, **Express.js**, **PostgreSQL**, and **JWT Authentication** for managing books, reviews, and users.

---

## 📦 Tech Stack

- Node.js  
- Express.js  
- PostgreSQL (with Sequelize ORM or pg package)  
- JWT for Authentication  

---

## 🚀 Project Setup Instructions

### 📌 Prerequisites:
- [Node.js](https://nodejs.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [Postman](https://www.postman.com/) for API testing (optional but recommended)

---

## Create  .env file in the project root:

- PORT=5000
- DB_HOST=localhost
- DB_PORT=5432
- DB_USER=your_postgres_username
- DB_PASSWORD=your_postgres_password
- DB_NAME=book_review_api
- JWT_SECRET=your_jwt_secret

## 🗄️ Database Setup
### Create a PostgreSQL database book_review_db and run these SQL schemas:

 CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50),
  email VARCHAR(100) UNIQUE,
  password VARCHAR(255)
);

 CREATE TABLE books (
  id SERIAL PRIMARY KEY,
  title VARCHAR(100),
  author VARCHAR(100),
  genre VARCHAR(50),
  created_by INTEGER REFERENCES users(id)
);

 CREATE TABLE reviews (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  book_id INTEGER REFERENCES books(id),
  rating INTEGER,
  comment TEXT
);

---

## 🚀 Run the Server

- node server.js

---

## 📬 API Endpoints

### 🔒 Authentication
- POST /api/signup → Register new user

- POST /api/login → Login and receive JWT

### 📚 Books
- POST /api/books → Add a new book (Authenticated)

- GET /api/books → Get all books (pagination + optional filter author, genre)

- GET /api/books/:id → Get book details + average rating + reviews

### ✍️ Reviews
- POST /api/books/:id/reviews → Add a review (Authenticated, one per user per book)

- PUT /api/reviews/:id → Update your review

- DELETE /api/reviews/:id → Delete your review



## Run Locally

Clone the project

```bash
  git clone https://github.com/yashanilpatil/book-review-api
```

Go to the project directory

```bash
  cd book-review-api
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```

