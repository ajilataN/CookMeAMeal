const express= require("express")
const users = express.Router()
const bcrypt = require('bcryptjs')
const { conn, dataPool } = require('../db/conn.js')
const emailValidator = require('deep-email-validator')
const passwordValidator = require('password-validator')
var pattern = new passwordValidator()

users.use(express.json())

users.get('/', async (req, res) => {
    try {
      let users = await dataPool.allUsers() 
      res.json(users) 
    } catch (err) {
      console.log(err) 
      res.sendStatus(500) 
    }
  }) 

  // Testing endpoint not needed later 
  users.get('/location', async (req, res) => {
    try {
      let users = await dataPool.allLocations() 
      res.json(users) 
    } catch (err) {
      console.log(err) 
      res.sendStatus(500) 
    }
  }) 

  // Get the logged person
  users.get('/login',(req,res)=>{
    if(req.session.user) 
    {
    res.send({
         logged:true,
         user:req.session.user
     })
  
    }
    else
    {
        res.send({logged:false})
    }
  })
  
// Checks if user submited both fields, if user exist and if the combiation of user and password matches
users.post('/login', async (req, res) => {
    var email = req.body.email 
	  var password = req.body.password 

    var isRegisteredUser = email && password
    if (isRegisteredUser) {
        try {
         let queryResult=await dataPool.AuthUser(email) 
            if(queryResult.length>0) {
              const loggedUser = queryResult[0]
              const passwordMatch = await bcrypt.compare(password, loggedUser.password)

                if(passwordMatch) {
                  console.log(queryResult[0].id)
                  req.session.user=queryResult
                  console.log(req.session.user)
                  console.log(queryResult)
                  console.log("SESSION VALID") 
                  res.json(queryResult)
              }
                else {
                  console.log("INCORRECT PASSWORD")
                  res.send("INCORRECT PASSWORD") 
                }
            } else {
             console.log("USER NOT REGISTRED")
             res.send("USER NOT REGISTRED")    
            }
        }
        catch(err){
            console.log(err)
            res.sendStatus(500)
        }    
    }
    else {
        res.send("ENTER EMAIL AND PASSWORD")
        console.log("ENTER EMAIL AND PASSWORD")
    }
    res.end() 
}) 

// Logout request
users.post('/logout', async (req, res) => {
  req.session.destroy() // Clear the session
  res.status(200).send("Logged out successfully")
})

// Inserts a new user into the database
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

  const {valid, reason, validators} = await isEmailValid(email)
  const validPw = await isStrongPassword(password)

    if (!valid){
      return res.status(400).send({
        message: "Please provide a valid email address.",
        reason: validators[reason].reason
      })
    }

    if(!validPw){
      return res.status(400).send({
        message: "Password too weak!"
    })
    }
    

    var isCompleteForm = name && password && email && surname && telephone && street && street_number && city && postal_code
    if (isCompleteForm) {
      try{
        // Check if the location already exists
        let id_location = await getLocationId(street, street_number, city, postal_code)

        // Create also the location if the location does not exist in the table
        if(!id_location){
          id_location = await createLocation(street, street_number, city, postal_code)
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10) // Use 10 rounds of hashing

        // Create the user with the corresponding id_location
        let queryResult=await dataPool.AddUser(name, surname, email, telephone, hashedPassword, id_location) 
        if (queryResult.affectedRows) {
           console.log("New user added!!")
        }

      } catch(err){
            console.log("Errrror:" ,  err)
            //res.sendStatus(500)
            return res.status(400).send({
              message: "User already registered!"
          })
        }    
    }
    else {
        res.send("MISSING FIELD")
        console.log("A field is missing!")
    }
    res.end() 
}) 


// #####################  Custom functions  #################################
// Retreive the id of the location if exists
async function getLocationId(street, street_number, city, postal_code) {
  try {
    const locationQuery = await dataPool.getLocationIdByInput(street, street_number, city, postal_code)
    if (locationQuery.length > 0) {
      return locationQuery[0].id
    }
    return null 
  } catch (err) {
    throw err 
  }
}

// Create a new location if needed
async function createLocation(street, street_number, city, postal_code) {
  try {
    const locationQuery = await dataPool.createLocation(street, street_number, city, postal_code) 
    return locationQuery.insertId 
  } catch (err) {
    throw err
  }
}

// Relevantness of the email
async function isEmailValid(email) {
  return emailValidator.validate(email)
}

// Add properties for a strong password to the pattern
pattern
.is().min(8)
.is().max(100)
.has().uppercase()
.has().lowercase()
.has().digits(2)
.has().not().spaces()
.is().not().oneOf(['Passw0rd', 'Password123']) 

// Ensure strong password
async function isStrongPassword(password){
  return pattern.validate (password)
}


module.exports=users
