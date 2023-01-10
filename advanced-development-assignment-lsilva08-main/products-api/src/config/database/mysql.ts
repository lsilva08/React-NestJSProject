import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { OrderItem } from 'src/orders/item/order-item.entity';
import { User } from '../../users/user.entity';
import { Order } from '../../orders/order.entity';
import { Product } from '../../products/product.entity';

@Injectable()
export class MysqlConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) { }

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: `mysql`,
      host: this.configService.get<string>('database.host'),
      username: this.configService.get<string>('database.username'),
      password: this.configService.get<string>('database.password'),
      database: this.configService.get<string>('database.name'),
      port: this.configService.get<number>('database.port'),
      entities: [Product, Order, OrderItem, User],
      synchronize: true,
      logging: true,
    };
  }
}
