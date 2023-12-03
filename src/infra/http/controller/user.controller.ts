import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Put,
  Delete,
  ParseUUIDPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from 'src/application/services/user/user.service';
import { UserDto } from '../dtos/user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';

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
  async findById(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.userService.findById(id);
  }

  @Get('email/:email')
  async findByEmail(@Param('email') email: string) {
    return await this.userService.findByEmail(email);
  }

  @Put(':id')
  async updateById(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return await this.userService.updateById(id, updateUserDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteById(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.userService.deleteById(id);
  }
}
