const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const keywordSchema = new Schema(
  {
    keyword: { type: String, required: true },
    description: { type: String },
    textSnippets: [
      {
        type: String,
        required: true,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Keyword', keywordSchema);
