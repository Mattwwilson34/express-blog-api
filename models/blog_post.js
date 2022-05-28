const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Blog_PostSchema = new Schema({
  title: { type: String, required: true, maxLength: 100 },
  text: { type: String, required: true, maxLength: 1000 },
  published: { type: Boolean, required: true, default: false },
  date_published: { type: Date, required: true, default: new Date() },
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
});

module.exports = mongoose.model('Blog_Post', Blog_PostSchema);
