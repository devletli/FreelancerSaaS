import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect(({ body }) => {
        expect(body.status).toBe('ok');
        expect(body.service).toBe('freelancer-marketplace-api');
      });
  });

  it('/jobs (GET)', () => {
    return request(app.getHttpServer())
      .get('/jobs')
      .expect(200)
      .expect(({ body }) => {
        expect(Array.isArray(body)).toBe(true);
        expect(body.length).toBeGreaterThan(0);
        expect(body[0]).toHaveProperty('client');
      });
  });

  it('/proposals (POST)', () => {
    return request(app.getHttpServer())
      .post('/proposals')
      .send({
        jobId: 'job-1',
        freelancerId: 'user-freelancer-1',
        price: 6100,
        deliveryDays: 20,
        coverLetter:
          'I can own the architecture, implementation and release hardening for this SaaS refactor.',
      })
      .expect(201)
      .expect(({ body }) => {
        expect(body.jobId).toBe('job-1');
        expect(body).toHaveProperty('freelancer');
      });
  });
});
