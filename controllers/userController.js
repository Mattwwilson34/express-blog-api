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
export async function create_user(req, res, next) {
  const formData = req.body;

  // Delete confirmPassword field b/c it is not needed
  delete formData.confirmPassword;

  // Add DOB using JS date function and form data
  formData.DOB = new Date(formData.DOB);

  // Check if username already exists
  User.findOne({ username: formData.username }, function (error, user) {
    if (error) return next(error);

    // Username already exists in DB -> return error to frontend
    if (user !== null) {
      res.send(JSON.stringify({ message: 'Username already exists' }));
    }
    // User name doesn't exist -> create + save user to DB
    else {
      const user = new User(formData);

      user.save((error, user) => {
        if (error) return next(error);

        // If successful return new user
        res.send(
          JSON.stringify({
            message: `${user.username} successfully created!`,
            user: {
              first_name: user.first_name,
              last_name: user.last_name,
              username: user.username,
            },
          })
        );
      });
    }
  });
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
