import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from './product.controller';
import { Product } from './product.entity';
import { ProductService } from './product.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { fakeProduct } from './product.controller.test-mock';
import { Repository } from 'typeorm';

describe('ProductController', () => {
  let app: TestingModule;
  let repo: Repository<Product>;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [ProductController],
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
    repo = app.get<Repository<Product>>(getRepositoryToken(Product));
  });

  describe('findAll', () => {
    it('should return the entire array', async () => {
      const appController = app.get<ProductController>(ProductController);
      const response = await appController.findAll();
      expect(response).toStrictEqual([fakeProduct]);
    });
    it('should return throw the error of repository', async () => {
      const appController = app.get<ProductController>(ProductController);
      const errorMessage = 'errormessage';
      repo.find = jest
        .fn()
        .mockReturnValue(Promise.reject(new Error(errorMessage)));
      expect(appController.findAll()).rejects.toThrow(errorMessage);
    });
  });

  describe('findOne', () => {
    it('should return the correct product', async () => {
      const appController = app.get<ProductController>(ProductController);
      const response = await appController.findOne('1');
      expect(response).toStrictEqual(fakeProduct);
    });
    it('should return throw the error of repository', async () => {
      const appController = app.get<ProductController>(ProductController);
      const errorMessage = 'errormessage';
      repo.findOne = jest
        .fn()
        .mockReturnValue(Promise.reject(new Error(errorMessage)));
      expect(appController.findOne('1')).rejects.toThrow(errorMessage);
    });
  });

  describe('create', () => {
    it('should create the product correctly', async () => {
      const appController = app.get<ProductController>(ProductController);
      const response = await appController.create(fakeProduct);
      expect(response).toStrictEqual(fakeProduct);
    });
    it('should throw error during product creation', async () => {
      const appController = app.get<ProductController>(ProductController);
      const errorMessage = 'errormessage';
      repo.save = jest
        .fn()
        .mockReturnValue(Promise.reject(new Error(errorMessage)));
      expect(appController.create(fakeProduct)).rejects.toThrow(errorMessage);
    });
  });

  describe('remove', () => {
    it('should remove the product sucessfully', async () => {
      const appController = app.get<ProductController>(ProductController);
      const response = await appController.remove('1');
      expect(response).toStrictEqual(undefined);
    });
    it('should throw error during product remove', async () => {
      const appController = app.get<ProductController>(ProductController);
      const errorMessage = 'errormessage';
      repo.delete = jest
        .fn()
        .mockReturnValue(Promise.reject(new Error(errorMessage)));
      expect(appController.remove('1')).rejects.toThrow(errorMessage);
    });
  });
});
