// Require models
const Blog_Post = require('../models/blog_post');

// Get index of all blog_posts
exports.index = async function (req, res, next) {
  Blog_Post.find({})
    .populate('author')
    .populate('comments')
    .exec(function (err, blog_posts) {
      if (err) {
        return next(err);
      }
      res.send(blog_posts);
    });
};

// Get single blog_post via ID
exports.get_blog_post = function (req, res, next) {
  Blog_Post.findById(req.params.id)
    .populate('author')
    .populate('comments')
    .exec(function (err, blog_post) {
      if (err) {
        return next(err);
      }
      res.send(blog_post);
    });
};

// Create blog_post
exports.create_blog_post = function (req, res, next) {
  //TODO Once front end is added with update form finish this conroller
  res.send('Route/Controller to be implemented once front end it ready.');
};

// Update blog_post via ID
exports.update_blog_post = async function (req, res, next) {
  const blog_post = await Blog_Post.findById(req.params.id)
    .populate('author')
    .populate('comments');
  //TODO Change what is updated once front end functinality is there
  blog_post.title =
    'This blog_post has been updated by a /blog_post/:id PUT route';
  await blog_post.save();
  res.send(blog_post);
};

// Delete blog_post via ID
exports.delete_blog_post = function (req, res, next) {
  Blog_Post.findByIdAndDelete(req.params.id, function (err, blog_post) {
    if (err) {
      return next(err);
    }
    console.log('Deleted : ', blog_post);
    res.send(blog_post);
  });
};
