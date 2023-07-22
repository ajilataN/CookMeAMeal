//Requirements for handling app functionalities
const express = require('express')
const cors=require("cors")
const cookieParser = require("cookie-parser")
const path = require("path")
const app = express()
const dotenv = require("dotenv")
dotenv.config()

const port = process.env.PORT || 5020

//Import our custom modules-controllers
const meal= require("./routes/meal")
const users = require("./routes/users")
const db = require("./db/conn")

//Routes
app.use('/meal', meal);
app.use('/location', users);
app.use('/users', users);

//Some configurations
app.use(express.json())
app.use(cookieParser("somesecret"))
app.use(express.urlencoded({extended : true}));
app.use(cors({
  origin:["http://88.200.63.148:3018"],
  methods:["GET", "POST"],
  credentials:true
}))



app.get("/",(req,res)=>{
res.send("hola")
})


///App listening on port
app.listen(port, ()=>{
console.log(`Server is running on port: ${process.env.PORT || port}`)
})

