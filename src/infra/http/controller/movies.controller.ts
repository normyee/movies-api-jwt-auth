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
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('movies')
@Controller('movies')
@UseInterceptors(CacheInterceptor)
@CacheTTL(60000)
@UseGuards(AuthGuard('jwt'))
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Post()
  @ApiOperation({ summary: 'Add a new title to the catalog.' })
  async create(@Body() movieDto: MovieDto) {
    return await this.moviesService.create(movieDto);
  }

  @Get()
  @ApiOperation({ summary: 'Return all titles on the catalog.' })
  async findAll() {
    return await this.moviesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Return a specific title by ID.' })
  async findById(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.moviesService.findById(id);
  }

  @Get('title/:title')
  @ApiOperation({ summary: 'Return a specific title by its title name.' })
  async findByTitle(@Param('title') title: string) {
    return await this.moviesService.findByTitle(title);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a specific title by ID.' })
  async updateById(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() movieDto: UpdateMovieDto,
  ) {
    return await this.moviesService.updateById(id, movieDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a specific title by ID.' })
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteById(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.moviesService.deleteById(id);
  }
}
