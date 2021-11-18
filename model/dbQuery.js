const dbConnection = require('../db/dbConnection.js');

const getQuestions = (productId) => {
  const sql = `select * from questions limit 5`;
  dbConnection.query (
    sql,
    (err, results) => {
      if (err) {
        console.log('err----', err);
      } else {
        console.log('results------', results)
      }
    }
  )
};

const getAnswers = (req, res) => {

};

module.exports = {
  getQuestions,
  getAnswers
}