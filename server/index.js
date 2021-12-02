require('dotenv').config();
const express = require('express');
const Query = require('../model/dbQuery.js');

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

const port = process.env.PORT || 8080;
// const port = 3306;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// loader.io verification
app.get('/loaderio-9ff5e4986a8fff952d99fdf0e4bb49bf.txt', (req, res) => {
  res.send('loaderio-9ff5e4986a8fff952d99fdf0e4bb49bf');
});

app.get('/qa/questions/:product_id/:page/:count', async (req, res) => {
  try {
    const questionList = await Query.getQuestions(req, res);
    res.status(200).send(questionList);
  } catch(err) {
    res.status(500).send(err);
  };
});

app.get('/qa/questions/:question_id/answers', async (req, res) => {
  const {question_id} = req.params;
  try {
    const answerList = await Query.getAnswers(question_id, req, res);
    res.status(200).send(answerList);
  } catch(err) {
    res.status(500).send(err);
  }
});

app.post('/qa/questions', async (req, res) => {
  try {
    const posted = await Query.addQuestion(req, res);
    res.status(201).send('Thank you for adding a question');
  } catch(err) {
    res.status(500).send(err);
  }
})

app.put('/qa/questions/:question_id/helpful', async (req, res) => {
  try{
    const updated = await Query.updateQuestionHelpfulness(req, res);
    res.status(204).send('Question helpfulness is updated')
  } catch(err) {
    res.status(500).send(err);
  }
})

app.listen(port, () => {
  console.log(`QA_Database listening at http://localhost:${port}`);
});

module.exports = app;