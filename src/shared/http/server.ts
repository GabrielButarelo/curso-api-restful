import 'reflect-metadata';
import '@shared/typeorm';
import express, { Request, response, Response } from 'express';
import cors from 'cors';
import routes from './routes';
import AppError from '@shared/errors/AppError';

const app = express();

app.use(cors());
app.use(express.json());

app.use(routes);

app.use((error: Error, req: Request, res: Response) => {
  if (error instanceof AppError) {
    return res.status(error.status).json({
      status: 'ERROR',
      message: error.message,
    });
  }

  return response.status(500).json({
    status: 'ERROR',
    message: 'Internal Server Error',
  });
});

app.listen(3333, () => {
  console.log('Server is running.');
});
