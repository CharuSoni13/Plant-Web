const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const indexRouter = require('./routes/index.router');
const userRouter = require('./routes/user.router');
const productRouter = require('./routes/product.router');

const app = express();

// Logging
app.use(morgan('dev'));

// CORS setup: allow deployed frontend + localhost for dev
const allowedOrigins = [
  'https://plant-web-frontend.onrender.com',
  'http://localhost:5173',
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true); // allow tools like Postman
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      callback(new Error(`Origin ${origin} not allowed by CORS policy`));
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// Body parsing for non-file fields
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/', indexRouter);
app.use('/users', userRouter);
app.use('/products', productRouter);

module.exports = app;
