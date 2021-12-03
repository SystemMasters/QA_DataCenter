import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  stages: [
    { duration: '10s', target: 100 },
    { duration: '5s', target: 100 },
    { duration: '10s', target: 200 },
    { duration: '5s', target: 200 },
    { duration: '10s', target: 300 },
    { duration: '5s', target: 300 },
    { duration: '10s', target: 400 },
    { duration: '5s', target: 400 },
    { duration: '10s', target: 0 },
  ],
};

export default function () {
  const BASE_URL = 'http://localhost:8080';

  const responses = http.batch([
    ['GET', `${BASE_URL}/qa/questions/270619/1/5`, { tags: { name: 'getQuestions' } }]
    ['GET', `${BASE_URL}/qa/questions/488672/answers`, { tags: { name: 'getAnswers' } }],
    ['POST', `${BASE_URL}/qa/questions`, { tags: { name: 'postQuestion' } }],
  ]);

  sleep(1);
}
