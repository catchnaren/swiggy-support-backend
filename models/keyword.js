const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const keywordSchema = new Schema(
  {
    keywordText: { type: String, required: true },
    textSnippet: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Keyword', keywordSchema);
