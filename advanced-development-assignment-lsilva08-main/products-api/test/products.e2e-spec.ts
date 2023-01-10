import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { ProductService } from '../src/products/product.service';
import { fakeProduct } from '../src/products/product.controller.test-mock';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(ProductService)
      .useValue({
        findAll: jest.fn().mockReturnValue(Promise.resolve([fakeProduct])),
        findOne: jest.fn().mockReturnValue(Promise.resolve(fakeProduct)),
        create: jest.fn().mockReturnValue(Promise.resolve(fakeProduct)),
        remove: jest.fn().mockReturnValue(Promise.resolve(undefined)),
      })
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/products (GET)', async () => {
    return request(app.getHttpServer())
      .get('/products')
      .expect(200)
      .expect([fakeProduct]);
  });

  it('/products (POST)', async () => {
    return request(app.getHttpServer())
      .post('/products')
      .send(fakeProduct)
      .expect(201)
      .expect(fakeProduct);
  });

  it('/products/:id (GET)', async () => {
    return request(app.getHttpServer())
      .get('/products/1')
      .expect(200)
      .expect(fakeProduct);
  });

  it('/products/:id (DELETE)', async () => {
    return request(app.getHttpServer())
      .delete('/products/1')
      .expect(200)
      .expect('');
  });
});
