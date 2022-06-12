import express from 'express';
const router = express.Router();
import jwt from 'jsonwebtoken';

// utils
import verifyToken from '../utils/middleware/verifyJsonToken.js';

// Require controller modules
import * as user_controller from '../controllers/userController.js';
import * as blog_post_controller from '../controllers/blogController.js';
import * as comment_controller from '../controllers/commentController.js';
import * as login_controller from '../controllers/loginController.js';

//! ===USER ROUTES=== //

// Index of all users
router.get('/user', user_controller.index);

// Get single user
router.get('/user/:id', user_controller.get_user);

// Create user
router.post('/user', user_controller.create_user);

// Update user
router.put('/user/:id', user_controller.update_user);

// Delete user
router.delete('/user/:id', user_controller.delete_user);

//! ===BLOG_POST ROUTES=== //

// Index of all blog_posts
router.get('/blog_posts', blog_post_controller.index);

// Get single blog_post
router.get('/blog_post/:id', blog_post_controller.get_blog_post);

// Create blog_post
router.post('/blog_post', blog_post_controller.create_blog_post);

// Update blog_post
router.put('/blog_post/:id', blog_post_controller.update_blog_post);

// Delete blog_post
router.delete('/blog_post/:id', blog_post_controller.delete_blog_post);

//! ===COMMENT ROUTES=== //

// Index of all comments
router.get('/comment', comment_controller.index);

// Get single comment
router.get('/comment/:id', comment_controller.get_comment);

// Create comment
router.post('/comment', comment_controller.create_comment);

// Update comment
router.put('/comment/:id', comment_controller.update_comment);

// Delete comment
router.delete('/comment/:id', comment_controller.delete_comment);

//! ===LOGIN ROUTES=== //

// Login POST
router.post('/login', login_controller.login);

//! ===SECURE ROUTES=== //
router.get('/profile', verifyToken, (req, res) => {
  jwt.verify(req.token, 'secretkey', (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      res.json({
        message: 'You made it to the secure route',
        authData,
      });
    }
  });
});

// Export
export default router;
