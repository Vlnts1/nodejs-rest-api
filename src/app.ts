import express from 'express';
import bodyParser from 'body-parser';
import {noteRoutes} from './routes/noteRoutes';

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.use('/notes', noteRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export { app };