import { Request, Response } from 'express';
import { notes } from '../utils/Notes';
import { v4 as uuidv4 } from 'uuid'; 
import * as yup from 'yup';
import { Note } from '../Types/Note';
import { noteSchema } from '../models/Note';


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
  
    const noteIndex = notes.findIndex(note => note.id === noteId);
  
    if (noteIndex === -1) {
      res.status(404).json({ error: 'Note not found' });
      return;
    }
  
    const deletedNote = notes.splice(noteIndex, 1)[0];
  
    res.status(200).json({ message: 'Note deleted successfully', deletedNote });
  };