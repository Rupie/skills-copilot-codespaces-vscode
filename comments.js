// Create web server
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const comments = require('./comments-data');

app.use(bodyParser.json());
app.use(cors());

// GET request
app.get('/comments', (req, res) => {
  res.json(comments);
});

// POST request
app.post('/comments', (req, res) => {
  const newComment = req.body;
  if (newComment.username && newComment.comment) {
    comments.push(newComment);
    res.json(newComment);
  } else {
    res.status(400).json({ error: 'Username and Comment are required.' });
  }
});

// DELETE request
app.delete('/comments/:id', (req, res) => {
  const id = req.params.id;
  comments.splice(id, 1);
  res.json({ success: true });
});

// PUT request
app.put('/comments/:id', (req, res) => {
  const id = req.params.id;
  const updatedComment = req.body;
  if (updatedComment.username && updatedComment.comment) {
    comments.splice(id, 1, updatedComment);
    res.json(updatedComment);
  } else {
    res.status(400).json({ error: 'Username and Comment are required.' });
  }
});

// Start server
app.listen(4001, () => {
  console.log('Server is running on http://localhost:4001');
});