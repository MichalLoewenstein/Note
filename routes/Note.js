const express = require('express');
const router = express.Router();

let notes = [];

// @route   GET /api/notes
// @desc    Get all notes
router.get('/', (req, res) => {
  res.json(notes);
});

// @route   POST /api/notes
// @desc    Create a new note
router.post('/', (req, res) => {
  const { title, content } = req.body;
  const newNote = { id: Date.now().toString(), title, content };
  notes.push(newNote);
  res.status(201).json(newNote);
});

// @route   GET /api/notes/:id
// @desc    Get a note by ID
router.get('/:id', (req, res) => {
  const note = notes.find(n => n.id === req.params.id);
  if (!note) return res.status(404).json({ message: 'Note not found' });
  res.json(note);
});

// @route   PUT /api/notes/:id
// @desc    Update a note
router.put('/:id', (req, res) => {
  const { title, content } = req.body;
  const note = notes.find(n => n.id === req.params.id);
  if (!note) return res.status(404).json({ message: 'Note not found' });

  note.title = title || note.title;
  note.content = content || note.content;

  res.json(note);
});

// @route   DELETE /api/notes/:id
// @desc    Delete a note
router.delete('/:id', (req, res) => {
  const noteIndex = notes.findIndex(n => n.id === req.params.id);
  if (noteIndex === -1) return res.status(404).json({ message: 'Note not found' });

  notes.splice(noteIndex, 1);
  res.json({ message: 'Note removed' });
});

module.exports = router;