import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './order.entity';
import { Product } from '../products/product.entity';
import { OrderItem } from './item/order-item.entity';
import { ConfigModule } from '@nestjs/config';
import { User } from 'src/users/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order, Product, OrderItem, User])],
  controllers: [OrderController],
  providers: [OrderService, ConfigModule],
})
export class OrderModule { }
