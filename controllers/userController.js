// console.log styler
import chalk from 'chalk';

// Require models
import User from '../models/user.js';

// Get index of all users
export function index(req, res, next) {
  User.find({})
    .populate('blog_posts')
    .populate('comments')
    .exec(function (err, users) {
      if (err) {
        return next(err);
      }
      res.send(users);
    });
}

// Get singe user via ID
export function get_user(req, res, next) {
  User.findById(req.params.id)
    .populate('blog_posts')
    .populate('comments')
    .exec(function (err, user) {
      if (err) {
        return next(err);
      }
      res.send(user);
    });
}

// Create user
export function create_user(req, res) {
  //TODO Once front end is added with update form finish this conroller
  res.send('Route/Controller to be implemented once front end it ready.');
}

// Update user via ID
export async function update_user(req, res, next) {
  const user = await User.findById(req.params.id)
    .populate('blog_posts')
    .populate('comments');
  //TODO Change what is updated once front end functinality is there
  user.first_name = 'This user has been updated by a /user/:id PUT route';
  await user.save((err, user) => {
    if (err) {
      return next(err);
    }
    console.log(chalk.black.bgGreen(`Successfully updated`), user);
  });
  res.send(user);
}

// Delete user via ID
export function delete_user(req, res, next) {
  User.findByIdAndDelete(req.params.id, function (err, user) {
    if (err) {
      return next(err);
    }
    console.log('Deleted : ', user);
    res.send(user);
  });
}
