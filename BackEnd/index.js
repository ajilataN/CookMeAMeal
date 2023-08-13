//Requirements for handling app functionalities
const express = require('express')
const dotenv = require("dotenv")
const app = express()
const session = require('express-session');
const cors=require("cors")
const cookieParser = require("cookie-parser")
const path = require("path")

dotenv.config()

app.use(cors({
  origin:["http://88.200.63.148:3018"],
  methods:["GET", "POST", "DELETE"],
  credentials:true
}))

//Some configurations
app.use(express.urlencoded({extended : true}))
app.use(cookieParser("somesecret"))

app.use(session({
  secret: "somesecret",
  resave: false,
  saveUninitialized: false,
  cookies: {
    expires: 60 * 2 * 1000
  }
}))

const port = process.env.PORT || 5020


//Import our custom modules-controllers
const meal= require("./routes/meal")
const users = require("./routes/users")
const order = require("./routes/order")
const db = require("./db/conn")


//Routes
app.use('/meal', meal);
app.use('/users', users);
app.use('/order', order);


app.get("/",(req,res)=>{
res.send("hola")
})


///App listening on port
app.listen(port, ()=>{
console.log(`Server is running on port: ${process.env.PORT || port}`)
})

