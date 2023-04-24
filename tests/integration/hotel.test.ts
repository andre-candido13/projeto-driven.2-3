import faker from '@faker-js/faker';
import { TicketStatus } from '@prisma/client';
import httpStatus from 'http-status';
import * as jwt from 'jsonwebtoken';
import supertest from 'supertest';
import {
  createEnrollmentWithAddress,
  createUser,
  createTicketType,
  //createTicket,
  //createPayment,
  //generateCreditCardData,
} from '../factories';
import { cleanDb, generateValidToken } from '../helpers';
import { prisma } from '@/config';
import app, { init } from '@/app';

beforeAll(async () => {
  await init();
});

beforeEach(async () => {
  await cleanDb();
});

const server = supertest(app);


describe('GET /hotels', () => {
    describe('When token is invalid or doesnt exists', () => {
      it('Should respond with status 401 if no token is given', async () => {
        const result = await server.get('/hotels');
  
        expect(result.status).toBe(httpStatus.UNAUTHORIZED);
      });
  
      it('Should respond with status 401 if given token is not valid', async () => {
        const token = 'randomWord';
        const response = await server.get('/hotels').set('Authorization', `Bearer ${token}`);
  
        expect(response.status).toBe(httpStatus.UNAUTHORIZED);
      });
  
      it('should respond with status 401 if there is no session for given token', async () => {
        const userWithoutSession = await createUser();
        const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);
  
        const response = await server.get('/hotels').set('Authorization', `Bearer ${token}`);
  
        expect(response.status).toBe(httpStatus.UNAUTHORIZED);
      });
    })
})

describe('When token is valid', () => {
    it('Should respond with status 404 if there is no enrollment for given userId', async () => {
      const user = await createUser();
      const token = await generateValidToken(user);

      const result = await server.get('/hotels').set('Authorization', `Bearer ${token}`);

      expect(result.status).toBe(httpStatus.NOT_FOUND);
    });

    it('Should respond with status 404 if user has no ticket', async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      await createEnrollmentWithAddress(user);

      const result = await server.get('/hotels').set('Authorization', `Bearer ${token}`);

      expect(result.status).toBe(httpStatus.NOT_FOUND);
    });
})
