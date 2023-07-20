const mysql = require ("mysql2")

const  conn = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS, 
    database: process.env.DB_DATABASE
  })

 conn.connect((err) => {
      if(err){
          console.log("ERROR: " + err.message);
          return;    
      }
      console.log('Connection established');
    })

    let dataPool={}
  
dataPool.allFeed=()=>{
  return new Promise ((resolve, reject)=>{
    conn.query(`SELECT * FROM Feed`, (err,res)=>{
      if(err){return reject(err)}
      return resolve(res)
    })
  })
}

dataPool.oneMeal=(id)=>{
  return new Promise ((resolve, reject)=>{
    conn.query(`SELECT * FROM Feed WHERE id = ?`, id, (err,res)=>{
      if(err){return reject(err)}
      return resolve(res)
    })
  })
}

dataPool.createMeal=(name,number_of_portions,time_ready,price,id_user)=>{
  return new Promise ((resolve, reject)=>{
    conn.query(`INSERT INTO Meal (name,number_of_portions,time_ready,price,id_user) VALUES (?,?,?,?,?)`, [name, number_of_portions, time_ready, price, id_user], (err,res)=>{
      if(err){return reject(err)}
      return resolve(res)
    })
  })
}

dataPool.AuthUser=(email)=>
{
  return new Promise ((resolve, reject)=>{
    conn.query('SELECT * FROM User WHERE email = ?', email, (err,res, fields)=>{
      if(err){return reject(err)}
      return resolve(res)
    })
  })  
	
}

dataPool.AddUser=(name, surname, email, telephone, password, id_location)=>{
  return new Promise ((resolve, reject)=>{
    conn.query(`INSERT INTO User (name, surname, email, telephone, password, id_location) VALUES (?,?,?,?,?,?)`, [name, surname, email, telephone, password, id_location], (err,res)=>{
      if(err){return reject(err)}
      return resolve(res)
    })
  })
}



  
module.exports = conn