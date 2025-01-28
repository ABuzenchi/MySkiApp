import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../app.module';
import * as request from 'supertest';

describe('Auth Endpoints', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    // Specificăm alt port pentru teste
    await app.listen(3003);
  });

  // Test simplu pentru signup
  it('signup should work', () => {
    // Folosim timestamp pentru a avea username unic
    const timestamp = Date.now();
    return request(app.getHttpServer())
      .post('/auth/signup')
      .send({
        username: `testuser${timestamp}`,
        email: `test${timestamp}@test.com`,
        password: '12345'
      })
      .expect(201);
  });

  // Test simplu pentru signin - trebuie să creăm userul întâi
  it('signin should work', async () => {
    // Creem un user nou pentru test
    const timestamp = Date.now();
    const testUser = {
      username: `testuser${timestamp}`,
      email: `test${timestamp}@test.com`,
      password: '12345'
    };

    // Întâi înregistrăm userul
    await request(app.getHttpServer())
      .post('/auth/signup')
      .send(testUser);

    // Apoi încercăm să ne logăm
    return request(app.getHttpServer())
      .post('/auth/signin')
      .send({
        email: testUser.email,
        password: testUser.password
      })
      .expect(201);
  });

  afterAll(async () => {
    await app.close();
  });
});