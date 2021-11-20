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
  // const sql = `
  //   SELECT a.answer_id, a.body, a.questionID, a.date, a.name, a.email, a.reported, a.helpfulness, p.photoId, p.url
  //   FROM answers AS a
  //   LEFT JOIN photos AS p
  //   ON a.answer_id = p.answerId
  //   WHERE a.questionID=${question_id};
  // `;
  const sql = `
    SELECT a.*, JSON_ARRAY(JSON_OBJECT('id', p.photoId, 'url', p.url)) AS photos
    FROM answers AS a
    LEFT JOIN photos AS p
    ON a.answer_id = p.answerId
    WHERE a.questionID=${question_id};
  `;
  const value = [question_id, 10];
  return dbConnection.promise().query(sql)
           .then(result => result[0])
           .catch(err => err);
};


const getPhotos = (answer_id, req, res) => {
  // const sql = `SELECT * FROM photos WHERE answerID = ? LIMIT ? `;
  // const value = [5, 10];
  // return dbConnection.promise().query(sql, value)
  // .then(result => console.log(result[0]))
  // .catch(err => err);
  const sql = `SELECT JSON_OBJECT ('id', photoId, 'url', url) FROM photos WHERE answerId = ${answer_id} `;
  return dbConnection.promise().query(sql)
    .then(result => console.log(Object.values(result[0][0])))
    .catch(err => err);
};

// getPhotos(422911);

const addQuestion = async (req, res) => {
  const {product_id, body, name, email} = req.body;
  console.log('what is req body', req.body);
  const sql = `INSERT INTO questions (productId, questionBody, name, email) VALUES(?, ?, ?, ?)`;
  const value = [product_id, body, name, email];
  try {
    const result = await dbConnection.promise().query(sql, value);
    console.log('addQuestion Query---', result)
    return result;
  } catch(err) {
    console.log('addQuestion err---', err);
    return err;
  };
};

// question_id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
// productId INT NOT NULL,
// questionBody TEXT NOT NULL,
// questionDate BIGINT,
// name VARCHAR(50) NOT NULL,
// email VARCHAR(50) NOT NULL,

const addAnswer = () => {

};

const updateQuestionHelpfulness = async (req, res) => {
  const {question_id} = req.params;
  console.log('what is req.param', req.params);
  const sql = `
    UPDATE questions
    SET question_helpfulness = question_helpfulness + 1
    WHERE question_id = ?
  `;
  const value = [question_id];
  try {
    const result = await dbConnection.promise().query(sql, value);
    console.log('updateQuestionHelpfulness Query---', result)
    return result;
  } catch(err) {
    console.log('updateQuestionHelpfulness err---', err);
    return err;
  };
};

module.exports = {
  getQuestions,
  getAnswers,
  addQuestion,
  addAnswer,
  updateQuestionHelpfulness
};


// const getQuestions = (productId) => {
//   const sql = `select * from questions where productId=${productId} limit 5`;
//   return db().then(connection => {
//    return connection.query(sql)
//       .then(res => res[0])
//       .catch(err => console.log('getQuestions err', err))
//   });
// }