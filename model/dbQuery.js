const dbConnection = require('../db/dbConnection.js');

const getQuestions = (productId) => {
  const sql = `SELECT * FROM questions WHERE productId = ? LIMIT ?`;
  const value = [productId, 10];
  return dbConnection.promise().query(sql, value)
           .then(result => result[0])
           .catch(err => err);
};

// getQuestions();

const getAnswers = (question_id, req, res) => {
  const sql = `SELECT * FROM answers WHERE questionID = ? LIMIT ? `;
  const value = [question_id, 10];
  return dbConnection.promise().query(sql, value)
           .then(result => result[0])
           .catch(err => err);
};

module.exports = {
  getQuestions,
  getAnswers
};


// const getQuestions = (productId) => {
//   const sql = `select * from questions where productId=${productId} limit 5`;
//   return db().then(connection => {
//    return connection.query(sql)
//       .then(res => res[0])
//       .catch(err => console.log('getQuestions err', err))
//   });
// }