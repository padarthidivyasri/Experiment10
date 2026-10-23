# Student Management API

This project is a simple Express-based web application that interacts with a SQLite database to perform CRUD (Create, Read, Update, Delete) operations on student records.

## Overview

The application is built using:

- Node.js
- Express.js
- SQLite3

It creates a backend REST API where clients such as Postman or browser-based tools can send HTTP requests to manage student data.

## Project Structure

- `app.js` – contains the Express server, middleware, and all REST API routes.
- `db.js` – initializes the SQLite database and creates the `students` table if it does not already exist.
- `mydatabase.db` – SQLite database file created automatically when the app starts.
- `package.json` – contains project metadata and dependencies.

## Database Setup

The database is created using SQLite, and the application ensures the following table exists:

```sql
CREATE TABLE IF NOT EXISTS students (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  age INTEGER,
  grade TEXT
);
```

The `initializeDatabase()` function in `db.js` connects to the database and creates the table if missing. This ensures the app is ready to store and retrieve student records.

## Express Server Behavior

In `app.js`:

- `express.json()` is used so incoming JSON payloads can be read by the server.
- The app listens on port `3000`.
- It defines routes to handle student CRUD operations.
- It returns JSON responses for both success and error cases.

## API Endpoints

### 1. Home Route

```http
GET /
```

Returns:

```text
Welcome to the Student
```

### 2. Get All Students

```http
GET /students
```

This route fetches all records from the `students` table.

### 3. Get Student by ID

```http
GET /students/:id
```

This route retrieves a single student based on the given `id`.

### 4. Create a New Student

```http
POST /students
```

Example request body:

```json
{
  "name": "Alice",
  "age": 18,
  "grade": "A"
}
```

This route inserts a new record into the database and returns the created student ID.

### 5. Update a Student

```http
PUT /students/:id
```

Example request body:

```json
{
  "name": "Alice",
  "age": 19,
  "grade": "A+"
}
```

This route updates the selected student’s data.

### 6. Delete a Student

```http
DELETE /students/:id
```

This route deletes the student record matching the given ID.

## Validation and Error Handling

The application includes basic validation:

- For create/update requests, `name`, `age`, and `grade` are required.
- If a student is not found, the API returns a `404` response.
- If database or server errors occur, the API returns a `500` response.

## How to Run the Project

1. Install dependencies:

```bash
npm install
```

2. Start the server:

```bash
npm start
```

3. Open the app in the browser or use Postman to hit the API at:

```text
http://localhost:3000
```

## Postman Usage

You can test the API in Postman with the following requests:

- `GET http://localhost:3000/`
- `GET http://localhost:3000/students`
- `GET http://localhost:3000/students/1`
- `POST http://localhost:3000/students`
- `PUT http://localhost:3000/students/1`
- `DELETE http://localhost:3000/students/1`

## Summary

This project demonstrates how to build a minimal REST API using Express and SQLite for student management. It allows users to create, read, update, and delete student records through HTTP requests, making it suitable for learning backend development and API testing with Postman.
