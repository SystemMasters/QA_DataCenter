const dbConnection = require('../db/dbConnection.js');

const getQuestions = (req, res) => {
  const {product_id, page, count} = req.params;
  const sql = `
    SELECT q.*,
      CASE
        WHEN a.answer_id
        THEN JSON_OBJECT(a.answer_id,
          JSON_OBJECT('id', a.answer_id, 'body', a.body, 'date', a.date, 'answerer_name',
          a.answerer_name, 'helpfulness', a.helpfulness,
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
  const value = [product_id];
  return dbConnection.promise().execute(sql, value)
           .then(result => result[0])
           .catch(err => err);
};

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
  return dbConnection.promise().execute(sql)
           .then(result => result[0])
           .catch(err => err);
};

const getPhotos = (answer_id, req, res) => {
  const sql = `SELECT JSON_OBJECT ('id', photoId, 'url', url) FROM photos WHERE answerId = ${answer_id}`;
  return dbConnection.promise().execute(sql)
    .then(result => Object.values(result[0][0]))
    .catch(err => err);
};

const addQuestion = async (req, res) => {
  const {product_id, body, name, email} = req.body;
  const sql = `INSERT INTO questions (productId, question_body, asker_name, email) VALUES(?, ?, ?, ?)`;
  const value = [product_id, body, name, email];
  try {
    const result = await dbConnection.promise().execute(sql, value);
    return result;
  } catch(err) {
    return err;
  };
};

const updateQuestionHelpfulness = async (req, res) => {
  const {question_id} = req.params;
  const sql = `
    UPDATE questions
    SET question_helpfulness = question_helpfulness + 1
    WHERE question_id = ?
  `;
  const value = [question_id];
  try {
    const result = await dbConnection.promise().execute(sql, value);
    return result;
  } catch(err) {
    return err;
  };
};

module.exports = {
  getQuestions,
  getAnswers,
  addQuestion,
  updateQuestionHelpfulness
};
