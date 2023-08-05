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
    const query = 'SELECT m.id AS mealId, m.name, m.number_of_portions, m.date, m.time_ready, m.price, m.id_user, u.name AS u_name, u.surname, l.id as locationId, l.street, l.street_number, l.city, l.postal_code FROM Meal AS m JOIN User AS u ON m.id_user = u.id JOIN Location AS l ON u.id_location = l.id;'

    
    conn.query(query, (err,res)=>{
      if(err){return reject(err)}
      return resolve(res)
    })
  })
}

// Get the meal with a specific id
dataPool.oneMeal=(id)=>{
  return new Promise ((resolve, reject)=>{
    // const query=`SELECT 
    //     m.id as mealId, m.name, m.number_of_portions, m.date, m.time_ready, m.price, m.id_user,
    //     u.name as u_name, u.surname, 
    //     l.id as locationId, l.street, l.street_number, l.city, l.postal_code, 
    //     i.name as i_name, i.id_meal 
    //     FROM Meal AS m JOIN User AS u ON m.id_user = u.id 
    //     JOIN Location AS l ON u.id_location = l.id 
    //     JOIN Ingredient AS i ON m.id = i.id_meal 
    //     WHERE m.id = ?
    //   `

    const query = `SELECT 
    m.id AS mealId, m.name, m.number_of_portions, m.date, m.time_ready, m.price, m.id_user,
    u.name AS u_name, u.surname, 
    l.id AS locationId, l.street, l.street_number, l.city, l.postal_code,
    i.i_names
    FROM Meal AS m 
    JOIN User AS u ON m.id_user = u.id 
    JOIN Location AS l ON u.id_location = l.id 
    JOIN (
          SELECT id_meal, GROUP_CONCAT(name) AS i_names 
          FROM Ingredient 
          GROUP BY id_meal
      ) 
    AS i ON m.id = i.id_meal
    WHERE m.id = ?;
`
    conn.query(query, id, (err,res)=>{
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


// // Insert a new meal in the db
// dataPool.createMeal=(name,number_of_portions,date,time_ready,price,id_user)=>{
//   return new Promise ((resolve, reject)=>{
//     conn.query(`INSERT INTO Meal (name, number_of_portions, date, time_ready, price, id_user) VALUES (?,?,?,?,?,?)`, [name, number_of_portions, date, time_ready, price, id_user], (err,res)=>{
//       if(err){return reject(err)}
//       return resolve(res)
//     })
//   })
// }


dataPool.createMeal = (name, number_of_portions, date,  time_ready, price, id_user, ingredients) => {
  return new Promise((resolve, reject) => {
    conn.beginTransaction((err) => {
      if (err) { return reject(err); }

      // Insert the new meal
      conn.query(
        `INSERT INTO Meal (name, number_of_portions, date, time_ready, price, id_user) VALUES (?, ?, ?, ?, ?, ?)`,
        [name, number_of_portions, date, time_ready, price, id_user],
        (err, mealResult) => {
          if (err) {
            conn.rollback(() => {
              reject(err);
            });
          } else {
            const mealId = mealResult.insertId;
            console.log(mealId)
            console.log(ingredients)
            // Insert ingredients for the meal
            if (ingredients && ingredients.length > 0) {
              const ingredientValues = ingredients.map((ingredient) => [ingredient.name, mealId]).flat();
              console.log(ingredientValues)
              conn.query(
                `INSERT INTO Ingredient (name, id_meal) VALUES ?`,
                [ingredientValues],
                (err, ingredientResult) => {
                  if (err) {
                    conn.rollback(() => {
                      reject(err);
                    });
                  } else {
                    conn.commit((err) => {
                      if (err) {
                        conn.rollback(() => {
                          reject(err);
                        });
                      } else {
                        resolve({ mealId, ingredientResult });
                      }
                    });
                  }
                }
              );
            } else {
              conn.commit((err) => {
                if (err) {
                  conn.rollback(() => {
                    reject(err);
                  });
                } else {
                  resolve({ mealId });
                }
              });
            }
          }
        }
      );
    });
  });
};


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



module.exports = { conn, dataPool };