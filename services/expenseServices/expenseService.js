const { Op,Sequelize, QueryTypes } = require('sequelize');

const db = require("../../config/db");

const getExpenseByExpenseId = async (expenseId) =>{
    return await db.Expense.findByPk(expenseId);
}

const updateExpense = async ({amount,description,date,expenseId}) => {
    return await db.Expense.update(
        {amount,description,date},
        {where : {id : expenseId}}
    );
}
const createNewExpense = async ({userId,amount,description,date,categoryId}) => {
    return await db.Expense.create({userId,amount,description,date,catId :categoryId});
}

const getExpenseWithFilters = async ({parsedStartDate,parsedEndDate,page,limit,userId,categoryId}) => {
            const pageNumber = parseInt(page,1);
            const pageSize = parseInt(limit,10);
            const offset = (pageNumber - 1) * pageSize;

            const query = {
                    where : {
                        date : {
                            [Op.gte] : parsedStartDate,
                            [Op.lte] : parsedEndDate
                        },
                        userId,
                        ...(categoryId && {categoryId}),
                    },
                    offset,
                    limit:pageSize
            };
const expenses = await db.Expense.findAll(query);
const totalExpenses = await db.Expense.count({
    where : query.where
});

const allExpense = await db.Expense.findAll({
    where :query.where
});

const totalAmount = allExpense.reduce((sum,expense) => sum + expense.amount,0);

return {
    data : expenses,
    total : totalExpenses,
    page :pageNumber,
    totalAmount : totalAmount,
    limit : limit
};

}

const getUsersBySP = async (userId) => {
    const result = await db.sequelize.query(
        'EXEC GetAllUser @id = :userId', // SQL command to execute the stored procedure
        {
            replacements: { userId }, // Parameters for the stored procedure
            type: QueryTypes.SELECT// Specifies that we expect a SELECT result
        }
    );

    return result;
};

const getExpenseBySP = async (param) => {
    console.log(param);
    try {
        const result = await db.sequelize.query(
            'EXEC GetExpenses @CategoryId = :categoryId, @StartDate = :startDate, @EndDate = :endDate, @UserId = :userId, @PageNumber = :pageNumber, @PageSize = :pageSize',
            {
                replacements: {
                    categoryId : param.categoryId !== undefined ? param.categoryId : null,
                    startDate: param.startDate,
                    endDate: param.endDate,
                    userId: param.userId,
                    pageNumber: param.pageNo,
                    pageSize: param.pageSize
                },
                type: QueryTypes.SELECT,
                raw : true
            }
        );
        console.log('Stored Procedure Result:', result);
        const data = {
            data: result.slice(0, -1), // All items except the last one
            totalPages: result.length > 0 ? result[result.length - 1].TotalPages : 0,
            totalAmount: result.length > 0 ? result[result.length - 1].TotalAmount : 0
        };

        return data;
       
    } catch (error) {
        console.error('Error executing stored procedure:', error);
        throw error;
    }
};
module.exports = {
    getExpenseByExpenseId ,
    updateExpense,
    createNewExpense,
    getExpenseWithFilters,
    getUsersBySP,
    getExpenseBySP
}