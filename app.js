//! Dependencies
const express = require('express');
require('dotenv').config();
const morgan = require('morgan');
const createError = require('http-errors');

// Start express
const app = express();

//  Require routes
const apiRouter = require('./routes/api');

// Application middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));

// Custome middleware

// Use routes
app.use('/', apiRouter);

app.listen(process.env.PORT, () =>
  console.log(
    '\x1b[36m%s\x1b[0m',
    `blog-api listening on port ${process.env.PORT}`
  )
);
