// Require models
const Comment = require('../models/comment');

// Get index of all comments
exports.index = function (req, res, next) {
  Comment.find({})
    .populate('blog_post')
    .populate('author')
    .exec(function (err, comments) {
      if (err) {
        return next(err);
      }
      res.send(comments);
    });
};

// Get comment user via ID
exports.get_comment = function (req, res, next) {
  Comment.findById(req.params.id)
    .populate('blog_post')
    .populate('author')
    .exec(function (err, comments) {
      if (err) {
        return next(err);
      }
      res.send(comments);
    });
};

// Create comment
exports.create_comment = function (req, res, next) {
  //TODO Once front end is added with update form finish this conroller
  res.send('Route/Controller to be implemented once front end it ready.');
};

// Update comment via ID
exports.update_comment = async function (req, res, next) {
  const comment = await Comment.findById(req.params.id)
    .populate('blog_post')
    .populate('author');
  //TODO Change what is updated once front end functinality is there
  comment.text = 'This user has been updated by a /user/:id PUT route';
  await comment.save();
  res.send(comment);
};

// Delete comment via ID
exports.delete_comment = function (req, res, next) {
  Comment.findByIdAndDelete(req.params.id, function (err, comment) {
    if (err) {
      return next(err);
    }
    console.log('Deleted : ', comment);
    res.send(comment);
  });
};
