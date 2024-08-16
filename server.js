require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const passport = require('./middlewares/passport');
const errorHandler = require('./middlewares/error_handlers/errorHandler');

app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
app.use(cors());  
app.use(passport.initialize());


const app_router = require('./routes/app_route');
app.use('/api',app_router);


app.use(errorHandler);
app.listen(process.env.PORT,()=>{
    console.log(`Server is unning on PORT : ${process.env.PORT}`);
});