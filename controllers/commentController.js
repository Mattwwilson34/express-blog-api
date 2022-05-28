// Require models
const Comment = require('../models/comment');

exports.index = function (req, res) {
  res.send('comment index not implemented yet');
};

exports.create_comment = async function (req, res, next) {
  await new Comment({ text: 'test' }).save();

  res.send('Create Comment route not implemented');
};
