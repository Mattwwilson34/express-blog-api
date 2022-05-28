const express = require('express');
const router = express.Router();

// Require controller modules
const user_controller = require('../controllers/userController');

router.get('/', user_controller.index);

module.exports = router;
