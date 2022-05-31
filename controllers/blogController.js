// console.log styler
import chalk from 'chalk';

// Require models
import Blog_Post from '../models/blog_post.js';

// Get index of all blog_posts
export function index(req, res, next) {
  Blog_Post.find({})
    .populate('author')
    .populate('comments')
    .exec(function (err, blog_posts) {
      if (err) {
        return next(err);
      }
      res.send(blog_posts);
    });
}

// Get single blog_post via ID
export function get_blog_post(req, res, next) {
  Blog_Post.findById(req.params.id)
    .populate('author')
    .populate({
      path: 'comments',
      populate: {
        path: 'author',
        model: 'User',
      },
    })
    .exec(function (err, blog_post) {
      if (err) {
        return next(err);
      }
      res.send(blog_post);
    });
}

// Create blog_post
export function create_blog_post(req, res) {
  //TODO Once front end is added with update form finish this conroller
  res.send('Route/Controller to be implemented once front end it ready.');
}

// Update blog_post via ID
export async function update_blog_post(req, res, next) {
  const blog_post = await Blog_Post.findById(req.params.id)
    .populate('author')
    .populate('comments');
  //TODO Change what is updated once front end functinality is there
  blog_post.title =
    'This blog_post has been updated by a /blog_post/:id PUT route';
  await blog_post.save((err, blog_post) => {
    if (err) {
      return next(err);
    }
    console.log(chalk.black.bgGreen(`Successfully updated`), blog_post);
  });
  res.send(blog_post);
}

// Delete blog_post via ID
export function delete_blog_post(req, res, next) {
  Blog_Post.findByIdAndDelete(req.params.id, function (err, blog_post) {
    if (err) {
      return next(err);
    }
    console.log('Deleted : ', blog_post);
    res.send(blog_post);
  });
}
