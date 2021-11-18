const express = require('express');
const Query = require('../model/dbQuery.js');

const app = express();
const port = 8080;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// app.get('/qa/questions/:product_id/:page/:count', Query.getQuestions);

app.get('/qa/questions/:product_id/:page/:count', async (req, res) => {
  const {product_id} = req.params;
  try {
    await Query.getQuestions(product_id)
      .then((results) => res.send(results))
  } catch(err) {
    console.log(err)
  };
});

app.get('/qa/questions/:question_id/answers', (req, res) => {

});

app.listen(port, () => {
  console.log(`QA_Database listening at http://localhost:${port}`);
});