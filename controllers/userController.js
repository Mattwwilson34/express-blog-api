// Require models
const User = require('../models/user');

// Get index of all users
exports.index = function (req, res, next) {
  User.find({})
    .populate('blog_posts')
    .populate('comments')
    .exec(function (err, users) {
      if (err) {
        return next(err);
      }
      res.send(users);
    });
};

// Get singe user via ID
exports.get_user = function (req, res, next) {
  User.findById(req.params.id)
    .populate('blog_posts')
    .populate('comments')
    .exec(function (err, user) {
      if (err) {
        return next(err);
      }
      res.send(user);
    });
};

// Create user
exports.create_user = function (req, res, next) {
  //TODO Once front end is added with update form finish this conroller
};

// Update user via ID
exports.update_user = async function (req, res, next) {
  const user = await User.findById(req.params.id)
    .populate('blog_posts')
    .populate('comments');
  //TODO Change what is updated once front end functinality is there
  user.first_name = 'This user has been updated by a /user/:id PUT route';
  await user.save();
  res.send(user);
};

// Delete user via ID
exports.delete_user = function (req, res, next) {
  User.findByIdAndDelete(req.params.id, function (err, user) {
    if (err) {
      return next(err);
    }
    console.log('Deleted : ', user);
    res.send(user);
  });
};
