const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'QA_Data'
});

connection.query(
  'SELECT * FROM Questions limit 3',
  (err, results) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log('Connection is created------------');
  }
);

module.exports = connection;




