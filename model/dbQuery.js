const dbConnection = require('../db/dbConnection.js');

const getQuestions = (req, res) => {
  const {product_id, page, count} = req.params;
  //TO DO: figure out how to add defaults for page and count
  // const sql = `
  //   SELECT q.*,
  //     JSON_OBJECT('a.answer_id', JSON_OBJECT('id', a.answer_id, 'body', a.body, 'date', a.date, 'answerer_name', a.name, 'helpfulness', a.helpfulness,
  //     'photos', JSON_ARRAY(JSON_OBJECT('id', p.photoId, 'url', p.url))))
  //     AS answers

  //   FROM questions AS q
  //   LEFT JOIN answers AS a
  //   ON q.question_id = a.questionID
  //   LEFT JOIN photos AS p
  //   ON a.answer_id = p.answerID
  //   WHERE q.productId = ?
  // `;
  const sql = `
    SELECT q.*,
    CASE
    WHEN a.answer_id
    THEN JSON_OBJECT(a.answer_id,
      JSON_OBJECT('id', a.answer_id, 'body', a.body, 'date', a.date, 'answerer_name', a.name, 'helpfulness', a.helpfulness,
      'photos',
        CASE
        WHEN p.photoId
        THEN JSON_ARRAY(JSON_OBJECT('id', p.photoId, 'url', p.url))
        ELSE JSON_ARRAY()
        END
      )
    )
    ELSE JSON_OBJECT()
    END
    AS answers

    FROM questions AS q
    LEFT JOIN answers AS a
    ON q.question_id = a.questionID
    LEFT JOIN photos AS p
    ON a.answer_id = p.answerID
    WHERE q.productId = ?
  `;
  // JSON_OBJECT() this return a empty object;
  const value = [product_id];
  return dbConnection.promise().query(sql, value)
           .then(result => result[0])
           .catch(err => err);
};
// SELECT * FROM questions WHERE productId = ? LIMIT ?
// getQuestions();

const getAnswers = (question_id, req, res) => {
  const sql = `
    SELECT a.*,
    CASE
    WHEN p.photoId
    THEN (JSON_ARRAY(JSON_OBJECT('id', p.photoId, 'url', p.url)))
    ELSE (JSON_ARRAY())
    END AS photos
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
  const sql = `SELECT JSON_OBJECT ('id', photoId, 'url', url) FROM photos WHERE answerId = ${answer_id}`;
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
    // res.status(200).send('thank you')
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