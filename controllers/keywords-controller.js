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

  res.status(200).json({
    keywords: keywords.map(keywordItem => {
      return { keyword: keywordItem.toObject({ getters: true }) };
    }),
  });
};

const getKeywordById = async (req, res, next) => {
  const keywordId = req.params.kid;

  let keyword;
  try {
    keyword = await Keyword.findById(keywordId);
  } catch (err) {
    const error = new HttpError(
      'Fetching keyword by id failed, please try again later.',
      500
    );
    return next(error);
  }

  if (!keyword) {
    const error = new HttpError(
      'Could not find the keyword for the provided id.',
      404
    );
    return next(error);
  }

  res.status(200).json({ keyword: keyword.toObject({ getters: true }) });
};

const getKeywordByKeyText = async (req, res, next) => {
  const keyText = req.params.keyText;

  let keyword;
  try {
    keyword = await Keyword.findOne({ keywordText: keyText });
  } catch (err) {
    const error = new HttpError(
      'Fetching keyword by id failed, please try again later.',
      500
    );
    return next(error);
  }

  if (!keyword) {
    const error = new HttpError(
      'Could not find the keyword for the provided id.',
      404
    );
    return next(error);
  }

  res.status(200).json({ keyword: keyword });
};

const postKeywords = async (req, res, next) => {
  const { textInput } = req.body;
  const keywordFields = textInput.split('/');
  const keyText = keywordFields[keywordFields.length - 1];
  const snippet = keywordFields.slice(keywordFields.length - 2)[0];
  const createdKeyword = new Keyword({
    keywordText: keyText,
    textSnippet: snippet,
  });

  try {
    await createdKeyword.save();
  } catch (err) {
    const error = new HttpError(
      'Creating keyword failed, please try again later.',
      500
    );
    return next(error);
  }

  res.status(201).json({ keyword: createdKeyword.toObject({ getters: true }) });
};

const updateKeyword = async (req, res, next) => {
  const { keywordText, textSnippet } = req.body;

  const keywordId = req.params.kid;

  let keyword;
  try {
    keyword = await Keyword.findById(keywordId);
  } catch (err) {
    const error = new HttpError(
      'Fetching keyword by id failed, please try again later.',
      500
    );
    return next(error);
  }

  if (!keyword) {
    const error = new HttpError(
      'Could not find the keyword for the provided id.',
      404
    );
    return next(error);
  }

  keyword.keywordText = keywordText;
  keyword.textSnippet = textSnippet;

  try {
    await keyword.save();
  } catch (err) {
    const error = new HttpError(
      'Creating keyword failed, please try again later.',
      500
    );
    return next(error);
  }

  res.status(201).json({ keyword: keyword.toObject({ getters: true }) });
};

const deleteKeyword = async (req, res, next) => {
  const keywordId = req.params.kid;

  let keyword;
  try {
    keyword = await Keyword.findById(keywordId);
  } catch (err) {
    const error = new HttpError(
      'Deleting the keyword failed, please try again later.',
      500
    );
    return next(error);
  }

  if (!keyword) {
    const error = new HttpError(
      'Could not find the keyword for the provided id.',
      404
    );
    return next(error);
  }

  try {
    await keyword.remove();
  } catch (err) {
    const error = new HttpError(
      'Deleting the keyword failed, please try again later.',
      500
    );
    return next(error);
  }

  res.status(200).json({ message: 'Deleted keyword.', id: keywordId });
};

exports.getKeywords = getKeywords;
exports.getKeywordById = getKeywordById;
exports.getKeywordByKeyText = getKeywordByKeyText;
exports.postKeywords = postKeywords;
exports.updateKeyword = updateKeyword;
exports.deleteKeyword = deleteKeyword;
