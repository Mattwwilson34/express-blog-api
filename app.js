//! Dependencies
import express from 'express';
import {} from 'dotenv/config';
import morgan from 'morgan';
import cors from 'cors';

// Start express
const app = express();

// Connect to mongoDB
import connectToDatabase from './database/mongoDB_connect.js';
connectToDatabase();

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
app.use(function (err, req, res) {
  res.status(err.status || 500);
  res.json({ error: err });
});

app.listen(process.env.PORT, () =>
  console.log(
    '\x1b[36m%s\x1b[0m',
    `blog-api listening on port ${process.env.PORT}`
  )
);
