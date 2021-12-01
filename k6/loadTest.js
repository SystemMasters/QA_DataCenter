import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  vus: 200,
  duration: '10s',

  thresholds: {
    'http_req_duration': ['p(95)<500'], // 95% of requests must complete below 0.5s
  },
};


export default () => {
  const BASE_URL = 'http://localhost:8080';

  http.get(`${BASE_URL}/qa/questions/270619/1/5`);
  // http.get(`${BASE_URL}/qa/questions/488672/answers`)
  // http.post(`${BASE_URL}/qa/questions`, {product_id: 270699, body: 'new question', name: 'your name', email: 'your email'}, {tags: {name: "postQuestion"} })

  sleep(1);
}


