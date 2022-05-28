const express = require('express');
const router = express.Router();

// Require controller modules
const user_controller = require('../controllers/userController');
const blog_post_controller = require('../controllers/blogController');
const comment_controller = require('../controllers/commentController');

//! ===USER ROUTES=== //

// Index of all users
router.get('/user', user_controller.index);

// Get single user
router.get('/user:id');

// Create user
router.post('/user', user_controller.create_user);

// Update user
router.put('/user:id');

// Delete user
router.delete('user/:id');

//! ===BLOG_POST ROUTES=== //

// Index of all blog_posts
router.get('/blog_post', blog_post_controller.index);

// Get single blog_post
router.get('/blog_post:id');

// Create blog_post
router.post('/blog_post', blog_post_controller.create_blog_post);

// Update blog_post
router.put('/blog_post:id');

// Delete blog_post
router.delete('blog_post/:id');

//! ===COMMENT ROUTES=== //

// Index of all comments
router.get('/comment', comment_controller.index);

// Get single comment
router.get('/comment:id');

// Create comment
router.post('/comment', comment_controller.create_comment);

// Update comment
router.put('/comment:id');

// Delete comment
router.delete('comment/:id');

// Export
module.exports = router;
