const express= require("express")
const meal = express.Router();
const DB=require('../db/conn.js')
const { conn, dataPool } = require('../db/conn.js')
// const session = require("express-session")

meal.use(express.json())


// Gets everything from the feed in the DB 
meal.get('/', async (req,res, next)=>{
    try{
        var queryResult=await dataPool.allMeal();
        res.json(queryResult)
    }
    catch(err){
        console.log(err)
        res.sendStatus(500)
    }
})

// Gets one meal based on the id 
 meal.get('/:id', async (req,res, next)=>{
    try{
        var queryResult=await dataPool.oneMeal(req.params.id)
        res.json(queryResult)
    }
    catch(err){
        console.log(err)
        res.sendStatus(500)
    }
}) 

// Inserts a meal to the database
meal.post('/', async (req,res, next)=>{
  let name = req.body.name
  let number_of_portions = req.body.number_of_portions
  let date = req.body.date
  let time_ready = req.body.time_ready
  let price = req.body.price
//   let id_user = req.cookies.id_user
    let id_user = 1

    var isAcompleteMealPost=name && number_of_portions && date && time_ready && price
    if (isAcompleteMealPost) {
        try {
            var queryResult=await dataPool.createMeal(name, number_of_portions, date, time_ready, price, id_user)
            if (queryResult.affectedRows) {
                console.log("New meal added!!")
              }
        }
        catch(err){
            console.log(err)
            res.sendStatus(500)
        }    
    }  
    else {
     console.log("A field is empty!!")
    }
    res.end()
}) 


module.exports=meal