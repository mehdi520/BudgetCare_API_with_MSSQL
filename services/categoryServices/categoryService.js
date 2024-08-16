const db = require("../../config/db");

const getCatByUserAndTitle = async ({userId,title}) =>
{
    try
    {
        return await db.Category.findOne({ where :{ title,userId,isDeleted : false} });
    }
    catch(ex)
    {
        return null;
    }
};

const getCatByCatId = async (catId) =>
    {
        try
        {
            return await db.Category.findByPk(catId);
        }
        catch(ex)
        {
            return null;
        }
    };

const createNewCat = async ({userId,title,description}) => 
{
    return await db.Category.create({userId,title,description,isDeleted : false});
};

const updateCat = async ({catId,title,description}) => 
    {
        return await db.Category.update(
            {title,description},
            {where : {id : catId}}
        );
    };

const getCatsByUserId = async (userId) =>{
    const list = await db.Category.findAll({
        where: {
            userId: userId,
            isDeleted: false
        }
    });

    console.log(list);
    return list;
};

const deleteCatByCatId = async (catId) =>{
    return await db.Category.update(
        {isDeleted : true},
        {where: {id : catId}}
    );
}

module.exports = {
    getCatByUserAndTitle,
    createNewCat,
    getCatByCatId,
    updateCat,
    getCatsByUserId,
    deleteCatByCatId
};