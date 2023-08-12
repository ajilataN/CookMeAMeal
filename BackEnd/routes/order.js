const express= require("express")
const order = express.Router()
const DB=require('../db/conn.js')
const { dataPool } = require('../db/conn.js')


order.use(express.json())

// Inserts a new order to the database
order.post('/', async (req, res, next) => {
    let id_cook = req.body.id_cook
    let id_meal = req.body.id_meal
    let portions = req.body.portions

    console.log("Logged in user with id: " + req.session.user[0].id)

    if (!req.session || !req.session.user) {
        return res.status(401).json({ error: "User not logged in" })
    }

    let id_customer = req.session.user[0].id
    var isCompleteOrder = id_cook && id_meal && portions

    console.log(isCompleteOrder)


    if (isCompleteOrder) {
        try {
            var queryResult = await dataPool.createOrder(id_cook, id_customer, id_meal, portions)
            if (queryResult.affectedRows) {
                console.log("New order added!!")
                res.json(queryResult)
            }
        } catch (err) {
            console.log(err)
            res.sendStatus(500)
        }
    } else {
        console.log("A field is empty!!")
    }

    res.end()
})

// Retrieve my orders
order.get('/my', async (req,res, next)=>{
    let id_user = req.session.user[0].id
    try{
        var queryResult=await dataPool.getMyOrderForUser(id_user)
        res.json(queryResult)
    }
    catch(err){
        console.log(err)
        res.sendStatus(500)
    }
})

// Retrieve pending orders
order.get('/pending', async (req,res, next)=>{
    let id_user = req.session.user[0].id
    try{
        var queryResult=await dataPool.getPendingOrderForUser(id_user)
        res.json(queryResult)
    }
    catch(err){
        console.log(err)
        res.sendStatus(500)
    }
})

// Confirm an order
order.post('/confirm/:id', async (req, res, next) => {
    const orderId = req.params.id
  
    try {
      const confirmResult = await dataPool.confirmOrder(orderId)
      if (confirmResult.affectedRows) {
        res.json({ message: 'Order confirmed successfully' })
      }
    } catch (err) {
      console.log(err)
      res.sendStatus(500)
    }
  })
  


module.exports=order