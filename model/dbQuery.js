const db = require('../db/dbConnection.js');

// const getQuestions = (productId) => {
//   const sql = `select * from questions limit 5`;
//   db.promise().query(
//     sql
//   ).then(res => {console.log(res[0])});
// }

const getQuestions = (productId) => {
  const sql = `select * from questions where productId=${productId} limit 5`;
  return db().then(connection => {
   return connection.query(sql)
      .then(res => res[0])
      .catch(err => console.log('getQuestions err', err))
  });
}

// getQuestions();

const getAnswers = (req, res) => {

};

module.exports = {
  getQuestions,
  getAnswers
}