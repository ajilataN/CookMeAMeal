const express= require("express")
const meal = express.Router()
const { dataPool } = require('../db/conn.js')

meal.use(express.json())

// Gets everything from the feed in the DB 
meal.get('/', async (req,res, next)=>{
    try{
        let id_user = req.session.user ? req.session.user[0].id : null
        if(id_user !== null)
            var queryResult=await dataPool.allMealForUser(id_user)
        else
            var queryResult=await dataPool.allMeal()
            
        res.json(queryResult)
    }
    catch(err){
        console.log(err)
        res.sendStatus(500)
    }
})

// Gets the meals posted by user
meal.get('/my', async (req,res, next)=>{
    try{
        let id_user = req.session.user ? req.session.user[0].id : null
        if(id_user !== null)
            var queryResult=await dataPool.myMealForUser(id_user)
            
        res.json(queryResult)
    }
    catch(err){
        console.log(err)
        res.sendStatus(500)
    }
})

// Gets the vegan meals
meal.get('/vegan', async (req, res, next) => {
    try {
        let id_user = req.session.user ? req.session.user[0].id : null;
        let queryResult = await dataPool.allVeganMeals(id_user);

        res.json(queryResult);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
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

// Deletes a meal based on the id
meal.delete('/:id', async (req,res, next)=>{
    try{
        var queryResult=await dataPool.deleteMealById(req.params.id)
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
  let vegan = req.body.vegan
  const ingredients = req.body.ingredients

  console.log(req.session.user[0].id)

  if(!req.session || !req.session.user){
    return res.status(401).json({error:"User not logged in"})
  }
  
  const id_user = req.session.user[0].id
  var isAcompleteMealPost = name && number_of_portions && date && time_ready && price
   
    if (isAcompleteMealPost) {
        try {
            var queryResult=await dataPool.createMeal(name, number_of_portions, date, time_ready, price, vegan, id_user, ingredients)
            if (queryResult.affectedRows) {
                console.log("New meal added!!")
                res.json(queryResult)
              }
        }
        catch(err){
            console.log(err)
            res.sendStatus(500)
        }    
    }  
    else 
     console.log("A field is empty!!")
    
    res.end()
}) 

module.exports = meal;