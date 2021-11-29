import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  stages: [
    { duration: '2s', target: 100 }, // below norsal load
    { duration: '5s', target: 100 },
    { duration: '2s', target: 200 }, // norsal load
    { duration: '5s', target: 200 },
    { duration: '2s', target: 300 }, // around the breaking point
    { duration: '5s', target: 300 },
    { duration: '2s', target: 400 }, // beyond the breaking point
    { duration: '5s', target: 400 },
    { duration: '10s', target: 0 }, // scale down. Recovery stage.
  ],
};

export default function () {
  const BASE_URL = 'http://localhost/8080'; // make sure this is not production

  const responses = http.batch([
    ['GET', `${BASE_URL}/public/crocodiles/1/`, null, { tags: { name: 'PublicCrocs' } }],
    ['GET', `${BASE_URL}/public/crocodiles/2/`, null, { tags: { name: 'PublicCrocs' } }],
    ['GET', `${BASE_URL}/public/crocodiles/3/`, null, { tags: { name: 'PublicCrocs' } }],
    ['GET', `${BASE_URL}/public/crocodiles/4/`, null, { tags: { name: 'PublicCrocs' } }],
  ]);

  sleep(1);
}
