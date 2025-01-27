import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../app.module'; // Importă modulul principal

describe('AuthController (integration)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule], // Modulul principal al aplicației tale
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('should successfully sign up a user', async () => {
    const newUser = {
      username: 'j_doe',
      email: 'j.doe@example.com',
      password: 'password123',
    };

    return request(app.getHttpServer())
      .post('/auth/signup') // Endpoint-ul tău API
      .send(newUser)
      .expect(201) // Așteptăm statusul 201 pentru succes
      .then((response) => {
        expect(response.body).toHaveProperty('token'); // Verificăm că răspunsul conține un token
        expect(response.body).toHaveProperty('username', newUser.username); // Verificăm că username-ul este corect
      });
  });

  it('should successfully sign in a user', async () => {
    const credentials = {
      email: 'john.doe@example.com', // Folosește același email ca la înregistrare
      password: 'password123',
    };
  
    return request(app.getHttpServer())
      .post('/auth/signin') // Endpoint-ul tău API
      .send(credentials)
      .expect(201) // Așteptăm statusul 200 pentru succes
      .then((response) => {
        expect(response.body).toHaveProperty('token'); // Verificăm că răspunsul conține un token
        expect(response.body).toHaveProperty('username', 'john_doe'); // Verificăm că username-ul este corect
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
