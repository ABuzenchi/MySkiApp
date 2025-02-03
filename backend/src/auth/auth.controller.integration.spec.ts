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
    await app.listen(3003);
  });

   it('signup should work', () => {
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

  
  it('signin should work', async () => {
   
    const timestamp = Date.now();
    const testUser = {
      username: `testuser${timestamp}`,
      email: `test${timestamp}@test.com`,
      password: '12345'
    };

    
    await request(app.getHttpServer())
      .post('/auth/signup')
      .send(testUser);


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