import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { UserService } from 'src/application/services/user.service';
import { UserDto } from '../dtos/user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() userDto: UserDto) {
    return await this.userService.create(userDto);
  }

  @Get()
  async findAll() {
    return await this.userService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.userService.findById(id);
  }

  @Put(':id')
  async updateById(@Param('id') id: string, @Body() userDto: any) {
    return await this.userService.updateById(id, userDto);
  }

  @Delete(':id')
  async deleteById(@Param('id') id: string) {
    return await this.userService.deleteById(id);
  }
}
