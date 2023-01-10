import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Headers } from '@nestjs/common';
import { OrderCreateDto, OrderDto, Tracking } from './dto';
import { Order } from './order.entity';
import { OrderService } from './order.service';

@Controller('/orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) { }

  @Get()
  findAll(@Headers() headers): Promise<Order[]> {
    console.log('headers', headers)
    return this.orderService.findAll(headers['authorization']);
  }

  @Post()
  create(@Body() order: OrderCreateDto): Promise<Order> {
    return this.orderService.create(order);
  }

  @Get('/:id')
  findOne(@Param() id: string, @Headers() headers): Promise<Order> {
    console.log('headers', headers)
    return this.orderService.findOne(id, headers['authorization']);
  }

  @Put('/:id')
  update(@Param('id') id: string, @Body() order: OrderDto): Promise<Order> {
    return this.orderService.update(Number(id), order);
  }

  @Delete('/:id')
  remove(@Param('id') id: string): Promise<void> {
    return this.orderService.remove(id);
  }

  @Get('/:id/tracking')
  orderTracking(@Param('id') id: string): Promise<any> {
    return this.orderService.orderTracking(id);
  }

  @Post('/:id/tracking')
  upsertOrderTracking(
    @Param('id') id: string,
    @Body() tracking: Tracking,
  ): Promise<any> {
    return this.orderService.upsertOrderTracking(id, tracking);
  }
}
