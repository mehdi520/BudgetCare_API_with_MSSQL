const express = require('express');
const router = express.Router();

const { getProfile } = require('../../controllers/user/userController');

router.get('/getProfile', getProfile);

module.exports = router;