const express = require('express');
const cors = require('cors');
const pool = require('./db');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/tasks', async (req, res) => {
  const { rows } = await pool.query('SELECT * FROM tasks ORDER BY id');
  res.json(rows);
});

app.post('/tasks', async (req, res) => {
  const { rows } = await pool.query(
    'INSERT INTO tasks (title) VALUES ($1) RETURNING *',
    [req.body.title]
  );
  res.status(201).json(rows[0]);
});

app.put('/tasks/:id', async (req, res) => {
  const { rows } = await pool.query(
    'UPDATE tasks SET done = $1 WHERE id = $2 RETURNING *',
    [req.body.done, req.params.id]
  );
  res.json(rows[0]);
});

app.delete('/tasks/:id', async (req, res) => {
  await pool.query('DELETE FROM tasks WHERE id = $1', [req.params.id]);
  res.status(204).end();
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`API démarrée sur le port ${PORT}`));
