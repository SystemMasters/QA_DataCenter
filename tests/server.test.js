const dbConnection = require('../model/dbQuery.js');


// add more details
describe("Get /qa/questions/:question_id/answers ", () => {
  it("should get all answers from the question_id, async () => {
    await supertest(app)
		.get("/qa/questions/:question_id/answers")
		.expect(200)
		.then((response) => {
			// Check the response type and length
			expect(Array.isArray(response.body)).toBeTruthy()
			expect(response.body.length).toEqual(1)
    })
  });
});