require('dotenv').config();
const express = require('express');
const Query = require('../model/dbQuery.js');

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

const port = process.env.PORT || 8080;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// app.get('/qa/questions/:product_id/:page/:count', Query.getQuestions);

app.get('/qa/questions/:product_id/:page/:count', async (req, res) => {
  const {product_id} = req.params;
  try {
    const questionList = await Query.getQuestions(product_id, req, res);
    console.log('-----QuestionList', questionList);
    res.send(questionList);
  } catch(err) {
    console.log(err)
  };
});

app.get('/qa/questions/:question_id/answers', async (req, res) => {
  const {question_id} = req.params;
  try {
    const answerList = await Query.getAnswers(question_id, req, res);
    console.log('-----answerList', answerList);
    res.send(answerList);
  } catch(err) {
    console.log('err from getAnswers route', err)
  }
});

app.listen(port, () => {
  console.log(`QA_Database listening at http://localhost:${port}`);
});