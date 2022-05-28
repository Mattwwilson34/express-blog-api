const mongoose = require('mongoose');
const { DateTime } = require('luxon');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, required: true, maxLength: 100 },
  password: { type: String, required: true, maxLength: 100 },
  email: { type: String, required: true, maxLength: 100 },
  first_name: { type: String, required: true, maxLength: 100 },
  last_name: { type: String, required: true, maxLength: 100 },
  age: { type: Number, required: true },
  date_joined: { type: Date, default: new Date() },
  blog_posts: [{ type: Schema.Types.ObjectId, ref: 'Blog_Post' }],
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
});

//! ===Virtuals===

// Formatted date_joined to mm/dd/yyyy
UserSchema.virtual('formatted_date_joined').get(function () {
  return DateTime.fromJSDate(this.date_joined).toLocaleString({
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
});

module.exports = mongoose.model('User', UserSchema);
