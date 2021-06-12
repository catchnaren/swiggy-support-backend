const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const HttpError = require('./utils/http-error');

const app = express();

app.use(express.json());

const whitelist = ['http://localhost:3000'];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

app.use(cors(corsOptions));

app.get('/', (req, res) => {
  res.send('Hello from nodeserver!');
});

app.use((req, res, next) => {
  const error = new HttpError('Could not find this route', 404);
  throw error;
});

app.use((error, req, res, next) => {
  if (res.headersSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || 'An unknown error occurred!' });
});

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.2jlm2.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
  )
  .then(() => {
    app.listen(5000, () => {
      console.log('Listening on port 5000');
    });
  })
  .catch(err => {
    console.log(err);
  });
