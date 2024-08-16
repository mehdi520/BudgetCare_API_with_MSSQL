const bcrypt = require('bcryptjs');

const {findUserByEmail,signUp} = require('../../services/userService/userService');
const { SuccessResponse, ErrorResponse} = require('../../utills/response_wrapper/jsonresponse');

const {generateToken} = require('../../utills/token/tokenUtils');


const signUpValidater = async (req,res) => {
    const {name,email,password,phone} = req.body;
    try{

        if(!name)
        {
            return ErrorResponse(req,res,null,'Name is required');
        }
        else if(!email)
        {
            return ErrorResponse(req,res,null,'Email is required');
        }
        else if(!phone)
        {
            return ErrorResponse(req,res,null,'Phone is required');
        }
        else if(!password)
        {
            return ErrorResponse(req,res,null,'Password is required');
        }
        else
        {
            const user = await findUserByEmail(email);
            console.log(user);
            if(!user)
            {
                const hashPass = await bcrypt.hash(password,10);
                const resp = await signUp({name,email,password : hashPass,phone}); 
                return SuccessResponse(req,res,null,'Signup successfully');
            }
            else
            {
                return ErrorResponse(req,res,null,'Email already exist.');
            }
            
        }
    }
    catch (error)
    {
        console.log(error);
        return ErrorResponse(req,res,null,"Something went wrong. Please try again later");
    }
    
};

const signInValidator = async(req,res) =>{
    const {email,password} = req.body;
    try
    {
        if(!email)
        {
            return ErrorResponse(req,res,null,'Email is required');
        }
        else if(!password)
        {
            return ErrorResponse(req,res,null,'Password is required');
        }
        else
        {
            const user = await findUserByEmail(email);
            if(!user)
            {
                return ErrorResponse(req,res,null,'Invalid email');
            }
            else
            {
                if(await bcrypt.compare(password,user.password))
                {
                    const token = generateToken(user);
                    return SuccessResponse(req,res,token,"Login successfully");
                }
                else
                {
                    return ErrorResponse(req,res,null,'Invalid password');
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

module.exports = {
    signUpValidater,
    signInValidator
};