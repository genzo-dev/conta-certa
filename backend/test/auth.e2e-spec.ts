import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from 'src/app/app.module';

describe('Auth (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('login - should not authenticate with invalid credentials', async () => {
    const loginDto = {
      email: 'email@invalido.com',
      password: 'wrongpassword',
    };

    await request
      .default(app.getHttpServer())
      .post('/auth')
      .send(loginDto)
      .expect(401);
  });

  it('login - should not authenticate with unregistered email', async () => {
    const createUserDto = {
      userName: 'namevalid',
      email: `user_${Date.now()}@test.com`,
      password: 'validpassword',
    };

    const loginUnregisteredEmailDto = {
      email: 'unregistered@example.com',
      password: 'validpassword',
    };

    await request
      .default(app.getHttpServer())
      .post('/user')
      .send(createUserDto)
      .expect(201);

    await request
      .default(app.getHttpServer())
      .post('/auth')
      .send(loginUnregisteredEmailDto)
      .expect(401);
  });

  it('login - should not authenticate with wrong password', async () => {
    const createUserDto = {
      userName: 'namevalid',
      email: `user_${Date.now()}@test.com`,
      password: 'validpassword',
    };

    const loginWrongPasswordDto = {
      email: createUserDto.email,
      password: 'wrongpassword',
    };

    await request
      .default(app.getHttpServer())
      .post('/user')
      .send(createUserDto)
      .expect(201);

    await request
      .default(app.getHttpServer())
      .post('/auth')
      .send(loginWrongPasswordDto)
      .expect(401);
  });

  it('login - should authenticate with valid credentials', async () => {
    const createUserDto = {
      userName: 'namevalid',
      email: `user_${Date.now()}@test.com`,
      password: 'validpassword',
    };

    const loginDto = {
      email: createUserDto.email,
      password: 'validpassword',
    };
    await request
      .default(app.getHttpServer())
      .post('/user')
      .send(createUserDto)
      .expect(201);

    const response = await request
      .default(app.getHttpServer())
      .post('/auth')
      .send(loginDto)
      .expect(200);

    expect(response.body).toHaveProperty('accessToken');
    expect(typeof response.body.accessToken).toBe('string');
    expect(response.body).toHaveProperty('refreshToken');
    expect(typeof response.body.refreshToken).toBe('string');
  });

  it('refreshTokens - should refresh tokens with valid refresh token', async () => {
    const createUserDto = {
      userName: 'namevalid',
      email: `user_${Date.now()}@test.com`,
      password: 'validpassword',
    };

    const loginDto = {
      email: createUserDto.email,
      password: 'validpassword',
    };

    await request
      .default(app.getHttpServer())
      .post('/user')
      .send(createUserDto)
      .expect(201);

    const loginResponse = await request
      .default(app.getHttpServer())
      .post('/auth')
      .send(loginDto)
      .expect(200);

    const refreshToken = loginResponse.body.refreshToken;

    const refreshResponse = await request
      .default(app.getHttpServer())
      .post('/auth/refresh')
      .send({ refreshToken })
      .expect(200);

    expect(refreshResponse.body).toHaveProperty('accessToken');
    expect(typeof refreshResponse.body.accessToken).toBe('string');
    expect(refreshResponse.body).toHaveProperty('refreshToken');
    expect(typeof refreshResponse.body.refreshToken).toBe('string');
  });
});
