const express = require('express')
require('dotenv').config()
const cors=require("cors")

const app = express()
const dotenv = require("dotenv")
dotenv.config()

const port = process.env.PORT || 5020

//Import our custom modules-controllers
const feed= require("./routes/feed")
const db = require("./db/conn")
//Routes
app.use('/feed', feed);
//Some configurations
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
