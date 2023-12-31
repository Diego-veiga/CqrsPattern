import 'reflect-metadata';
import 'express-async-errors';
import '@shared/container';
import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import { AppError } from '@shared/errors/AppError';
import routes from './router';
import { errors } from 'celebrate';

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
app.use(errors());

app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof AppError) {
      return response.status(error.statusCode).json({
        status: 'error',
        message: error.message,
      });
    }

    return response.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  },
);

export default app;
