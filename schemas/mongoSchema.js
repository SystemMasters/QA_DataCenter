const mongoose = require('mongoose');

async function connect() {
  await mongoose.connect('mongodb://localhost/QA_Data');
};
connect();

const QuestionsSchema = new mongoose.Schema({
  question_id: Number,
  question_body: String,
  question_date: Date,
  asker_name: String,
  question_helpfulness: Number,
  reported: Boolean,
  answers: [
    {
      answer_id: Number,
      body: String,
      date: Date,
      answerer_name: String,
      helpfulness: Number,
      photos: [
        {
          id: Number,
          url: String,
        },
      ],
    },
  ],
});

const Question = mongoose.model('Question', QuestionsSchema);

module.exports = {
  Question,
};