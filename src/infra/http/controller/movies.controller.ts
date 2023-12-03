import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';
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
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { MoviesService } from 'src/application/services/movies/movies.service';
import { MovieDto } from '../dtos/movie.dto';
import { UpdateMovieDto } from '../dtos/update-movie.dto';

@Controller('movies')
@UseInterceptors(CacheInterceptor)
@CacheTTL(60000)
@UseGuards(AuthGuard('jwt'))
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Post()
  async create(@Body() movieDto: MovieDto) {
    return await this.moviesService.create(movieDto);
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
    @Body() movieDto: UpdateMovieDto,
  ) {
    return await this.moviesService.updateById(id, movieDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteById(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.moviesService.deleteById(id);
  }
}
