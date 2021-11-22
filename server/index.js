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

app.get('/qa/questions/:product_id/:page/:count', async (req, res) => {
  try {
    const questionList = await Query.getQuestions(req, res);
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

app.post('/qa/questions', async (req, res) => {
  try {
    const posted = await Query.addQuestion(req, res);
    res.status(201).send('Thank you for adding a question');
  } catch(err) {
    console.log('err from getAnswers route', err)
    res.status(500).send(err)
  }
})

app.put('/qa/questions/:question_id/helpful', async (req, res) => {
  try{
    const updated = await Query.updateQuestionHelpfulness(req, res);
    console.log('what is updated', updated)
    res.status(204).send('Question helpfulness is updated')
    //204 is no content
    // await Query.updateQuestionHelpfulness(req, res);
  } catch(err) {
    console.log('what is the put err', err)
    res.status(500).send(err);
  }
})

app.listen(port, () => {
  console.log(`QA_Database listening at http://localhost:${port}`);
});

module.exports = app;