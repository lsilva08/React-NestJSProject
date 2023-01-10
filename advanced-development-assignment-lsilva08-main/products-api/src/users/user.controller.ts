import {
  Body,
  Controller,
  Get,
  Param,
  Post,
} from '@nestjs/common';
import { UserDto } from './dto';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('/users')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  create(@Body() user: UserDto): Promise<User> {
    return this.userService.create(user);
  }

  @Get('/:id')
  findOne(@Param() id: string): Promise<User> {
    return this.userService.findOne(id);
  }

}
