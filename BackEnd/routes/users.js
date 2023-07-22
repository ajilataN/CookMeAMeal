const express= require("express")
const users = express.Router()
const { conn, dataPool } = require('../db/conn.js')
const session = require("express-session")

users.use(express.json());

users.use(session({
  secret: "somesecret",
  resave: false,
  saveUninitialized: false,
  cookie:{
      expires: 60*2
  }
}));

users.get('/', async (req, res) => {
    try {
      let users = await dataPool.allUsers();
      res.json(users);
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
  });

  users.get('/location', async (req, res) => {
    try {
      let users = await dataPool.allLocations();
      res.json(users);
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
  });
  
//Checks if user submited both fields, if user exist and if the combiation of user and password matches
users.post('/login', async (req, res) => {
    var email = req.body.email;
	  var password = req.body.password;

    if (email && password) {
        try {
         let queryResult=await dataPool.AuthUser(email);
                if(queryResult.length>0) {
                    if(password===queryResult[0].password) {
                      req.session.user=queryResult;
                      console.log(req.session.user)
                      console.log(queryResult)
                      console.log("SESSION VALID");
                      res.redirect('/');
                    }
                    else {
                      console.log("INCORRECT PASSWORD");
                    }
                } else {
                 console.log("USER NOT REGISTRED");   
                }
        }
        catch(err){
            console.log(err)
            res.sendStatus(500)
        }    
    }
    else {
        console.log("Please enter Email and Password!")
    }
    res.end();
});

//Inserts a new user into the database
users.post('/register', async (req, res) => {
    let name = req.body.name
    let surname = req.body.surname
	  let password = req.body.password
    let email= req.body.email
    let telephone = req.body.telephone
    let street = req.body.street
    let street_number = req.body.street_number
    let city = req.body.city
    let postal_code = req.body.postal_code

    
    if (name && password && email && surname && telephone && street && street_number && city && postal_code) {
      try{
        // Check if the location already exists
        let id_location = await getLocationId(street, street_number, city, postal_code)

        // Create also the location if the location does not exist in the table
        if(!id_location){
          id_location = await createLocation(street, street_number, city, postal_code)
        }

        // Create the user with the corresponding id_location
        let queryResult=await dataPool.AddUser(name, surname, email, telephone, password, id_location);
        if (queryResult.affectedRows) {
           console.log("New user added!!")
        }

      } catch(err){
            console.log(err)
            res.sendStatus(500)
        }    
    }
    else
    {
        console.log("A field is missing!")
    }
    res.end();
});

// Retreive the id of the location if exists
async function getLocationId(street, street_number, city, postal_code) {
  try {
    const locationQuery = await dataPool.getLocationIdByInput(street, street_number, city, postal_code);
    if (locationQuery.length > 0) {
      return locationQuery[0].id;
    }
    return null;
  } catch (err) {
    throw err;
  }
}

// Create a new location if needed
async function createLocation(street, street_number, city, postal_code) {
  try {
    const locationQuery = await dataPool.createLocation(street, street_number, city, postal_code);
    return locationQuery.insertId;
  } catch (err) {
    throw err;
  }
}

module.exports=users
