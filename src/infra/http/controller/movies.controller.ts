import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { MoviesService } from 'src/application/services/movies/movies.service';

@Controller('movies')
@UseGuards(AuthGuard('jwt'))
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Post()
  async create(@Body() title: any) {
    return await this.moviesService.create(title);
  }

  @Get()
  async findAll() {
    return await this.moviesService.findAll();
  }

  @Get(':id')
  async findById(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.moviesService.findById(id);
  }

  @Get('title/:title')
  async findByTitle(@Param('title') title: string) {
    return await this.moviesService.findByTitle(title);
  }

  @Put(':id')
  async updateById(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() movieDto: any,
  ) {
    return await this.moviesService.updateById(id, movieDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteById(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.moviesService.deleteById(id);
  }
}
