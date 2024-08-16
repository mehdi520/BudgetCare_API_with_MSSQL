const db = require("../../config/db");

const findUserByEmail = async (email) =>{
    try
    {
        return await db.User.findOne({ where :{ email} });
    }
    catch(ex)
    {
        return null;
    }
};

const findUserById = async (id) =>{
    try
    {
        return await db.User.findByPk(id);
    }
    catch(ex)
    {
        return null;
    }
};
const signUp = async ({name,email,password,phone}) => {
    return await db.User.create({ name,email,password,phone });
};


module.exports = {
    findUserByEmail,
    findUserById,
    signUp
};