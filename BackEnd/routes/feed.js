const express= require("express")
const feed = express.Router();
const DB=require('../db/conn.js')

//Gets all the news in the DB 
feed.get('/', async (req,res, next)=>{
    try{
        var queryResult=await DB.allFeed();
        res.json(queryResult)
    }
    catch(err){
        console.log(err)
        res.sendStatus(500)
    }
})

//Gets one new based on the id 
 feed.get('/:id', async (req,res, next)=>{
    try{
        var queryResult=await DB.oneMeal(req.params.id)
        res.json(queryResult)
    }
    catch(err){
        console.log(err)
        res.sendStatus(500)
    }
}) 

//Inserts one new to the database
feed.post('/', async (req,res, next)=>{
    
    
  let name = req.body.name
  let number_of_portions = req.body.number_of_portions
  let time_ready = req.body.time_ready
  let price = req.body.price
  let id_user = req.body.id_user

    var isAcompleteMealPost=name && number_of_portions && time_ready && price && id_user
    if (isAcompleteMealPost)
    {
        try{
            var queryResult=await DB.createMeal(title,slug,text)
            if (queryResult.affectedRows) {
                console.log("New meal added!!")
              }
        }
        catch(err){
            console.log(err)
            res.sendStatus(500)
        }    
    }  
    else
    {
     console.log("A field is empty!!")
    }
    res.end()

  
}) 
module.exports=feed
