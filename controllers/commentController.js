// console.log styler
import chalk from 'chalk';
import emoji from 'node-emoji';

// Require models
import Comment from '../models/comment.js';
import Blog from '../models/blog_post.js';

// Get index of all comments
export function index(req, res, next) {
  Comment.find({})
    .populate('blog_post')
    .populate('author')
    .exec(function (err, comments) {
      if (err) {
        return next(err);
      }
      res.send(comments);
    });
}

// Get comment user via ID
export function get_comment(req, res, next) {
  Comment.findById(req.params.id)
    .populate('blog_post')
    .populate('author')
    .exec(function (err, comments) {
      if (err) {
        return next(err);
      }
      res.send(comments);
    });
}

// Create comment
export async function create_comment(req, res, next) {
  // Create new Comment model
  const newComment = new Comment(req.body);

  // Update blogpost with new comment
  const blog = await Blog.findById(req.body.blog_post);
  blog.comments.push(newComment._id);
  blog.save((error) => {
    if (error) return next(error);
    console.log(chalk.green('Blog updated'), emoji.get('white_check_mark'));
  });

  // Save comment to database
  newComment.save(function (error) {
    if (error) {
      res.send(
        JSON.stringify({
          message: 'Error saving comment on server side',
          error,
        })
      );
      return next(error);
    }
    console.log(
      chalk.green('New Comment saved to DB'),
      emoji.get('white_check_mark')
    );
    res.send(JSON.stringify('Comment successful!'));
  });
}

// Update comment via ID
export async function update_comment(req, res, next) {
  const comment = await Comment.findById(req.params.id)
    .populate('blog_post')
    .populate('author');
  //TODO Change what is updated once front end functinality is there
  comment.text = 'This user has been updated by a /user/:id PUT route';
  await comment.save((err, comment) => {
    if (err) {
      return next(err);
    }
    console.log(chalk.black.bgGreen(`Successfully updated`), comment);
  });
  res.send(comment);
}

// Delete comment via ID
export function delete_comment(req, res, next) {
  Comment.findByIdAndDelete(req.params.id, function (err, comment) {
    if (err) {
      return next(err);
    }
    console.log('Deleted : ', comment);
    res.send(comment);
  });
}
