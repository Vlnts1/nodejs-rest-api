import express from 'express';
import {
  archiveNote,
  createNote,
  deleteNote,
  editNote,
  getAllNotes,
  getNote,
  unarchiveNote,
} from '../controllers/noteController';

export const noteRoutes = express.Router();

noteRoutes.post('/', createNote);
noteRoutes.delete('/:id', deleteNote);
noteRoutes.patch('/:id', editNote);
noteRoutes.get('/:id', getNote);
noteRoutes.get('/', getAllNotes);
noteRoutes.get('/stats');
noteRoutes.put('/archive/:id', archiveNote);
noteRoutes.put('/unarchive/:id', unarchiveNote);
