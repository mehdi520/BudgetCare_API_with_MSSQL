const express = require('express');
const router = express.Router();
const authRouter = require('./auth_routes/auth_route');
const userRouter = require('./user_routes/user_route');
const passport = require('passport');
const categoryRouter = require('./category_routes/categoryRoute');
const expenseRouter = require('./expense_routes/expenseRoute');

router.use('/auth',authRouter);
router.use('/user', passport.authenticate('jwt',{session : false}), userRouter);
router.use('/category', passport.authenticate('jwt',{session : false}), categoryRouter);
router.use('/expense', passport.authenticate('jwt',{session : false}), expenseRouter);


module.exports = router;
