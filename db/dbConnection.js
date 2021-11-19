require('dotenv').config();

// async function db() {
//   const mysql = require('mysql2/promise');
//   try{
//     const connection = await mysql.createConnection({
//       host: 'localhost',
//       user: 'root',
//       database: 'QA_Data'
//     });
//     return connection;
//     // return connection.query(
//     //   'SELECT * FROM Questions limit 3',
//     //   (err, results) => {
//     //     if (err) {
//     //       console.log(err);
//     //       return;
//     //     }
//     //     console.log('Connection is created------------');
//     //   }
//     // );
//   } catch(err) {console.log('err is', err)}
// }

const mysql = require('mysql2');
const db2 = async () => {
  const pool = mysql.createConnection({
    host: process.env.dbHost,
    user: process.env.dbUser,
    database: process.env.dbName,
    password: process.env.dbPassword
  });
    // now get a Promise wrapped instance of that pool
  const promisePool = await pool.promise();
  console.log('data is running')
  return promisePool;
  // const [rows, fields] = await promisePool.execute('select ?+? as sum', [2, 2]);
  // console.log('data is running', rows, fields)
}

const db = db2.connection();
module.exports = db;


// const mysql = require('mysql2');

// const connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   database: 'QA_Data'
// });

// connection.query(
//   'SELECT * FROM Questions limit 3',
//   (err, results) => {
//     if (err) {
//       console.log(err);
//       return;
//     }
//     console.log('Connection is created------------');
//   }
// );

// module.exports = connection;




