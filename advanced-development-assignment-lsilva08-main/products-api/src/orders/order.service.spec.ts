import { Test, TestingModule } from '@nestjs/testing';
import { OrderService } from './order.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Order } from './order.entity';
import { fakeOrder } from './order.controller.test-mock';

describe('OrderService', () => {
  let service: OrderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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
    service = module.get<OrderService>(OrderService);
  });

  describe('findAll', () => {
    it('should return an array of orders', async () => {
      const orders = await service.findAll();
      expect(orders).toEqual([fakeOrder]);
    });
  });

  describe('create', () => {
    it('should return the created order', async () => {
      const order = await service.create(fakeOrder);
      expect(order).toEqual(fakeOrder);
    });
  });

  describe('findOne', () => {
    it('should return the searched order', async () => {
      const order = await service.findOne('1');
      expect(order).toEqual(fakeOrder);
    });
  });

  describe('remove', () => {
    it('should return undefined', async () => {
      const orders = await service.remove('1');
      expect(orders).toEqual(undefined);
    });
  });
});
