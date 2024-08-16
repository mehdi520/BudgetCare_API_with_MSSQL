const express = require('express');
const router = express.Router();

const { addOrUpdateExpense ,getExpense,getUsers,getExpensTest} = require('../../controllers/expense/expenseController');

router.post('/addOrUpdateExpense', addOrUpdateExpense);
router.get('/getExpenses', getExpense);
router.get('/testsp', getUsers);
router.get('/getExpensTest', getExpensTest);



module.exports = router;