require('dotenv').config();
const express = require('express');
const Query = require('../model/dbQuery.js');

const app = express();
const port = process.env.PORT || 8080;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// app.get('/qa/questions/:product_id/:page/:count', Query.getQuestions);

app.get('/qa/questions/:product_id/:page/:count', async (req, res) => {
  const {product_id} = req.params;
  try {
    // await Query.getQuestions(product_id, req, res)
    //   .then((results) => {res.send(results); console.log('what is results for APP.get', results)})
    const result = await Query.getQuestions(product_id, req, res);
    console.log('-----', result);
    res.send(result)
  } catch(err) {
    console.log(err)
  };
});

app.get('/qa/questions/:question_id/answers', (req, res) => {

});

app.listen(port, () => {
  console.log(`QA_Database listening at http://localhost:${port}`);
});