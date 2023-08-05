import express from 'express';
import { createNote, deleteNote, editNote } from '../controllers/noteController';

export const noteRoutes = express.Router();

noteRoutes.post('/', createNote);
noteRoutes.delete('/:id', deleteNote);
noteRoutes.patch('/:id', editNote);
noteRoutes.get('/:id');
noteRoutes.get('/');
noteRoutes.get('/stats');
