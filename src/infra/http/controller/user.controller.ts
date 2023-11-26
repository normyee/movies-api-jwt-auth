import { Controller, Get, Param, Delete } from '@nestjs/common';
import { UserServicee } from 'src/application/services/user.service';
// import { UserDto } from 'src/infra/http/dtos/user.dto';

@Controller('product')
export class UserController {
  constructor(private readonly userService: UserServicee) {}

  @Get()
  async all() {
    return await this.userService.all();
  }

  // @Post()
  // async create(@Body() userDto: UserDto) {
  //   return await this.userService.create(userDto);
  // }

  // @Get(':id')
  // async findById(@Param('id') id: number) {
  //   return this.userService.findById(id);
  // }

  // @Put(':id')
  // async updateById(@Param('id') id: number, @Body() userDto: UserDto) {
  //   return await this.userService.updateById(id, userDto);
  // }

  @Delete(':id')
  async deleteById(@Param('id') id: number) {
    return await this.userService.deleteById(id);
  }
}
