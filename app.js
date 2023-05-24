import express from 'express';
import userRouter from './routes/user.js';
import taskRouter from './routes/task.js';
import { config } from 'dotenv';
import cookieParser from 'cookie-parser';
import { errorMiddleware } from './middlewares/error.js';
import cors from 'cors';

export const app = express();

config({
  path: './data/config.env',
});

// Using middleware
app.use(express.json()); // "express.json()" should be above the routes Line i.e "userRouter".
app.use(cookieParser());

//using routes
app.use('/api/v1/users', userRouter);
app.use('/api/v1/task', taskRouter);

app.use(
  cors({
    origin: ['process.env.FRONTEND_URL', '*'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
    optionsSuccessStatus: 200,
  })
);

app.get('/', (req, res) => {
  res.send('Nice Working');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Max-Age', '1800');
  res.setHeader('Access-Control-Allow-Headers', 'content-type');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'PUT, POST, GET, DELETE, PATCH, OPTIONS'
  );
});

//using error handler
app.use(errorMiddleware);
