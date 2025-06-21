import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 10, // utilizatori virtuali
  duration: '10s', // cât timp rulează testul
};

export default function () {
  const url = 'http://localhost:3000/auth/signin';
  const payload = JSON.stringify({
    email: 'andbuz@gmail.com',
    password: 'andbuz07',
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const res = http.post(url, payload, params);

  check(res, {
    'status este 201 sau 200': (r) => r.status === 200 || r.status === 201,
    'conține token': (r) => r.json('token') !== undefined,
  });

  sleep(1); // simulează timp de așteptare între cereri
}