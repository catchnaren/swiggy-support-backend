const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const HttpError = require('./utils/http-error');
const keywordsRoute = require('./routes/keywords-route');

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/keywords', keywordsRoute);

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
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.2jlm2.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }
  )
  .then(() => {
    app.listen(process.env.PORT || 5000);
    console.log('Listening on port: ', process.env.PORT || 5000);
  })
  .catch(err => {
    console.log(err);
  });
