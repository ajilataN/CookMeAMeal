const express= require("express")
const meal = express.Router();
const DB=require('../db/conn.js')
const { conn, dataPool } = require('../db/conn.js')
const session = require("express-session")

meal.use(express.json())

meal.use(session({
    secret: "somesecret",
    resave: false,
    saveUninitialized: false,
    cookies:{
        expires: new Date(Date.now() + (60 * 60 * 24 * 7 * 1000))
    }
  }));

//Gets all the news in the DB 
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

//Gets one new based on the id 
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


// Check if the user is logged-in
function isLogged(req, res, next) {
    if (req.session.user) {
      // User logged and has a session started
      next();
    } else {
      // User is not logged
      console.log("Not authenticated!");
      res.sendStatus(401);
    }
  }

/*
//Inserts one new to the database
meal.post('/', async (req,res, next)=>{
    
  let name = req.body.name
  let number_of_portions = req.body.number_of_portions
  let time_ready = req.body.time_ready
  let price = req.body.price
  let id_user = req.session.user[0].id

    var isAcompleteMealPost=name && number_of_portions && time_ready && price && id_user
    if (isAcompleteMealPost) {
        try{
            var queryResult=await dataPool.createMeal(name, number_of_portions, time_ready, price, id_user)
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
*/

// Create a new meal with respect to the logged-in user ID
meal.post('/createMeal', async (req, res) => {
    try {
      const { name, time_ready, number_of_portions, prcie } = req.body;
      const id_user = req.session.user[0].id; // Get the logged-in user ID from the session
  
      // Check if all required fields are provided
      if (name && time_ready && number_of_portions && price && id_user) {
        // Insert the meal into the database
        const queryResult = await dataPool.createMeal(name, number_of_portions, time_ready, price, id_user);
        if (queryResult.affectedRows) {
          console.log("New meal added!!");
          res.sendStatus(200); // Success response
        } else {
          console.log("Failed to add a new meal!");
          res.sendStatus(500); // Internal server error response
        }
      } else {
        console.log("Missing required fields!");
        res.sendStatus(400); // Bad request response
      }
    } catch (err) {
      console.log(err);
      res.sendStatus(500); // Internal server error response
    }
  });

module.exports=meal
