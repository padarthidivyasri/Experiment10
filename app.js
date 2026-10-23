const express = require('express');
const { initializeDatabase } = require('./db');

const app = express();
const port = 3000;
const db = initializeDatabase();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to the Student');
});

app.get('/students', (req, res) => {
  db.all('SELECT * FROM students', [], (err, rows) => {
    if (err) {
      console.error(err.message);
      return res.status(500).json({ error: 'Failed to fetch students' });
    }
    res.json(rows);
  });
});

app.get('/students/:id', (req, res) => {
  const id = req.params.id;

  db.get('SELECT * FROM students WHERE id = ?', [id], (err, row) => {
    if (err) {
      console.error(err.message);
      return res.status(500).json({ error: 'Failed to fetch student' });
    }

    if (!row) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.json(row);
  });
});

app.post('/students', (req, res) => {
  const { name, age, grade } = req.body;

  if (!name || age === undefined || !grade) {
    return res.status(400).json({ error: 'Name, age, and grade are required' });
  }

  db.run(
    'INSERT INTO students (name, age, grade) VALUES (?, ?, ?)',
    [name, age, grade],
    function (err) {
      if (err) {
        console.error(err.message);
        return res.status(500).json({ error: 'Failed to create student' });
      }

      res.status(201).json({ id: this.lastID, name, age, grade });
    }
  );
});

app.put('/students/:id', (req, res) => {
  const id = req.params.id;
  const { name, age, grade } = req.body;

  if (!name || age === undefined || !grade) {
    return res.status(400).json({ error: 'Name, age, and grade are required' });
  }

  db.run(
    'UPDATE students SET name = ?, age = ?, grade = ? WHERE id = ?',
    [name, age, grade, id],
    function (err) {
      if (err) {
        console.error(err.message);
        return res.status(500).json({ error: 'Failed to update student' });
      }

      if (this.changes === 0) {
        return res.status(404).json({ message: 'Student not found' });
      }

      res.json({ id, name, age, grade, message: 'Student updated successfully' });
    }
  );
});

app.delete('/students/:id', (req, res) => {
  const id = req.params.id;

  db.run('DELETE FROM students WHERE id = ?', [id], function (err) {
    if (err) {
      console.error(err.message);
      return res.status(500).json({ error: 'Failed to delete student' });
    }

    if (this.changes === 0) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.json({ deletedID: id, message: 'Student deleted successfully' });
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
