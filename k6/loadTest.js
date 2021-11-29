import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  // stages: [
  //   { duration: '15s', target: 100 }, // simulate ramp-up of traffic from 1 to 100 users over 5 minutes.
  //   { duration: '10m', target: 100 }, // stay at 100 users for 10 minutes
  //   { duration: '5m', target: 0 }, // ramp-down to 0 users
  // ],
  vus: 100,
  duration: '10s',

  thresholds: {
    'http_req_duration': ['p(95)<1500'], // 99% of requests must complete below 1.5s
  },
};

const BASE_URL = 'http://localhost:8080';

export default () => {
  http.get(`${BASE_URL}/qa/questions/270619/1/5`);
  http.get(`${BASE_URL}/qa/questions/488672/answers`)
  http.post(`${BASE_URL}/qa/questions`, {product_id: 270699, body: 'new question', name: 'your name', email: 'your email'}, {tags: {name: "postQuestion"} })

  sleep(1);
}


