import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { DateTime } from 'luxon';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, required: true, maxLength: 100 },
  password: { type: String, required: true, maxLength: 100 },
  email: { type: String, required: true, maxLength: 100 },
  first_name: { type: String, required: true, maxLength: 100 },
  last_name: { type: String, required: true, maxLength: 100 },
  DOB: { type: Number, required: true },
  date_joined: { type: Date, default: new Date() },
  blog_posts: [{ type: Schema.Types.ObjectId, ref: 'Blog_Post' }],
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
});

//! ===Pre-Hooks===
/**
 * The code in the UserScheme.pre() function is called a pre-hook.
 * Before the user information is saved in the database,
 * `this` function will be called, you will get the plain text password, hash it, and store it.
 */
UserSchema.pre('save', async function (next) {
  const user = this;
  const hash = await bcrypt.hash(this.password, 10);
  user.password = hash;

  next();
});

//! ===Methods===
// Adds password validation to user model using bcrypt.compare()
UserSchema.methods.isValidPassword = async function (password) {
  const user = this;
  const compare = await bcrypt.compare(password, user.password);

  return compare;
};

//! ===Virtuals===

// Formatted date_joined to mm/dd/yyyy
UserSchema.virtual('formatted_date_joined').get(function () {
  return DateTime.fromJSDate(this.date_joined).toLocaleString({
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
});

export default mongoose.model('User', UserSchema);
