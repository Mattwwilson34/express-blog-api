// Require models
const Comment = require('../models/comment');

exports.index = function (req, res) {
  res.send('comment index not implemented yet');
};

exports.create_comment = async function (req, res, next) {
  const comment = new Comment({ text: 'Hello!!' });
  res.send(comment.time_hour_min);
};
