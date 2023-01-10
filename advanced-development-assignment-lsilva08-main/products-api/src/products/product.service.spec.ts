import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from './product.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { fakeProduct } from './product.controller.test-mock';

describe('ProductService', () => {
  let service: ProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        {
          provide: getRepositoryToken(Product),
          useValue: {
            find: jest.fn().mockReturnValue(Promise.resolve([fakeProduct])),
            findOne: jest.fn().mockReturnValue(Promise.resolve(fakeProduct)),
            save: jest.fn().mockReturnValue(Promise.resolve(fakeProduct)),
            delete: jest.fn().mockReturnValue(Promise.resolve()),
          },
        },
      ],
    }).compile();
    service = module.get<ProductService>(ProductService);
  });

  describe('findAll', () => {
    it('should return an array of products', async () => {
      const products = await service.findAll();
      expect(products).toEqual([fakeProduct]);
    });
  });

  describe('create', () => {
    it('should return the created product', async () => {
      const product = await service.create(fakeProduct);
      expect(product).toEqual(fakeProduct);
    });
  });

  describe('findOne', () => {
    it('should return the searched product', async () => {
      const product = await service.findOne('1');
      expect(product).toEqual(fakeProduct);
    });
  });

  describe('remove', () => {
    it('should return undefined', async () => {
      const products = await service.remove('1');
      expect(products).toEqual(undefined);
    });
  });
});
