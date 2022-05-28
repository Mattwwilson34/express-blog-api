const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  text: { type: String, required: true, maxLength: 500 },
  date_published: { type: Date, required: true, default: new Date() },
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  blog_post: { type: Schema.Types.ObjectId, ref: 'Blog_Post' },
});

module.exports = mongoose.model('Comment', CommentSchema);
