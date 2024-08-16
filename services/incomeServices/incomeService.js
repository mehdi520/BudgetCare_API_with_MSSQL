const db = require("../../config/db");

const getIncomeByIncomeId = async (incomeId) =>{
    return await db.Income.findByPk(incomeId);
}

const updateIncome = async ({amount,description,date,incomeId}) => {
    return await db.Income.update(
        {amount,description,date},
        {where : {id : incomeId}}
    );
}
const createNewIncome = async ({userId,amount,description,date,categoryId}) => {
    return await db.Income.create({userId,amount,description,date,catId :categoryId});
}

const getIncomeBySP = async (param) => {
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
    getIncomeByIncomeId ,
    updateIncome,
    createNewIncome,
   getIncomeBySP
}