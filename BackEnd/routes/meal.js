const express= require("express")
const meal = express.Router();

meal.get('/',(req,res)=>{
    console.log("The route has been reached")
    res.send("This is a meal post.")
    })
    
    module.exports=meal