const express = require('express');
const { signup, login, getSessionDetails } = require('../controller/authController');
const { protect } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/sessions', protect, getSessionDetails);

module.exports = router;
