import express from 'express';
import bodyParser from 'body-parser';
import { noteRoutes } from './routes/noteRoutes';

const app = express();

app.use(bodyParser.json());

app.use('/notes', noteRoutes);

export { app };
