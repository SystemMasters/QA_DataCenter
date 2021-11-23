const app = require('../server/index.js')
const dbConnection = require('../model/dbQuery.js');
const supertest = require('supertest');

describe("Get /qa/questions/:product_id/:page/:count", () => {
  it("should get all questions from the product_id", async () => {
    await supertest(app)
      .get('/qa/questions/61575/1/5')
      .expect(200)
      .then(response => {
        expect(Array.isArray(response.body)).toBeTruthy()
        expect(response.body[0].productId).toBe(61575)
        expect(Array.isArray(response.body[0].answers)).toBeFalsy()
        expect(typeof response.body[0].answers).toBe('object')
      })
  });
});

describe("Get /qa/questions/:question_id/answers", () => {
  it("should get all answers from the question_id", async () => {
    await supertest(app)
      .get('/qa/questions/21701/answers')
      .expect(200)
      .then(response => {
        expect(Array.isArray(response.body)).toBeTruthy()
        expect(response.body[0].questionID).toBe(21701)
        expect(Array.isArray(response.body[0].photos)).toBeTruthy()
      })
  });
});

describe("Post /qa/questions", () => {
  it("should post a question to the specifified product", async () => {
    const testingData = {
      product_id: 61575,
      body: "This is a test",
      name: "tester",
      email: "testing@gmail.com"
    };
    await supertest(app)
      .post('/qa/questions')
      .send(testingData)
      .expect(201)
      .then (async (response) => {
        // expect(response.body.name).toBe(testingData.name)
      })
  });
});

describe("Put /qa/questions/:question_id/helpful", () => {
  it("should update the question helpfulness", async () => {
    await supertest(app)
      .put('/qa/questions/21701/helpful')
      .expect(204)
  });
});