const {getExpenseByExpenseId,updateExpense,createNewExpense,getExpenseWithFilters,getUsersBySP,getExpenseBySP} = require('../../services/expenseServices/expenseService');
const {getCatByCatId} = require('../../services/categoryServices/categoryService');
const { SuccessResponse, ErrorResponse} = require('../../utills/response_wrapper/jsonresponse');

const addOrUpdateExpense = async (req,res) => {
    try{
        const userId = req.user.id;
        const {amount,description,date,categoryId,expenseId} = req.body;

        if(!amount)
        {
            return ErrorResponse(req,res,null,'Amount is required');
        }
        else if(!description)
        {
            return ErrorResponse(req,res,null,'Description is required');
        }
        else if(!date)
        {
            return ErrorResponse(req,res,null,'Date is required');
        }
        else if(!categoryId)
        {
            return ErrorResponse(req,res,null,'Category is required');
        }
        else
        {
            const parsedDate = new Date(date);
            if(isNaN(parsedDate.getTime()))
            {
                return ErrorResponse(req,res,null,'Invalid date formate');   
            }

           if(expenseId) // update
            {
                const cat = await getExpenseByExpenseId(expenseId);
                console.log(cat)
                if(cat)
                {
                    const resp = await updateExpense({amount,description,date,expenseId});
                    if(resp > 0)
                    {   const updatedCat  = await getExpenseByExpenseId(expenseId);
                        return SuccessResponse(req,res,updatedCat,'Expense updated successfully');
                    }
                    else
                    {
                        return ErrorResponse(req,res,null,"Could not update.Please try again later.");     
                    }
                }
                else
                {
                    return ErrorResponse(req,res,null,"Expense not found.");   
                }
            }
           else // create
           {
            console.log('trying to create new');
              const cat = await getCatByCatId(categoryId);
              console.log(cat);
              if(cat)
              {
                const resp = await createNewExpense({userId,amount,description,date,categoryId});
                return SuccessResponse(req,res,resp,'Expense created successfully');
              }
              else
              {
                return ErrorResponse(req,res,null,"Invalid Category Id."); 
              }

           }     
        }
    }
    catch(error)
    {
        console.log(error);
        return ErrorResponse(req,res,null,"Something went wrong. Please try again later"); 
    }
}

const getExpense = async (req,res) => {
    try{
        const userId = req.user.id;
        const {startDate,endDate,categoryId,page =1,limit = 10} = req.query;

        if(!startDate)
        {
            return ErrorResponse(req,res,null,'startDate is required');
        }
        else if(!endDate)
        {
            return ErrorResponse(req,res,null,'endDate is required');
        }
        else
        {
            const parsedStartDate = new Date(startDate);
            if(isNaN(parsedStartDate.getTime()))
            {
                return ErrorResponse(req,res,null,'Invalid start date formate');   
            }

            const parsedEndDate = new Date(endDate);
            if(isNaN(parsedEndDate.getTime()))
            {
                return ErrorResponse(req,res,null,'Invalid end date formate');   
            }

            const resp = await getExpenseWithFilters({parsedStartDate,parsedEndDate,page,limit,userId,categoryId});
            return SuccessResponse(req,res,resp,'Expense updated successfully');
        }
    }
    catch(error)
    {
        console.log(error);
        return ErrorResponse(req,res,null,"Something went wrong. Please try again later"); 
    }
}

const getUsers = async (req,res) => {
    const resp = await getUsersBySP(34);
    return SuccessResponse(req,res,resp,'Expense updated successfully');

}

const getExpensTest = async (req,res) => {
    const userId = req.user.id;
    const {startDate,endDate,categoryId,pageNo =1,pageSize = 10} = req.query;

    const resp = await getExpenseBySP({startDate,endDate,categoryId,pageNo,pageSize,userId});
    return SuccessResponse(req,res,resp,'Expense updated successfully');

}
module.exports = {
    addOrUpdateExpense,
    getExpense,
    getUsers,
    getExpensTest
}