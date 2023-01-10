import { fakeProduct } from '../products/product.controller.test-mock';

export const fakeOrder = {
  id: 1,
  customer: '1',
  products: [fakeProduct],
  value: 10,
  trackingCode: '123',
  createdAt: '2021/12/15',
};