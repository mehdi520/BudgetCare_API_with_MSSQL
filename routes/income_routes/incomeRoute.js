const express = require('express');
const router = express.Router();

const {  addOrUpdateIncome,getIncomes} = require('../../controllers/income/incomeController');

router.post('/addOrUpdateIncome', addOrUpdateIncome);
router.get('/getIncomes', getIncomes);


module.exports = router;