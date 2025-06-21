import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 10,         // 10 utilizatori virtuali
  duration: '10s', // timp total de test
};

export default function () {
  const url = 'http://localhost:3000/chat/ask';
  const payload = JSON.stringify({
    question: 'Ce este MongoDB?',
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const res = http.post(url, payload, params);
console.log('Status primit:', res.status);
console.log('Body:', res.body);

  check(res, {
    'status este 200': (r) => r.status === 200,
    'conține răspuns': (r) => r.json('answer') !== undefined,
  });

  sleep(1); // așteaptă între cereri
}
