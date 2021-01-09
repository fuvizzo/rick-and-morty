/* eslint-disable @typescript-eslint/no-explicit-any */

import request from 'supertest';
import jwt from 'jsonwebtoken';
import { object } from 'joi';
import IoCcontainer from '../../config/dependencies';
import app from '..';
import {
  ICharacterList,
  ICharacter,
  IUserPreferences,
} from '../../contracts/entities';

import { ITestIDatabaseService } from '../../frameworks/persistence/mongo-db/in-memory/database-service';
import { IUserPreferencesRepository } from '../../contracts/repositories';

jest.mock('../../config/dependencies');

const { databaseService, userPreferencesRepository }: {
  databaseService: ITestIDatabaseService,
  userPreferencesRepository: IUserPreferencesRepository
} = IoCcontainer.cradle;

const testUserId1 = '5fe9affebc16b94e2109731b';
const testUserId2 = '5fea2a8a2a98706d9ca9e21b';

const testUserPreferences: IUserPreferences = {
  userId: testUserId1,
  favoriteCharacterIds: [1, 12, 34, 67],
};

const accessToken = jwt.sign(
  {
    userId: testUserId1,
    username: 'customer@foo.foo',
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

  describe('"characters/favorite" endpoint - put', () => {
    const buildUpdateRequest = (
      testUserId: string,
      accessToken: string | null,
    ) => request(app).put(`/characters/favorites/${testUserId}`)
      .set('Content-type', 'application/json')
      .set('Authorization', accessToken ? `Bearer ${accessToken}` : '');

    describe('Marks as favorite the Character with id = 23', () => {
      it('succesfully returns a 204 response', async () => {
        await userPreferencesRepository.update(
          testUserPreferences,
        );
        const res = <any> await buildUpdateRequest(testUserId1, accessToken)
          .send({
            characterId: 23,
          });

        expect(res.statusCode).toEqual(204);

        const updatedUser = await userPreferencesRepository.get(testUserId1);

        expect(updatedUser!.favoriteCharacterIds.length).toEqual(5);
        expect(updatedUser!.favoriteCharacterIds.indexOf(23)).not.toEqual(-1);
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
        const res = <any> await buildUpdateRequest(testUserId2, accessToken);
        expect(res.statusCode).toEqual(403);
      });

      /*  it('returns a 400 response due some missing body params', async () => {
        expect({}).toEqual(400);
      }); */
    });

    describe('Marks as unfavorite the Character with id = 12', () => {
      it('succesfully returns a 204 response', async () => {
        await userPreferencesRepository.update(
          testUserPreferences,
        );
        const res = <any> await buildUpdateRequest(testUserId1, accessToken)
          .send({
            characterId: 12,
          });

        expect(res.statusCode).toEqual(204);

        const updatedUser = await userPreferencesRepository.get(testUserId1);

        expect(updatedUser!.favoriteCharacterIds.length).toEqual(3);
        expect(updatedUser!.favoriteCharacterIds.indexOf(12)).toEqual(-1);
      });
    });
  });

  describe('"characters" endpoint - get', () => {
    const buildGetRequest = (
      accessToken: string | null,
    ) => request(app).get('/characters')
      .set('Authorization', accessToken ? `Bearer ${accessToken}` : '');

    describe('Allows an auth user to get the list of Characters', () => {
      describe('return the first 20 characters with favorite flag set according the User preferences', () => {
        it('succesfully returns a 200 response ', async () => {
          await userPreferencesRepository.update(
            testUserPreferences,
          );

          const res = <any> await buildGetRequest(accessToken);
          expect(res.statusCode).toEqual(200);

          Object.keys(res.body.results).forEach((key:string) => {
            const element:ICharacter = res.body.results[key];
            expect(element.favorite).toEqual(
              testUserPreferences.favoriteCharacterIds.includes(element.id),
            );
          });
        });
      });
    });

    describe('return the 20 characters of page 2 with favorite flag set according the User preferences', () => {
      it('succesfully returns a 200 response ', async () => {
        await userPreferencesRepository.update(
          testUserPreferences,
        );

        const res = <any> await buildGetRequest(accessToken)
          .query({
            page: 2,
          });
        expect(res.statusCode).toEqual(200);
        expect(Number(Object.keys(res.body.results)[0])).toEqual(21);
        Object.keys(res.body.results).forEach((key:string) => {
          const element:ICharacter = res.body.results[key];
          expect(element.favorite).toEqual(
            testUserPreferences.favoriteCharacterIds.includes(element.id),
          );
        });
      });
    });
  });
});
