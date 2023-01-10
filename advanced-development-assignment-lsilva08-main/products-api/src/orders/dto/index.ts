import { Product } from '../../products/product.entity';

export type OrderCreateDto = {
  customer: string;
  products: [{ id: number; quantity: number }];
};

export type OrderDto = {
  id?: number;
  customer: string;
  products: Product[];
  value: number;
  trackingCode: string;
};

export type Tracking = {
  address: string;
  latitude: number;
  longitude: number[];
};
