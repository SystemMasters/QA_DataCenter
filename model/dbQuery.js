const db = require('../db/dbConnection.js');

const getQuestions = (productId) => {
  const sql = `select * from questions limit 5`;
  console.log('db----', db)
  db.query(
    sql
  ).then(res => {console.log(res)});
}
// const getQuestions = (productId) => {
//   const sql = `select * from questions limit 5`;
//   dbConnection.query (
//     sql
//   ) .then ((res) => console.log('results------', results))
//     .catch((err) => console.log('err------', err))
// };
// const getQuestions = (productId, req, res) => {
//   const sql = `select * from questions where productId=${productId} limit 5`;
//   return dbConnection.query (
//     sql,
//     (err, results) => {
//       if (err) {
//         console.log('err----', err);
//       } else {
//         console.log('results------for getQuestions', results)
//         res.send(results)
//         return results;
//       }
//     }
//   )
// };
// const getQuestions = (productId, req, res) => {
//   const sql = `select * from questions where productId=${productId} limit 5`;
//   return dbConnection.query (
//     sql,
//     (err, results) => {
//       if (err) {
//         console.log('err----', err);
//       } else {
//         console.log('results------for getQuestions', results)
//         res.send(results)
//         return results;
//       }
//     }
//   )
// };

const getAnswers = (req, res) => {

};

module.exports = {
  getQuestions,
  getAnswers
}