const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const HttpError = require('./utils/http-error');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello from nodeserver!');
});

app.listen(5000, () => {
  console.log('Listening on port 5000');
});
