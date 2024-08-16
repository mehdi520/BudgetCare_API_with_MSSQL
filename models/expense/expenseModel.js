const {DataType, DataTypes} = require('sequelize');

function model(sequelize)
{

    const attributes = {

        id : {
            type : DataTypes.INTEGER,
            allowNull : false,
            primaryKey : true,
            autoIncrement : true
        },
        catId : {
            type : DataTypes.INTEGER,
            allowNull : false,
            refrences :{
                model : 'Category',
                key :"id"
            }
        },
        userId :{
            type : DataTypes.INTEGER,
            allowNull : false,
            refrences :{
                model : 'User',
                key : 'id'
            }
        },
        amount : {
            type : DataTypes.DECIMAL(10, 2),
            allowNull : false
        },
        description :{
            type : DataTypes.STRING(2000),
            allowNull : true
        },
        date : {
            type : DataTypes.DATE,
            allowNull : false
        }
    }

    const opt = {
        freezeTableName: true,
        timestamps: true,
    }
    return sequelize.define("Expense", attributes, opt);
}
module.exports = model;