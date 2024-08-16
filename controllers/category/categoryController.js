const {getCatByUserAndTitle,getCatByCatId,createNewCat,updateCat,getCatsByUserId,deleteCatByCatId} = require('../../services/categoryServices/categoryService');
const { SuccessResponse, ErrorResponse} = require('../../utills/response_wrapper/jsonresponse');


const addOrUpdateCatValidate = async (req,res) => {
    try{
        const userId = req.user.id;
        const {title,description,catId} = req.body;

        if(!title)
        {
            return ErrorResponse(req,res,null,'Category title is required');
        }
        else if(!description)
        {
            return ErrorResponse(req,res,null,'Description is required');
        }
        else
        {
           if(catId) // update
            {
                const cat = await getCatByCatId(catId);
                console.log(cat)
                if(cat)
                {
                    const resp = await updateCat({catId,title,description});
                    if(resp > 0)
                    {   const updatedCat  = await getCatByCatId(catId);
                        return SuccessResponse(req,res,updatedCat,'Category updated successfully');
                    }
                    else
                    {
                        return ErrorResponse(req,res,null,"Could not update.Please try again later.");     
                    }
                }
                else
                {
                    return ErrorResponse(req,res,null,"Category not found.");   
                }
            }
           else // create
           {
              const cat = await getCatByUserAndTitle({userId,title});
              console.log(cat);
              if(!cat)
              {
                const resp = await createNewCat({userId,title,description});
                return SuccessResponse(req,res,resp,'Category created successfully');
              }
              else
              {
                return ErrorResponse(req,res,null,"Category already exist."); 
              }

           }     
        }
    }
    catch(error)
    {
        console.log(error);
        return ErrorResponse(req,res,null,"Something went wrong. Please try again later"); 
    }
};

const getCats = async(req,res) => {
    try{
        const userId = req.user.id;
        var resp = await getCatsByUserId(userId);
        return SuccessResponse(req,res,resp,'Category list');
    }
    catch(error)
    {
        console.log(error);
        return ErrorResponse(req,res,null,"Something went wrong. Please try again later"); 
    }
}

const delCat = async(req,res) => {
    try{
        const userId = req.user.id;
        const {id} =  req.params;
        var resp = await deleteCatByCatId(id);
        return SuccessResponse(req,res,null,'Category deleted successfully');
    }
    catch(error)
    {
        console.log(error);
        return ErrorResponse(req,res,null,"Something went wrong. Please try again later"); 
    }
}

module.exports = {
    addOrUpdateCatValidate,
    getCats,
    delCat
}