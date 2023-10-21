const express = require('express');
const passport = require('passport');

const { login, signup } = require('../controllers/authController');

const requireLogin = passport.authenticate('local', { session: false });

const router = express.Router();

router.post('/signup', signup);
router.post('/login', requireLogin, login);

module.exports = router;
