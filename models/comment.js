import mongoose from 'mongoose';
import { DateTime } from 'luxon';

const Schema = mongoose.Schema;

const CommentSchema = new Schema(
  {
    text: { type: String, required: true, maxLength: 500 },
    date_published: { type: Date, required: true, default: new Date() },
    author: { type: Schema.Types.ObjectId, ref: 'User' },
    blog_post: { type: Schema.Types.ObjectId, ref: 'Blog_Post' },
  },
  {
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);

//! ===Virtuals===

// Formatted date_published to mm/dd/yyyy
CommentSchema.virtual('date_yyyy_mm_dd').get(function () {
  return DateTime.fromJSDate(this.date_published).toLocaleString({
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
});

// Formated date_published to hours:minutes AM/PM
CommentSchema.virtual('time_hour_min').get(function () {
  return DateTime.fromJSDate(this.date_published).toLocaleString({
    hour: 'numeric',
    minute: '2-digit',
  });
});

export default mongoose.model('Comment', CommentSchema);
