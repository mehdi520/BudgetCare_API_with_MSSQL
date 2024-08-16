const { DataTypes } = require("sequelize");

function model(sequelize){

    const attributes = {
        id :{
            type : DataTypes.INTEGER,
            allowNull : false,
            autoIncrement : true,
            primaryKey : true
        },
        name :{
            type : DataTypes.STRING(100),
            allowNull : false
        },
        email :{
            type : DataTypes.STRING(200),
            allowNull : false
        },
        phone : {
            type : DataTypes.STRING(30),
            allowNull: false
        },
        password :{
            type : DataTypes.STRING(3000),
            allowNull : false
        },
        image : {
            type : DataTypes.STRING(4000),
            allowNull : true
        },

    };

    const options = {
        freezeTableName: true,
        timestamps: true,
    };

    return sequelize.define("User", attributes, options);
};

module.exports = model;