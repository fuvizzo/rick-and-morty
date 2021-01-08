/* eslint-disable @typescript-eslint/no-explicit-any */

import request from 'supertest';
import IoCcontainer from '../../config/dependencies';
import app from '..';

import { ITestIDatabaseService } from '../../frameworks/persistence/mongo-db/in-memory/database-service';
import { IAccount, IBasicInfo, RoleType } from '../../contracts/entities';
import { IAccountRepository, IAuthTokenRepository } from '../../contracts/repositories';

jest.mock('../../config/dependencies');

const {
  databaseService,
  accountRepository,
  authTokenRepository,
}: {
  databaseService: ITestIDatabaseService,
  accountRepository: IAccountRepository<string>,
  authTokenRepository:IAuthTokenRepository
} = IoCcontainer.cradle;

const basicInfo: IBasicInfo = {
  firstName: 'foo',
  lastName: 'boo',
};
const accountInfo: IAccount = {
  email: 'foo@foo.foo',
  password: 'password',
};
const buildRequestForTestUser = (
  resource:string,
  data: Object,
) => request(app).post(`/${resource}`)
  .set('Content-type', 'application/x-www-form-urlencoded')
  .send(data);

describe('Auth APIs - integration tests', () => {
  beforeAll(async () => {
    await databaseService.initDatabase();
  });

  afterEach(async () => {
    await databaseService.clearDatabase();
  });

  afterAll(async () => {
    await databaseService.closeConnection();
  });

  describe('"sign-up" endpoint', () => {
    it('succesfully returns a 201 response', async () => {
      const res = <any> await buildRequestForTestUser('sign-up',
        {
          ...basicInfo,
          ...accountInfo,
        });

      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty('accessToken');
      expect(res.body).toHaveProperty('refreshToken');
    });

    it('returns a 400 response due some missing body params', async () => {
      const res = <any> await buildRequestForTestUser('sign-up', { ...accountInfo });
      expect(res.statusCode).toEqual(400);
    });

    it('returns a 400 response due some wrong body params', async () => {
      const res = <any> await buildRequestForTestUser('sign-up', {
        ...{
          firstName: '123',
          lastName: 'boo  foo',
        },
        ...accountInfo,
      });
      expect(res.statusCode).toEqual(400);
    });

    it('returns a 400 response due some wrong mail', async () => {
      const res = <any> await buildRequestForTestUser('sign-up', {
        ...{
          email: 'foo#foo.boo',
          password: 'password',
        },
        ...basicInfo,
      });
      expect(res.statusCode).toEqual(400);
    });

    it('returns a 409 response due email already in use', async () => {
      await accountRepository.create(
        accountInfo,
        basicInfo,
      );
      const res = <any> await buildRequestForTestUser('sign-up', {
        ...accountInfo,
        ...basicInfo,
      });
      expect(res.statusCode).toEqual(409);
    });
  });

  describe('"token" endpoint', () => {
    it('succesfully returns a 200 response', async () => {
      const token = await authTokenRepository.refreshToken.create({
        userId: 'abc123',
        userName: accountInfo.email,
        roles: [RoleType.Customer],
      });
      const res = <any> await buildRequestForTestUser('token', {
        token,
      });
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('accessToken');
    });

    it('returns a 401 response', async () => {
      const res = <any> await buildRequestForTestUser('token', {});
      expect(res.statusCode).toEqual(401);
    });

    it('returns a 403 response', async () => {
      const res = <any> await buildRequestForTestUser('token', {
        token: 'foo',
      });
      expect(res.statusCode).toEqual(403);
    });
  });

  describe('"sign-out" endpoint', () => {
    it('succesfully returns a 204 response', async () => {
      const refreshToken = await authTokenRepository.refreshToken.create({
        userId: 'abc123',
        userName: accountInfo.email,
        roles: [RoleType.Customer],
      });

      const res = <any> await request(app).post('/sign-out')
        .set('Authorization', `Bearer ${refreshToken}`);
      expect(res.statusCode).toEqual(204);
    });

    it('returns a 401 when a wrong refresh token is provided', async () => {
      const res = <any> await request(app).post('/sign-out')
        .set('Authorization', 'Bearer foo');
      expect(res.statusCode).toEqual(401);
    });

    it('returns returns a 401 response when auth header is missing', async () => {
      const res = <any> await request(app).post('/sign-out');
      expect(res.statusCode).toEqual(401);
    });
  });

  describe('"sign-in" endpoint', () => {
    it('succesfully returns a 200 response', async () => {
      await accountRepository.create(
        accountInfo,
        basicInfo,
      );

      const res = <any> await buildRequestForTestUser('sign-in', { ...accountInfo });

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('accessToken');
      expect(res.body).toHaveProperty('refreshToken');
    });

    it('returns a 401 response due some wrong body params', async () => {
      await accountRepository.create(
        accountInfo,
        basicInfo,
      );

      const res = <any> await buildRequestForTestUser('sign-in', {
        email: 'foo@foo.boo',
        password: 'password',
      });

      expect(res.statusCode).toEqual(401);
    });

    it('returns a 400 response due some wrong body params', async () => {
      const res = <any> await buildRequestForTestUser('sign-in', {
        email: 'foo#foo.boo',
        password: 'password',
      });
      expect(res.statusCode).toEqual(400);
    });
  });
});
