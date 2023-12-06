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
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { IndexUserSwagger } from 'src/doc/swagger/index-user.swagger';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: 'Register new user.' })
  @ApiResponse({
    status: 201,
    description: 'New user registered.',
    type: IndexUserSwagger,
    isArray: false,
  })
  @ApiResponse({
    status: 400,
    description: 'It could not register an user.',
  })
  async create(@Body() userDto: UserDto) {
    return await this.userService.create(userDto);
  }

  @Get()
  @ApiOperation({ summary: 'Return all registered users.' })
  @ApiResponse({
    status: 200,
    description: 'All registered users returned successfully.',
    type: IndexUserSwagger,
    isArray: true,
  })
  @ApiResponse({
    status: 400,
    description: 'It could not return any users.',
  })
  async findAll() {
    return await this.userService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Return a specific user by ID.' })
  @ApiResponse({
    status: 200,
    description: 'Registered user found successfully.',
    type: IndexUserSwagger,
    isArray: false,
  })
  @ApiResponse({
    status: 404,
    description: 'Registered user not found.',
  })
  async findById(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.userService.findById(id);
  }

  @Get('email/:email')
  @ApiOperation({ summary: 'Return a specific user by email.' })
  @ApiResponse({
    status: 200,
    description: 'Registered email found successfully.',
    type: IndexUserSwagger,
    isArray: false,
  })
  @ApiResponse({
    status: 404,
    description: 'Registered email not found.',
  })
  async findByEmail(@Param('email') email: string) {
    return await this.userService.findByEmail(email);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a specific user by ID.' })
  async updateById(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return await this.userService.updateById(id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a specific user by ID.' })
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteById(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.userService.deleteById(id);
  }
}
