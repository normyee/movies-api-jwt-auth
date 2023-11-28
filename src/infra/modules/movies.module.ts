import { Module } from '@nestjs/common';
import { MoviesController } from '../http/controller/movies.controller';
import { MoviesService } from '../../application/services/movies/movies.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MoviesEntity } from '../data/movie.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MoviesEntity])],
  controllers: [MoviesController],
  providers: [MoviesService],
})
export class MoviesModule {}
