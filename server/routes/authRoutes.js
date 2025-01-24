const express = require('express');
const { signup, login, getSessionDetails,forgotPassword,resetPassword} = require('../controller/authController');
const { protect } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/sessions', protect, getSessionDetails);
router.post('/forgot-password', forgotPassword);
router.put('/reset-password/:token', resetPassword);

module.exports = router;
