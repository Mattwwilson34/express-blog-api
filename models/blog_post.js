const mongoose = require('mongoose');
const { DateTime } = require('luxon');

const Schema = mongoose.Schema;

const Blog_PostSchema = new Schema({
  title: { type: String, required: true, maxLength: 100 },
  text: { type: String, required: true, maxLength: 1000 },
  published: { type: Boolean, required: true, default: false },
  date_published: { type: Date, default: new Date() },
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
});

//! ===Virtuals===

// Formatted date_published to mm/dd/yyyy
Blog_PostSchema.virtual('formatted_date_published').get(function () {
  return DateTime.fromJSDate(this.date_published).toLocaleString({
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
});

module.exports = mongoose.model('Blog_Post', Blog_PostSchema);
