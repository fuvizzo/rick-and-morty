/* eslint-disable @typescript-eslint/no-explicit-any */

import request from 'supertest';
import jwt from 'jsonwebtoken';
import IoCcontainer from '../../config/dependencies';
import app from '..';
import {
  IUserInfo, RoleType,
} from '../../contracts/entities';

import { ITestIDatabaseService } from '../../frameworks/persistence/mongo-db/in-memory/database-service';
import IUserRepository from '../../contracts/repositories';

jest.mock('../../config/dependencies');

const { databaseService, userRepository }: {
  databaseService: ITestIDatabaseService,
  userRepository: IUserRepository<string>
} = IoCcontainer.cradle;

const testUserId1 = '5fe9affebc16b94e2109731b';
const testUserId2 = '5fea2a8a2a98706d9ca9e21b';
const adminUserId = '5fea413ec146be6267199023';

const testUserInfo: IUserInfo = {
  address: {
    street: 'Calle Arago',
    streetNumber: '125',
    city: 'Barcelona',
    country: 'Spain',
    zipCode: '08020',
  },
  phoneNumber: '+34558554554',
};

const adminAccessToken = jwt.sign(
  {
    userId: adminUserId,
    username: 'admin@foo.foo',
    roles: [RoleType.Admin],
  },
  process.env.ACCESS_TOKEN_SECRET as string,
);

const customerAccessToken = jwt.sign(
  {
    userId: testUserId1,
    username: 'customer@foo.foo',
    roles: [RoleType.Customer],
  },
  process.env.ACCESS_TOKEN_SECRET as string,
);

describe('User APIs - integration tests', () => {
  beforeAll(async () => {
    await databaseService.initDatabase();
  });

  afterEach(async () => {
    await databaseService.clearDatabase();
  });

  afterAll(async () => {
    await databaseService.closeConnection();
  });

  describe('"users" endpoint - put', () => {
    const buildUpdateRequest = (
      testUserId: string,
      accessToken: string | null,
    ) => request(app).put(`/users/${testUserId}`)
      .set('Content-type', 'application/json')
      .set('Authorization', accessToken ? `Bearer ${accessToken}` : '')
      .send({
        address: {
          street: 'Calle Marina',
          streetNumber: '125',
          city: 'Barcelona',
          country: 'Spain',
          zipCode: '08013',
        },
        phoneNumber: '+34558668554',
      });

    describe('(Allows an User to edit his/her own data)', () => {
      it('succesfully returns a 204 response', async () => {
        await userRepository.update(
          testUserId1,
          testUserInfo,
        );
        const res = <any> await buildUpdateRequest(testUserId1, customerAccessToken);

        expect(res.statusCode).toEqual(204);

        const updatedUser = await userRepository.getById(testUserId1);

        expect(updatedUser!.phoneNumber).toEqual('+34558668554');
      });

      it('returns a 401 response due to auth header missing', async () => {
        const res = <any> await buildUpdateRequest(testUserId1, null);
        expect(res.statusCode).toEqual(401);
      });

      it('returns a 403 response due to auth header missing', async () => {
        const res = <any> await buildUpdateRequest(testUserId1, 'foo');
        expect(res.statusCode).toEqual(403);
      });

      it('returns a 403 response because User attempts to update someone else data', async () => {
        const res = <any> await buildUpdateRequest(testUserId2, customerAccessToken);
        expect(res.statusCode).toEqual(403);
      });

      /*  it('returns a 400 response due some missing body params', async () => {
        expect({}).toEqual(400);
      }); */
    });

    describe('(Allows an Admin to edit some User data)', () => {
      it('succesfully returns a 204 response', async () => {
        await userRepository.update(
          testUserId1,
          testUserInfo,
        );
        const res = <any> await buildUpdateRequest(testUserId1, adminAccessToken);

        expect(res.statusCode).toEqual(204);

        const updatedUser = await userRepository.getById(testUserId1);

        expect(updatedUser!.phoneNumber).toEqual('+34558668554');
      });
    });
  });

  describe('"users" endpoint - delete', () => {
    const buildDeleteRequest = (
      testUserId: string,
      accessToken: string | null,
    ) => request(app).delete(`/users/${testUserId}`)
      .set('Authorization', accessToken ? `Bearer ${accessToken}` : '');

    describe('(Allows an User to delete his/her own data)', () => {
      it('succesfully returns a 204 response', async () => {
        await userRepository.update(
          testUserId1,
          testUserInfo,
        );

        const res = <any> await buildDeleteRequest(testUserId1, customerAccessToken);

        expect(res.statusCode).toEqual(204);
      });

      it('returns a 401 response due to auth header missing', async () => {
        const res = <any> await buildDeleteRequest(testUserId1, null);
        expect(res.statusCode).toEqual(401);
      });

      it('returns a 403 response due to auth header missing', async () => {
        const res = <any> await buildDeleteRequest(testUserId1, 'foo');
        expect(res.statusCode).toEqual(403);
      });

      it('returns a 403 response because User attempts to delete someone else data', async () => {
        const res = <any> await buildDeleteRequest(testUserId2, customerAccessToken);
        expect(res.statusCode).toEqual(403);
      });
    });
    describe('(Allows an Admin to delete some User data)', () => {
      it('succesfully returns a 204 response', async () => {
        await userRepository.update(
          testUserId1,
          testUserInfo,
        );
        const res = <any> await buildDeleteRequest(testUserId1, adminAccessToken);

        expect(res.statusCode).toEqual(204);
      });
    });
  });

  describe('"users" endpoint - get', () => {
    const buildGetRequest = (
      accessToken: string | null,
    ) => request(app).get('/users')
      .set('Authorization', accessToken ? `Bearer ${accessToken}` : '');
    describe('(Allows an Admin to get the list of Users)', () => {
      it('succesfully returns a 200 response', async () => {
        await userRepository.update(
          testUserId1,
          testUserInfo,
        );

        const res = <any> await buildGetRequest(adminAccessToken);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(expect.any(Array));
      });

      it('returns a 403 response', async () => {
        const res = <any> await buildGetRequest(customerAccessToken);
        expect(res.statusCode).toEqual(403);
      });
    });
  });
});
