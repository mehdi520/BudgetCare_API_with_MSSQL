const express = require('express');
const router = express.Router();

const {signUpValidater,signInValidator} = require('../../controllers/auth/authController');

router.post('/signup',signUpValidater);
router.post('/signin',signInValidator)

module.exports = router;