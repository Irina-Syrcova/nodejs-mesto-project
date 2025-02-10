import express, { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';

import NotFoundError from './errors/not-found-error';
import usersRouter from './routes/users';
import cardsRouter from './routes/cards';

interface CustomError extends Error {
  message: string;
  statusCode: number;
}

const { PORT = 3000 } = process.env;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use((req: Request, res: Response, next: NextFunction) => {
  req.user = {
    _id: '67a4ef72b6273d58a1aebabc',
  };

  next();
});

app.use('/users', usersRouter);
app.use('/cards', cardsRouter);

app.use((req: Request, res: Response, next: NextFunction) => {
  next(new NotFoundError('Страница не найдена'));
});

app.use((err: CustomError, req: Request, res: Response, next: NextFunction) => {
  const { statusCode = 500, message } = err;

  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message,
    });
});

app.listen(PORT);
