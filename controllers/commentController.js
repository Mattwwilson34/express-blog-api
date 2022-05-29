// console.log styler
import chalk from 'chalk';

// Require models
import Comment from '../models/comment.js';

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
export function create_comment(req, res) {
  //TODO Once front end is added with update form finish this conroller
  res.send('Route/Controller to be implemented once front end it ready.');
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
