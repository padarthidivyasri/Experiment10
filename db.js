const sqlite3 = require('sqlite3').verbose();

function initializeDatabase() {
  const db = new sqlite3.Database('./mydatabase.db', (err) => {
    if (err) {
      console.error('Database connection error:', err.message);
    } else {
      console.log('Connected to the SQLite database.');
    }
  });

  db.serialize(() => {
    db.run(`
      CREATE TABLE IF NOT EXISTS students (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        age INTEGER,
        grade TEXT
      )
    `, (err) => {
      if (err) {
        console.error('Table creation error:', err.message);
      } else {
        console.log('The students table has been created or already exists.');
      }
    });
  });

  return db;
}

module.exports = { initializeDatabase };
