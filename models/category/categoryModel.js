const {DataTypes} = require('sequelize');

function model(sequelize){

    const attributes = {
        id : {
            type : DataTypes.INTEGER,
            allowNull : false,
            autoIncrement : true,
            primaryKey : true
        },
        title : {
            type : DataTypes.STRING(1000),
            allowNull : false,

        },
        description : {
            type :DataTypes.STRING(3500),
            allowNull : true
        },
        isDeleted :{
            type : DataTypes.BOOLEAN,
            allowNull : false
        },
        userId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'User', // Table name in the database (or use model name)
                key: 'id'
            }
        }
    };

    const options = {
        freezeTableName: true,
        timestamps: true,
    }

    return sequelize.define("Category", attributes, options);
}
module.exports = model;