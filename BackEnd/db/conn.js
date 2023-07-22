const mysql = require ("mysql2")

const  conn = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS, 
    database: process.env.DB_DATABASE
  })

  // Checking connection establishment
 conn.connect((err) => {
      if(err){
          console.log("ERROR: " + err.message);
          return;    
      }
      console.log('Connection established');
    })

    let dataPool={}

// Query that retrieves all users for testing purposes, not needed later
dataPool.allUsers=()=>{
  return new Promise ((resolve, reject)=>{
    conn.query(`SELECT * FROM User JOIN Location on User.id_location = Location.id;`, (err,res)=>{
      if(err){return reject(err)}
      return resolve(res)
    })
  })
}

// Query that retreives all stored locations for testing purposes, not needed later
dataPool.allLocations=()=>{
  return new Promise ((resolve, reject)=>{
    conn.query(`SELECT * FROM Location`, (err,res)=>{
      if(err){return reject(err)}
      return resolve(res)
    })
  })
}

// Retreive all meals from the db, (feed of the app)
dataPool.allMeal=()=>{
  return new Promise ((resolve, reject)=>{
    conn.query(`SELECT * FROM Meal`, (err,res)=>{
      if(err){return reject(err)}
      return resolve(res)
    })
  })
}

// Get the meal with a specific id
dataPool.oneMeal=(id)=>{
  return new Promise ((resolve, reject)=>{
    conn.query(`SELECT * FROM Meal WHERE id = ?`, id, (err,res)=>{
      if(err){return reject(err)}
      return resolve(res)
    })
  })
}

// Get the id of the person who posted the meal
dataPool.getMealPoster = (id)=>{
  return new Promise ((resolve, reject)=>{
    conn.query(`SELECT id_user FROM Meal WHERE id = ?`, id, (err, res)=>{
      if(err){return reject(err)}
      return resolve(res)
    })
  })
}

// Insert a new meal in the db
dataPool.createMeal=(name,number_of_portions,time_ready,price,id_user)=>{
  return new Promise ((resolve, reject)=>{
    conn.query(`INSERT INTO Meal (name,number_of_portions,time_ready,price,id_user) VALUES (?,?,?,?,?)`, [name, number_of_portions, time_ready, price, id_user], (err,res)=>{
      if(err){return reject(err)}
      return resolve(res)
    })
  })
}

// Authenticate the user email, check if exists
dataPool.AuthUser=(email)=> {
  return new Promise ((resolve, reject)=>{
    conn.query('SELECT * FROM User WHERE email = ?', email, (err,res, fields)=>{
      if(err){return reject(err)}
      return resolve(res)
    })
  })
}

// Insert a new user in the db
dataPool.AddUser=(name, surname, email, telephone, password, id_location)=>{
  return new Promise ((resolve, reject)=>{
    conn.query(`INSERT INTO User (name, surname, email, telephone, password, id_location) VALUES (?,?,?,?,?,?)`, [name, surname, email, telephone, password, id_location], (err,res)=>{
      if(err){return reject(err)}
      return resolve(res)
    })
  })
}

// Get the id of an existing location
dataPool.getLocationIdByInput = (street, street_number, city, postal_code) => {
  return new Promise((resolve, reject) => {
    const query = `SELECT id FROM Location WHERE (street, street_number, city, postal_code) = (?,?,?,?) LIMIT 1`;

    conn.query(query, [street, street_number, city, postal_code], (err, res) => {
      if (err) {
        return reject(err);
      }
      return resolve(res);
    });
  });
}

// Add a new location in the db
dataPool.createLocation = (street, street_number, city, postal_code) => {
  return new Promise((resolve, reject) => {
    const query = `INSERT INTO Location (street, street_number, city, postal_code) VALUES (?,?,?,?)`;

    conn.query(query, [street, street_number, city, postal_code], (err, res) => {
      if (err) {
        return reject(err);
      }
      return resolve(res);
    });
  });
}

  
module.exports = {
  conn,
  dataPool
};
