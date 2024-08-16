const { Sequelize }  = require('sequelize');
require("dotenv").config();
const userModel = require('../models/user/userModel');
const categoryModel = require('../models/category/categoryModel');
const incomeModel = require('../models/income/incomeModel');
const expenseModel = require('../models/expense/expenseModel');

const sequelize = new Sequelize(
    process.env.DB,
    process.env.USER,
    process.env.PASSWORD,
{
    host: process.env.HOST,
    port: process.env.SQL_PORT,
    dialect: process.env.DIALECT,
    dialectOptions: {
      options: { encrypt: false },
    },
});


sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });


const db = {};
db.User = userModel(sequelize);
db.Category = categoryModel(sequelize);
db.Income = incomeModel(sequelize);
db.Expense = expenseModel(sequelize);
// sync all models with database
sequelize.sync({ alter: true });

db.sequelize = sequelize;

module.exports = db;
