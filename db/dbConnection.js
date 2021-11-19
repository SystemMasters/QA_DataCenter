require('dotenv').config();
const mysql = require('mysql2');


// const connection = mysql.createConnection({
//     host: process.env.dbHost,
//     user: process.env.dbUser,
//     database: process.env.dbName,
//     password: process.env.dbPassword
// })
// // connection.promise().query('SELECT * FROM Questions limit 3')
// //   .then((results) => console.log('this is resutls', results[0]))
// //   .catch(err => console.log('this is an err', err));

// module.exports = connection;


const db = async () => {
  const mysql = require('mysql2/promise');
  const connection = await mysql.createConnection({
    host: process.env.dbHost,
    user: process.env.dbUser,
    database: process.env.dbName,
    password: process.env.dbPassword
  });
  // const result = await connection.query('SELECT * FROM Questions limit 3')
  // console.log(result[0]);
  // return result[0];
  return connection;
}

// db().then(result =>
//   result.query('SELECT * FROM Questions limit 3').then(result1 => console.log(result1[0]))
// )

module.exports = db;





