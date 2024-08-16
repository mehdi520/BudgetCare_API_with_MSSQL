const { getIncomeByIncomeId , updateIncome,createNewIncome,getIncomeBySP} = require('../../services/incomeServices/incomeService');
const {getCatByCatId} = require('../../services/categoryServices/categoryService');
const { SuccessResponse, ErrorResponse} = require('../../utills/response_wrapper/jsonresponse');

const addOrUpdateIncome = async (req,res) => {
    try{
        const userId = req.user.id;
        const {amount,description,date,categoryId,incomeId} = req.body;

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

           if(incomeId) // update
            {
                const cat = await getIncomeByIncomeId(incomeId);
                console.log(cat)
                if(cat)
                {
                    const resp = await updateIncome({amount,description,date,incomeId});
                    if(resp > 0)
                    {   const updatedCat  = await getIncomeByIncomeId(incomeId);
                        return SuccessResponse(req,res,updatedCat,'Income updated successfully');
                    }
                    else
                    {
                        return ErrorResponse(req,res,null,"Could not update.Please try again later.");     
                    }
                }
                else
                {
                    return ErrorResponse(req,res,null,"Income not found.");   
                }
            }
           else // create
           {
            console.log('trying to create new');
              const cat = await getCatByCatId(categoryId);
              console.log(cat);
              if(cat)
              {
                const resp = await createNewIncome({userId,amount,description,date,categoryId});
                return SuccessResponse(req,res,resp,'Income created successfully');
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


const getIncomes = async (req,res) => {
    const userId = req.user.id;
    const {startDate,endDate,categoryId,pageNo =1,pageSize = 10} = req.query;

    const resp = await getIncomeBySP({startDate,endDate,categoryId,pageNo,pageSize,userId});
    return SuccessResponse(req,res,resp,'Expense updated successfully');

}

module.exports = {
    addOrUpdateIncome,
    getIncomes
}