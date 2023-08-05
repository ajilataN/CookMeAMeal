const express= require("express")
const meal = express.Router();
const DB=require('../db/conn.js')
const { conn, dataPool } = require('../db/conn.js')

meal.use(express.json());
//const session = require("express-session")

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
  const ingredients = req.body.ingredients

  console.log(req.session.user[0].id)

  if(!req.session || !req.session.user){
    return res.status(401).json({error:"User not logged in"});
  }

  let id_user = req.session.user[0].id
 
  var isAcompleteMealPost = name && number_of_portions && date && time_ready && price
   
    if (isAcompleteMealPost) {
        try {
            var queryResult=await dataPool.createMeal(name, number_of_portions, date, time_ready, price, id_user, ingredients)
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
    else {
     console.log("A field is empty!!")
    }
    res.end()
}) 

//Inserts a new order to the database
meal.post('/order', async (req, res, next) => {
    let id_cook = req.body.id_cook;
    let id_meal = req.body.id_meal;
    let portions = req.body.portions;

    console.log("Logged in user with id: " + req.session.user[0].id);

    if (!req.session || !req.session.user) {
        return res.status(401).json({ error: "User not logged in" });
    }

    console.log("1:" + id_cook);
    console.log("2" + id_meal);
    console.log("hah" + portions);

    let id_customer = req.session.user[0].id;
    var isCompleteOrder = id_cook && id_meal && portions;

    console.log(isCompleteOrder);


    if (isCompleteOrder) {
        try {
            var queryResult = await dataPool.createOrder(id_cook, id_customer, id_meal, portions);
            if (queryResult.affectedRows) {
                console.log("New order added!!");
                res.json(queryResult);
            }
        } catch (err) {
            console.log(err);
            res.sendStatus(500);
        }
    } else {
        console.log("A field is empty!!");
    }

    res.end();
});


meal.get('/order/:id', async (req,res, next)=>{
    let id_user = req.session.user[0].id
    try{
        var queryResult=await dataPool.getOrderForUser(id_user);
        res.json(queryResult)
    }
    catch(err){
        console.log(err)
        res.sendStatus(500)
    }
})

module.exports=meal