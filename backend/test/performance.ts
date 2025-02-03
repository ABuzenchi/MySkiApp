import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 10,
  duration: '30s',
  thresholds: {
    http_req_duration: ['p(95)<500'],
    http_req_failed: ['rate<0.1'],
  },
};

function generateUniqueCredentials() {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 10000);
  return {
    username: `testuser_${timestamp}_${random}`,
    email: `test_${timestamp}_${random}@example.com`,
    password: 'password123',
  };
}

export default function () {
  const baseUrl = 'http://localhost:3000';

  const testUser = generateUniqueCredentials();

  const healthCheck = http.get(baseUrl);
  check(healthCheck, {
    'server is up': (r) => r.status !== 0,
  });

  if (healthCheck.status !== 0) {
    const signupRes = http.post(
      `${baseUrl}/auth/signup`,
      JSON.stringify(testUser),
      {
        headers: { 'Content-Type': 'application/json' },
        timeout: '10s',
      },
    );

    check(signupRes, {
      'signup request successful': (r) => r.status !== 0,
      'signup status is 201': (r) => r.status === 201 || r.status === 200,
      'signup response has body': (r) =>
        typeof r.body === 'string' && r.body.length > 0,
      'signup response can be parsed': (r) => {
        if (typeof r.body === 'string') {
          try {
            return JSON.parse(r.body) !== null;
          } catch (e) {
            return false;
          }
        }
        return false;
      },
    });

    if (signupRes.status === 201 || signupRes.status === 200) {
      sleep(1);

      const signinRes = http.post(
        `${baseUrl}/auth/signin`,
        JSON.stringify({
          email: testUser.email,
          password: testUser.password,
        }),
        {
          headers: { 'Content-Type': 'application/json' },
          timeout: '10s',
        },
      );

      check(signinRes, {
        'signin request successful': (r) => r.status !== 0,
        'signin status is 201': (r) => r.status === 201 || r.status === 200,
        'signin response has body': (r) =>
          typeof r.body === 'string' && r.body.length > 0,
        'signin response can be parsed': (r) => {
          if (typeof r.body === 'string') {
            try {
              return JSON.parse(r.body) !== null;
            } catch (e) {
              return false;
            }
          }
          return false;
        },
      });
    }
  }

  sleep(1);
}
