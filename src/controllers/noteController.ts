import { Request, Response } from 'express';
import { mockedNotes } from '../utils/Notes';
import { v4 as uuidv4 } from 'uuid';
import * as yup from 'yup';
import { Note } from '../Types/Note';
import { noteSchema } from '../models/Note';

const notes: Note[] = [...mockedNotes];

export const createNote = (req: Request, res: Response) => {
  try {
    noteSchema.validateSync(req.body);

    const newNote: Note = {
      id: uuidv4(),
      name: req.body.name,
      date: req.body.date,
      category: req.body.category,
      content: req.body.content,
      created: new Date().toISOString(),
    };

    notes.push(newNote);

    res.status(201).json(newNote);
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An internal server error occurred.' });
    }
  }
};

export const deleteNote = (req: Request, res: Response) => {
  const noteId = req.params.id;

  const noteIndex = notes.findIndex((note) => note.id === noteId);

  if (noteIndex === -1) {
    res.status(404).json({ error: 'Note not found' });
    return;
  }

  const deletedNote = notes.splice(noteIndex, 1)[0];

  res.status(200).json({ message: 'Note deleted successfully', deletedNote });
};

export const editNote = (req: Request, res: Response) => {
  const noteId = req.params.id;

  const noteIndex = notes.findIndex((note) => note.id === noteId);

  if (noteIndex === -1) {
    res.status(404).json({ error: 'Note not found' });
    return;
  }

  try {
    noteSchema.validateSync(req.body, { abortEarly: false });

    const updatedNote = {
      ...notes[noteIndex],
      ...req.body,
    };

    notes[noteIndex] = updatedNote;

    res.status(200).json(updatedNote);
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      const validationErrors: { [key: string]: string } = {};

      error.inner.forEach((err) => {
        if (err.path) {
          validationErrors[err.path] = err.message;
        }
      });

      res.status(400).json({ errors: validationErrors });
    } else {
      res.status(500).json({ error: 'An internal server error occurred.' });
    }
  }
};
