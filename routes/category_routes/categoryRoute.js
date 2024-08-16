const express = require('express');
const router = express.Router();

const {addOrUpdateCatValidate,getCats, delCat} = require('../../controllers/category/categoryController');

router.post('/addOrUpdateCatValidate', addOrUpdateCatValidate);
router.get('/getCats' ,getCats);
router.delete('/delCat/:id',delCat)

module.exports = router;