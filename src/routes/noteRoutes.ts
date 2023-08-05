import express from 'express';
import { createNote, deleteNote, editNote, getAllNotes, getNote } from '../controllers/noteController';

export const noteRoutes = express.Router();

noteRoutes.post('/', createNote);
noteRoutes.delete('/:id', deleteNote);
noteRoutes.patch('/:id', editNote);
noteRoutes.get('/:id', getNote);
noteRoutes.get('/', getAllNotes);
noteRoutes.get('/stats');
