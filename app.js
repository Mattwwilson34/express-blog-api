//! Dependencies
import express from 'express';
import {} from 'dotenv/config';
import morgan from 'morgan';
import cors from 'cors';

// Start express
const app = express();

// Connect to mongoDB
import connectToDatabase from './database/mongoDB_connect.js';
await connectToDatabase();

//  Require routes
import apiRouter from './routes/api.js';

// Application middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));

// Use routes
app.use('/', apiRouter);

// Handle errors
app.use((err, req, res, next) => {
  // console.error(err.stack);
  res.status(500).send('Something broke!');
});

export default app;
