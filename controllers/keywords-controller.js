const mongoose = require('mongoose');

const HttpError = require('../utils/http-error');
const Keyword = require('../models/keyword');

const getKeywords = async (req, res, next) => {
  let keywords;
  try {
    keywords = await Keyword.find({});
  } catch (err) {
    const error = new HttpError(
      'Fetching keywords failed, please try again later',
      500
    );
    return next(error);
  }
};

exports.getKeywords = getKeywords;
