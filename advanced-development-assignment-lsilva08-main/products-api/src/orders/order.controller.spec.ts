import { Test, TestingModule } from '@nestjs/testing';
import { OrderController } from './order.controller';
import { Order } from './order.entity';
import { OrderService } from './order.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { fakeOrder } from './order.controller.test-mock';
import { Repository } from 'typeorm';

describe('OrderController', () => {
  let app: TestingModule;
  let repo: Repository<Order>;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [
        OrderService,
        {
          provide: getRepositoryToken(Order),
          useValue: {
            find: jest.fn().mockReturnValue(Promise.resolve([fakeOrder])),
            findOne: jest.fn().mockReturnValue(Promise.resolve(fakeOrder)),
            save: jest.fn().mockReturnValue(Promise.resolve(fakeOrder)),
            delete: jest.fn().mockReturnValue(Promise.resolve()),
          },
        },
      ],
    }).compile();
    repo = app.get<Repository<Order>>(getRepositoryToken(Order));
  });

  describe('findAll', () => {
    it('should return the entire array', async () => {
      const appController = app.get<OrderController>(OrderController);
      const response = await appController.findAll();
      expect(response).toStrictEqual([fakeOrder]);
    });
    it('should return throw the error of repository', async () => {
      const appController = app.get<OrderController>(OrderController);
      const errorMessage = 'errormessage';
      repo.find = jest
        .fn()
        .mockReturnValue(Promise.reject(new Error(errorMessage)));
      expect(appController.findAll()).rejects.toThrow(errorMessage);
    });
  });

  describe('findOne', () => {
    it('should return the correct order', async () => {
      const appController = app.get<OrderController>(OrderController);
      const response = await appController.findOne('1');
      expect(response).toStrictEqual(fakeOrder);
    });
    it('should return throw the error of repository', async () => {
      const appController = app.get<OrderController>(OrderController);
      const errorMessage = 'errormessage';
      repo.findOne = jest
        .fn()
        .mockReturnValue(Promise.reject(new Error(errorMessage)));
      expect(appController.findOne('1')).rejects.toThrow(errorMessage);
    });
  });

  describe('create', () => {
    it('should create the order correctly', async () => {
      const appController = app.get<OrderController>(OrderController);
      const response = await appController.create(fakeOrder);
      expect(response).toStrictEqual(fakeOrder);
    });
    it('should throw error during order creation', async () => {
      const appController = app.get<OrderController>(OrderController);
      const errorMessage = 'errormessage';
      repo.save = jest
        .fn()
        .mockReturnValue(Promise.reject(new Error(errorMessage)));
      expect(appController.create(fakeOrder)).rejects.toThrow(errorMessage);
    });
  });

  describe('remove', () => {
    it('should remove the order sucessfully', async () => {
      const appController = app.get<OrderController>(OrderController);
      const response = await appController.remove('1');
      expect(response).toStrictEqual(undefined);
    });
    it('should throw error during order remove', async () => {
      const appController = app.get<OrderController>(OrderController);
      const errorMessage = 'errormessage';
      repo.delete = jest
        .fn()
        .mockReturnValue(Promise.reject(new Error(errorMessage)));
      expect(appController.remove('1')).rejects.toThrow(errorMessage);
    });
  });
});
