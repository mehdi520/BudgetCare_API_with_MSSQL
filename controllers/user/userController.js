const {findUserById} = require('../../services/userService/userService');
const { SuccessResponse, ErrorResponse} = require('../../utills/response_wrapper/jsonresponse');



const getProfile = async (req,res) => {
    try
    {
        const userId =  req.user.id;
        const user = await findUserById(userId);
        console.log(userId);
        console.log(user);
        return SuccessResponse(req,res,user,"Profile");
    }
    catch(ex)
    {
        console.log(error);
        return ErrorResponse(req,res,null,"Something went wrong. Please try again later"); 
    }
};

module.exports = { getProfile };