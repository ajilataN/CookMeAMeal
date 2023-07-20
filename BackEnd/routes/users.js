const express= require("express")
const users = express.Router();
const DB=require('../db/conn.js')

//Checks if user submited both fields, if user exist and if the combiation of user and password matches
users.post('/login', async (req, res) => {
    var email = req.body.email;
	var password = req.body.password;
    if (username && password) 
    {
        try
        {
         let queryResult=await DB.AuthUser(email);
        
                if(queryResult.length>0)
                {
                    if(password===queryResult[0].password) // old: .user_password
                    {
                    req.session.user=queryResult;
                    console.log(req.session.user)
                     console.log(queryResult)
                     console.log("SESSION VALID");
                    
                     //res.redirect('/');
                    }
                    else
                    {
                        console.log("INCORRECT PASSWORD");
                    }
                }else 
                {
                 console.log("USER NOT REGISTRED");   
                }
        }
        catch(err){
            console.log(err)
            res.sendStatus(500)
        }    
    }
    else
    {
        console.log("Please enter Email and Password!")
    }
    res.end();
});

//Inserts a new user in our database id field are complete
users.post('/register', async (req, res) => {
    
    let name = req.body.name
    let surname = req.body.surname
	let password = req.body.password
    let email= req.body.email
    let telephone = req.body.telephone
    let id_location = req.body.id_location
    if (name && password && email && surname && telephone && id_location) 
    {
        try
        {
         let queryResult=await DB.AddUser((name,surname, email, telephone, password, id_location) );
         if (queryResult.affectedRows) {
            console.log("New user added!!")
          }
               
        }
        catch(err){
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

module.exports=users
