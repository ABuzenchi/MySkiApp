import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 10, // utilizatori virtuali
  duration: '10s', // durata totală
};

export default function () {
  const url = 'http://localhost:3000/auth/signup';
  const payload = JSON.stringify({
    username: `testuser_${__VU}_${__ITER}`, // unic per user+iter
    email: `test_${__VU}_${__ITER}@example.com`,
    password: 'securepass',
    profilePicture: 'https://example.com/avatar.jpg',
    favoriteSlopes: ['slope1', 'slope2'],
    visitedSlopes: ['slope3'],
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
    'conține username': (r) => r.json('username') !== undefined,
  });

  sleep(1); // simulează timp între cereri
}
