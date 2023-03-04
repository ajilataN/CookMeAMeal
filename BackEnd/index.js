const express = require('express')

const app = express()

const port = process.env.PORT || 5018

//Import opur custom modules-controllers
const meal= require("./routes/meal")
//Routes
app.use('/meal', meal);


app.get("/",(req,res)=>{
res.send("hola")
})

///App listening on port
app.listen(port, ()=>{
console.log(`Server is running on port: ${process.env.PORT || port}`)
})

